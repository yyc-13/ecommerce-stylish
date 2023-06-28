function render(data) {
  const product__id = document.querySelector('.product__id')
  product__id.innerText = data[0].id
  const product__title = document.querySelector('.product__title')
  product__title.innerText = data[0].title
  const product__price = document.querySelector('.product__price')
  product__price.innerText = `TWD.${data[0].price}`
  const product__main_image = document.querySelector('.product__main-image')
  main_image_path = data[0].main_image.slice(7)
  product__main_image.setAttribute("src", main_image_path)

  for (let y = 0; y < data[0].colors.length; y++) {
    const product__colors = document.querySelector('.product__colors')
    const color = document.createElement("div")
    color.setAttribute("class", "product__color")
    color.setAttribute("style", `background-color:${data[0].colors[y].code};`)
    color.setAttribute("id", `${data[0].colors[y].code}`)
    product__colors.appendChild(color)
  }
  document.querySelector('.product__color').setAttribute("class", "product__color product__color--selected")


  for (let y = 0; y < data[0].sizes.length; y++) {
    const product__sizes = document.querySelector('.product__sizes')
    const size = document.createElement("div")
    size.setAttribute("class", "product__size")
    size.setAttribute("id", data[0].sizes[y])
    size.innerHTML = `${data[0].sizes[y]}`
    product__sizes.appendChild(size)
  }
  const init_color_code = document.querySelector('.product__color--selected').getAttribute('id')
  const avail_variants = data[0].variants.filter(element => element.colorCode === init_color_code)
  avail_variants[0].size
  const size_arr = document.querySelectorAll(".product__size")
  for (let i = 0; i < size_arr.length; i++) {
    if (size_arr[i].innerHTML === avail_variants[0].size) {
      size_arr[i].setAttribute("class", "product__size product__size--selected")

    }
    break;
  }


  var product__image = document.querySelectorAll('.product__image')

  for (let i = 0; i < product__image.length; i++) {
    if (i % 2) {
      const images__path = data[0].images[1].slice(7)
      product__image[i].setAttribute("src", images__path)
    } else {
      const images__path = data[0].images[0].slice(7)
      product__image[i].setAttribute("src", images__path)
    }
  }


  for (let i = 0; i < data[0].colors.length; i++) {
    let hash_layer_2 = {}
    console.log("im making has table")
    var filtered = data[0].variants.filter(el => el.colorCode === data[0].colors[i].code)
    for (let y = 0; y < filtered.length; y++) {
      hash_layer_2[filtered[y].size] = filtered[y].stock
    }
    stock_hash_table[data[0].colors[i].code] = hash_layer_2
  }

  console.log("hash table ")
  console.log(stock_hash_table)
  const sel_col = document.querySelector(".product__color--selected").getAttribute('id')
  const sel_size = document.querySelector(".product__size--selected").innerHTML
  max_stock = stock_hash_table[sel_col][sel_size]

  product__size_arr = document.querySelectorAll('.product__size')
  for (let y = 0; y < product__size_arr; y++) {
    if (!(product__size_arr[y].innerText in stock_hash_table[sel_col])) {
      product__size_arr[y].setAttribute('disabled', '')
    }
  }
  console.log("max_stock:" + max_stock)
}

const url_string = window.location.href
let url = new URL(url_string)
const url_id = url.searchParams.get("id")

const stock_hash_table = {}
let max_stock;

