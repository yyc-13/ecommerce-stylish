

class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <footer>
        <nav>
          <ul>
            <li>關於 Stylish</li>
            <li>服務條款</li>
            <li>隱私政策</li>
            <li>聯絡我們</li>
            <li>FAQ</li>
          </ul>
        </nav>
        <div class="links">
          <img src="images/line.png">
          <img src="images/facebook.png">
          <img src="images/twitter.png">
        </div>
        <div class="rights">© 2021. All rights reserved.</div>
      </footer>
    `
  }
}

customElements.define('footer-component', Footer);