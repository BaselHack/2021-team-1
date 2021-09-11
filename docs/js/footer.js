$(document).ready(function() {

  const pathname = window.location.pathname;

  $("#footer").html(`<div class="container">
  <div class="columns">
    <div class="column">
      <p class="">
        <a href="https://github.com/baselhack/start-me-up"><i class="fab fa-github fa-fw fa-2x"></i></a>
      </p>
      <p id="last-updated" class="has-text-light">Last updated: ${new Date().toLocaleString()}</p>
    </div>
  </div>
</div>`);
});