axios
  .get(`./api/1.0/products/details?id=${url_id}`)
  .then(response => {
    render(response.data.data)
    console.log("data:")
    console.log(response.data.data)
    console.log("response.status" + response.status)
    return response.data.data
  })

  // 資料 render 完之後 ////////////////////////////////////////////////////////////////////////////

  .then((data) => {
    console.log(data)
    console.log(stock_hash_table)

    set_to_one()
    set_max_stock()

    // 點擊顏色時

    for (let i = 0; i < document.getElementsByClassName("product__color").length; i++) {
      const product__colors = document.getElementsByClassName("product__color");
      product__colors[i].addEventListener("click", function () { set_color_click(i, product__colors) })
    }

    function set_color_click(i, product__colors) {
      // 把原本的 color--selected 換掉，設為新點擊的
      document.querySelector(".product__color--selected").setAttribute("class", "product__color")
      product__colors[i].setAttribute("class", "product__color product__color--selected")

      // 如果原本選擇的尺寸不存在於新點擊的顏色
      const size_sel = document.querySelector(".product__size--selected")
      const clicked_color_code = product__colors[i].getAttribute("id")

      const disabled_size_arr = document.querySelectorAll(".product__size--disabled")
      disabled_size_arr.forEach(el => {
        el.setAttribute("class", "product__size")
      })

      const product__size_arr = document.querySelectorAll('.product__size')

      product__size_arr.forEach(el => {
        const color = product__colors[i].getAttribute('id')
        // remove event listener
        if (!(el.innerText in stock_hash_table[color])) {
          el.setAttribute("class", "product__size product__size--disabled")
          el.removeEventListener('click', set_color_click)
        }
      })

      if (!(size_sel.innerHTML in stock_hash_table[clicked_color_code])) {
        size_sel.setAttribute("class", "product__size product__size--disabled")
        const first_avail_size = Object.keys(stock_hash_table[clicked_color_code])[0]
        console.log(first_avail_size)
        document.getElementById(first_avail_size).setAttribute("class", "product__size product__size--selected")


        document.getElementById("decrement").removeAttribute("disabled", "")
        document.getElementById("increment").removeAttribute("disabled", "")
        set_to_one()
        set_max_stock()
      } else {
        console.log("點擊顏色")

        document.getElementById("decrement").removeAttribute("disabled", "")
        document.getElementById("increment").removeAttribute("disabled", "")
        set_to_one()
        set_max_stock()
      }
    }

    // 點擊尺寸時

    for (let i = 0; i < document.getElementsByClassName("product__size").length; i++) {
      let product__size_html = document.getElementsByClassName("product__size")
      product__size_html[i].addEventListener("click", function () { set_size_click(i, product__size_html) })
    }

    function set_size_click(i, product__size_html) {
      document.querySelector(".product__size--selected").setAttribute("class", "product__size")
      product__size_html[i].setAttribute("class", "product__size product__size--selected")

      document.getElementById("decrement").removeAttribute("disabled", "")
      document.getElementById("increment").removeAttribute("disabled", "")
      set_to_one()
      set_max_stock()
    }



    // 每次點擊不管 size 還是 color 都把數量切為 1
    function set_to_one() {
      let quantity = document.querySelector("#quantity")
      quantity.innerText = 1;
      document.getElementById("decrement").setAttribute("disabled", "")
    }

    function set_max_stock() {
      const color_selected = document.querySelector(".product__color--selected").getAttribute('id')
      const size_selected = document.querySelector(".product__size--selected").innerHTML
      max_stock = stock_hash_table[color_selected][size_selected]
      console.log("max stock is " + max_stock)
      if (max_stock == 1) {
        document.getElementById("increment").setAttribute("disabled", "")

        console.log(document.getElementById("increment"))
      }
    }
  }) // end of seconde then


// 點擊 "+"
document.getElementById("increment").addEventListener("click", function () {
  let quantity = document.querySelector('#quantity')
  quantity.innerText = parseInt(quantity.textContent) + 1
  document.getElementById("decrement").removeAttribute("disabled", "")
  if (quantity.innerText >= max_stock) {
    document.getElementById("increment").setAttribute("disabled", "")
  }
})

// 點擊 "-"
document.getElementById("decrement").addEventListener("click", function () {
  let quantity = document.querySelector('#quantity')
  quantity.innerText = quantity.textContent - 1
  document.getElementById("increment").removeAttribute("disabled", "")
  if (quantity.innerText <= 1) {
    document.getElementById("decrement").setAttribute("disabled", "")

  }
})

