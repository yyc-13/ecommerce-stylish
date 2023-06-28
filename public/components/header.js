class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <header>
        <div class="desktop-header">
          <a class="logo" href="./">
            <img src="images/logo.png" height="48">
          </a>
          <div class="nav">
            <a href="./?tag=women" class="tag tag-women">女裝</a>
            <div class="tag-line">|</div>
            <a href="./?tag=men" class="tag tag-men">男裝</a>
            <div class="tag-line">|</div>
            <a href="./?tag=accessories" class="tag tag-accessories">配件</a>
          </div>
          <input class="search">
          <a class="cart" href="./cart.html">
            <img src="images/cart.png" height="44">
            <div class="count">0</div>
          </a>
          <div class="member">
            <a href="/profile.html">
            <img src="images/member.png" height="44" border="0">
            </a>
          </div>
        </div>
      </header>
    `
  }
}

customElements.define('header-component', Header);