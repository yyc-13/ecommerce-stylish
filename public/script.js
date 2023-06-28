
function render(data) {
  for (let x = 0; x < data.length; x++) {
    const product_id = data[x].id
    const products_div = document.querySelector("#products")
    const product_anchor = document.createElement('a')
    product_anchor.setAttribute("class", "product")
    product_anchor.setAttribute("href", `product.html?id=${product_id}`)
    let main_image_path = data[x].main_image;
    main_image_path = main_image_path.slice(7);
    product_anchor.innerHTML = `
      <img class="product__main-image" src=${main_image_path}>
      <div class="product__colors">
      </div>
      <div class="product__title">${data[x].title}</div>
      <div class="product__price">${data[x].price}</div>
      `
    products_div.appendChild(product_anchor)
    console.log(data[x].colors)

    for (let y = 0; y < data[x].colors.length; y++) {
      const colors_div = document.querySelectorAll(".product__colors")
      const color = document.createElement("div")
      color.setAttribute("class", "product__color")
      color.setAttribute("style", `background-color:${data[x].colors[y].code}`)
      colors_div[x].appendChild(color)
    }
  }

}
let category = new URLSearchParams(window.location.search).get('tag');
if (category) {
  axios
    .get(`./api/1.0/products/${category}`)
    .then(response => {
      render(response.data.data)
      const campaign = document.querySelector("#campaigns")
      campaign.setAttribute("style", "display:none")
      console.log(response.data.data)
      console.log(response.status);
    })
    .catch((err) => {
      console.log(err)
    })
} else {
  axios
    .get(`./api/1.0/products/all`)
    .then(response => {
      render(response.data.data)
      console.log(response.data.data)
      console.log(response.status);
    })
    .catch((err) => {
      console.log(err)
    })
}