TPDirect.setupSDK(12348, 'app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF', 'sandbox')
TPDirect.card.setup({
  fields: {
    number: {
      element: '.form-control.card-number',
      placeholder: '**** **** **** ****'
    },
    expirationDate: {
      element: document.getElementById('tappay-expiration-date'),
      placeholder: 'MM / YY'
    },
    ccv: {
      element: $('.form-control.cvc')[0],
      placeholder: '後三碼'
    }
  },
  styles: {
    'input': {
      'color': 'gray'
    },
    'input.ccv': {
      // 'font-size': '16px'
    },
    ':focus': {
      'color': 'black'
    },
    '.valid': {
      'color': 'green'
    },
    '.invalid': {
      'color': 'red'
    },
    '@media screen and (max-width: 400px)': {
      'input': {
        'color': 'orange'
      }
    }
  }
})
// listen for TapPay Field
// 更新使用者輸入情況，eg., 卡號、到期日是否合法，是否可以 getprime
TPDirect.card.onUpdate(function (update) {

  if (update.canGetPrime) {
    // submitButton.removeAttribute('disabled')
    $('button[type="submit"]').removeAttr('disabled')
  } else {
    // submitButton.setAttribute('disabled', true)
    $('button[type="submit"]').attr('disabled', true)
  }

  // number 欄位是錯誤的
  // 0 - 欄位已填好，而且沒有問題；1-  欄位沒有填寫；2- 欄位有錯誤；3 - 使用者輸入中
  if (update.status.number === 2) {
    setNumberFormGroupToError('.card-number-group')
  } else if (update.status.number === 0) {
    setNumberFormGroupToSuccess('.card-number-group')
  } else {
    setNumberFormGroupToNormal('.card-number-group')
  }

  if (update.status.expiry === 2) {
    setNumberFormGroupToError('.expiration-date-group')
  } else if (update.status.expiry === 0) {
    setNumberFormGroupToSuccess('.expiration-date-group')
  } else {
    setNumberFormGroupToNormal('.expiration-date-group')
  }

  if (update.status.cvc === 2) {
    setNumberFormGroupToError('.cvc-group')
  } else if (update.status.cvc === 0) {
    setNumberFormGroupToSuccess('.cvc-group')
  } else {
    setNumberFormGroupToNormal('.cvc-group')
  }
})

$('form').on('submit', function (event) {
  event.preventDefault()

  // fix keyboard issue in iOS device
  forceBlurIos()

  const tappayStatus = TPDirect.card.getTappayFieldsStatus()
  console.log(tappayStatus)

  // Check TPDirect.card.getTappayFieldsStatus().canGetPrime before TPDirect.card.getPrime
  if (tappayStatus.canGetPrime === false) {
    alert('can not get prime')
    return
  }

  // Get prime
  TPDirect.card.getPrime(function (result) {
    if (result.status !== 0) {
      alert('get prime error ' + result.msg)
      return
    }
    const token = localStorage.getItem("accessToken")
    if (!token) {
      alert("請先登入")
      return
    }
    fetch('./api/1.0/order/checkout', {
      method: 'POST',
      body: JSON.stringify({
        prime: result.card.prime,
        order: {
          shipping: 'delivery',
          payment: 'credit_card',
          subtotal: document.querySelector(".product__price").textContent.slice(4),
          freight: 0,
          total: document.querySelector(".product__price").textContent.slice(4) * document.querySelector("#quantity").innerHTML,
          recipient: {
            name: 'Luke',
            phone: '0987654321',
            email: 'luke@gmail.com',
            address: '市政府站',
            time: 'morning'
          },
          list: [
            {
              id: document.querySelector(".product__id").textContent,
              name: document.querySelector(".product__title").textContent,
              price: document.querySelector(".product__price").textContent.slice(4),
              color: {
                code: document.querySelector(".product__color--selected").getAttribute('id')
              },
              size: document.querySelector(".product__size--selected").textContent,
              qty: document.querySelector("#quantity").innerHTML
            }
          ]
        }
      }),
      headers: {
        "Authorization": 'Bearer ' + token,
        'Content-type': 'application/json'
      }
    })
      .then((response) => response.text())
      .then((data) => {
        self.location.href = "/thankyou.html"
      })
      .catch((error) => {
        console.log(error.stack)
      })
  })
})

function setNumberFormGroupToError(selector) {
  $(selector).addClass('has-error')
  $(selector).removeClass('has-success')
}

function setNumberFormGroupToSuccess(selector) {
  $(selector).removeClass('has-error')
  $(selector).addClass('has-success')
}

function setNumberFormGroupToNormal(selector) {
  $(selector).removeClass('has-error')
  $(selector).removeClass('has-success')
}

function forceBlurIos() {
  if (!isIos()) {
    return
  }
  var input = document.createElement('input')
  input.setAttribute('type', 'text')
  // Insert to active element to ensure scroll lands somewhere relevant
  document.activeElement.prepend(input)
  input.focus()
  input.parentNode.removeChild(input)
}

function isIos() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}