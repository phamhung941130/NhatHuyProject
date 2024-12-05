"use strict";
let isManager = true;

$(function () {
  checkLogin();
});

function checkLogin() {
  let fullName = localStorage.getItem("fullName");
  let avatar = localStorage.getItem("avatar");

  let textUserLogin = `<img src="images/icons/app_store.png" alt="" class="header__navbar-user-img" />
  <span class="header__navbar-user-name">${fullName}</span>
  <ul class="header__navbar-user-menu">
    <li class="header__navbar-user-item"><a href="Atest.html">My Account</a></li>
    <li class="header__navbar-user-item"><a href="videoCourse.html">My Course</a></li>
    <li class="header__navbar-user-item"><a href="">Setting</a></li>
    <li class="header__navbar-user-item"><a href="" onclick="logout()">Log Out</a></li>
  </ul>
  `;

  let user_Cart = `<a href="order_Course.html" ><img src="images/icons/shopping-cart.png" class="img_cart" alt="Image" style="margin-left: 15px;width: 33;height: 33;" /></a>
  <span class="header__cart-notice" id="upQuantity">3</span>`;

  let textAdminLogin = `<img src="images/icons/app_store.png" alt="" class="header__navbar-user-img" />
    <span class="header__navbar-user-name">${fullName}</span>
    <ul class="header__navbar-user-menu">
      <li class="header__navbar-user-item"><a href="">My Account</a></li>
      <li class="header__navbar-user-item"><a href="">Course</a></li>
      <li class="header__navbar-user-item"><a href="">Setting</a></li>
      <li class="header__navbar-user-item"><a href="" onclick="logout()">Log Out</a></li>
    </ul>`;

  if (localStorage.getItem("token") !== null) {
    document.getElementById("noLogin").style.display = "none";
    if ("ADMIN" === localStorage.getItem("role")) {
      document.getElementById("login_ok").innerHTML = textAdminLogin;
    } else {
      document.getElementById("login_ok").innerHTML = textUserLogin;
      document.getElementById("user_cart").innerHTML = user_Cart;
      document.getElementById("upQuantity").innerHTML = upQuantity();
    }
    //  document.getElementById("user-login").innerHTML = textUserLogin;
  }
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("fullName");
  localStorage.removeItem("id");
  localStorage.removeItem("role");
  localStorage.removeItem("avatar");
  window.location.href = "/";
}

function showAlrtSuccess() {
  $("#success-alert")
    .fadeTo(2000, 500)
    .slideUp(500, function () {
      $("#success-alert").slideUp(3000);
    });
}

function upQuantity() {
  $.ajax({
    url: `http://localhost:7777/api/v1/order/get-count?username=${localStorage.getItem("username")}&status=PENDING`,
    type: "GET",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));
    },
    contentType: "application/json",
    error: function (err) {
      console.log(err);
      confirm(err.responseJSON.message);
    },
    success: function (data) {
      document.getElementById("upQuantity").innerHTML = data;
    },
  });
}
