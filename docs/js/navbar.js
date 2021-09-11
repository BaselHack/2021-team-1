$(document).ready(function() {
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function() {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  const pathname = window.location.pathname;

  $("#navbar").html(`<div class="container">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      🚀 In Basel
      <!--
      <figure class="image">
        <img class="is-rounded" src="" height="30" width="30" />
      </figure>
      -->
    </a>

    <a
      role="button"
      class="navbar-burger burger"
      aria-label="menu"
      aria-expanded="false"
      data-target="navbarBasicExample"
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item" href="contribute.html">
        Contribute
      </a>
      <a class="navbar-item ${pathname === "/events.html" ? "is-active" : ""}" href="events.html">
        Events
      </a>
      <a class="navbar-item ${pathname === "/community.html" ? "is-active" : ""}" href="community.html">
        Community
      </a>
      <a class="navbar-item ${
        pathname === "/starting-a-company-in-switzerland.html" ? "is-active" : ""
      }" href="starting-a-company-in-switzerland.html">
        Starting a Company
      </a>
      <a class="navbar-item ${
        pathname === "/investing-in-switzerland.html" ? "is-active" : ""
      }" href="investing-in-switzerland.html">
        Investing
      </a>
      <a class="navbar-item ${pathname === "/about.html" ? "is-active" : ""}" href="about.html">
        About&nbsp;<span style="color:#04689f;">Start</span><span style="color:#ffaa00;">Me</span><span style="color:#d40000;">Up</span>
      </a>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <span class="tag is-dark">
          0.0.1
        </span>
      </div>
      <!--
      <div class="navbar-item">
        <form method="post" action="/login">
          <div class="field is-grouped is-grouped-multiline">
            <p class="control">
              <input name="username" class="input" type="text" placeholder="username" />
            </p>
            <p class="control">
              <input name="password" class="input" type="password" placeholder="password" />
            </p>
            <p class="control">
              <button id="login" type="submit" class="button is-primary">
                Login
              </button>
            </p>
          </div>
        </form>
      </div>
      -->
    </div>
  </div>
</div>`);
});
