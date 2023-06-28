const url = "/api/1.0/user/signin";

const button = document.querySelector("#sign_in_button")

button.addEventListener("click", function (e) {
  const user = {
    name: document.querySelector("#name").value,
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value
  }
  console.log(user);
  e.preventDefault();
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      console.log(res.body)
      return res.json();
    })
    .then((res) => {
      console.log(res)
      const expired_time = Date.now() + 3600 * 1000;
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("expired_time", expired_time)
    })
    .then(() => {
      alert("登入成功！")
      self.location.href = "/profile.html";
    })
    .catch((err) => {
      alert("登入失敗，請再試一次")
      console.error(err)
    })
})


const url_up = "/api/1.0/user/signup";
const button_signup = document.querySelector("#sign_up_button")
button_signup.addEventListener("click", (e) => {
  e.preventDefault()
  const user = {
    name: document.querySelector('#name_up').value,
    email: document.querySelector('#email_up').value,
    password: document.querySelector('#password_up').value
  }
  console.log(user)
  fetch(url_up, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      console.log(res.body)
      return res.json()
    })
    .then((res) => {
      console.log(res)
      const expired_time = Date.now() + 3600 * 1000;
      localStorage.setItem("accessToken", res.accessToken)
      localStorage.setItem("expired_time", expired_time)
    })
    .then(() => {
      alert("註冊成功");
      self.location.href = "/profile.html"
    })
    .catch(err => console.log(err))
})
