"use strict";
var baseUrlOrder = "http://localhost:7777/api/v1/order";
let urlGet;

function SearchOrderRequest(orderBy, statusOrder, pageSize, pageNumber, sortBy, sortType) {
  this.orderBy = orderBy;
  this.statusOrder = statusOrder;
  this.pageSize = pageSize;
  this.pageNumber = pageNumber;
  this.sortBy = sortBy;
  this.sortType = sortType;
}

$(function () {
  // $("#pagination").load("/assets/html/pagination.html");

  // Check if we need to navigate to a specific page state
  const pageState = localStorage.getItem("orderPageState");
  if (pageState === "order-pending") {
    orderPagePending();
    // Clear the state from local storage to prevent repeat navigation
    localStorage.removeItem("orderPageState");
  } else {
    orderPageAll();
  }
});

function orderPageAll() {
  changActivePage("order-all");
  $(".status-order").empty();
  $(".status-order").append("<div>Trạng thái: Tất cả</div>");
  getListOrder(null);
}

function orderPagePending() {
  changActivePage("order-pending");
  $(".status-order").empty();
  $(".status-order").append("<div>Trạng thái: Đang chờ</div>");
  getListOrder("PENDING");
}

function orderPageDone() {
  changActivePage("order-done");
  $(".status-order").empty();
  $(".status-order").append("<div>Trạng thái: Hoàn thành</div>");
  getListOrder("DONE");
}

function orderPageCancel() {
  changActivePage("order-cancel");
  $(".status-order").empty();
  $(".status-order").append("<div>Trạng thái: Đã hủy</div>");
  getListOrder("CANCEL");
}

function changActivePage(pageActive) {
  const navLinks = Array.from(document.getElementsByClassName("nav-link"));
  navLinks.forEach((element) => element.classList.remove("active", "base-shoppe-bg"));

  var navActive = document.getElementById(pageActive);
  navActive.classList.add("active", "base-shoppe-bg");
  navActive.classList.remove("text-dark");
}

function getListOrder(status) {
  let userId = localStorage.getItem("id");
  let request = new SearchOrderRequest(userId, status, 100, 1, "orderDate", "DESC");
  if (status == null) {
    urlGet = baseUrlOrder + "/get-by-accountID?accountID=" + userId;
  } else {
    urlGet = baseUrlOrder + "/get-by-status?accountID=" + userId + "&status=" + status;
  }
  //   ------------------------------------- API DANH SÁCH ORDER -------------------------------------
  $.ajax({
    url: urlGet,
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
      fillOrderToTable(data, status);
    },
  });
}

function formatVND(amount) {
  return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

function fillOrderToTable(orderList, status) {
  $("#order-item").empty();
  console.log(orderList);
  for (var index = 0; index < orderList.length; index++) {
    let order = orderList[index];
    let statusOrder;
    const priceNumber = Number(order.course.price);
    let price_VN = formatVND(priceNumber);
    if (order.orderStatus == "PENDING") {
      statusOrder = "Chờ thanh toán";
    } else if (order.orderStatus == "DONE") {
      statusOrder = "Đã thanh toán";
    } else {
      statusOrder = "Đã huỷ";
    }
    let textStatus =
      order.orderStatus === "PENDING" && status === "PENDING"
        ? `<div class="row">
                    <div class="col-6">
                        <button type="button" class="btn base-font base-shoppe-bg" style=" width: 80%;" 
                        onclick="openPaypage(${order.course.price}, ${order.id})">Mua</button>
                    </div>
                    <div class="col-6">
                        <button type="button" class="btn base-font text-white bg-secondary" style=" width: 80%;" 
                        onclick="cancelOrder(${order.id})">Huỷ</button>
                    </div>
                </div>`
        : "Trạng thái: " + statusOrder;

    $("#order-item").append(
      `<div class="row border-bottom mb-3 bg-white">
              <div class="col-3 center-block text-center">
                  <img src="${order.course.image}" 
                  class="img-fluid img-thumbnail img-order" alt="Sheep">
              </div>
              <div class="col-5 d-flex justify-content-start align-items-center">
                  <div>
                      <h4 class="p-2"><b>${order.course.courseName}</b></h4>
                      <div class="p-2">Giá khóa học: ${price_VN}</div>
                      <div class="p-2">Ngày order: ${order.createDate}</div>
                  </div>
              </div>
              <div class="col-4 d-flex justify-content-start align-items-center">
                  <div>
                      <h4 class="color-shoppe p-2"><b>Giá: ${price_VN}</b></h4>
                      <div class="p-2 status-order">${textStatus}</div>
                  </div>
              </div>
          </div>`
    );
  }
}

function openPaypage(price, orderId) {
  let text = "Bạn có chắc muốn mua khóa học?";
  if (confirm(text) == true) {
    window.location.href = `./pay_page.html?price=${price}&orderId=${orderId}`;
  }
}

function cancelOrder(orderId) {
  let text = "Bạn có chắc hủy mua khóa học?.";
  if (confirm(text) == true) {
    //   ------------------------------------- API HUỶ ĐƠN HÀNG -------------------------------------
    $.ajax({
      url: baseUrlOrder + "/cancel/" + orderId,
      type: "POST",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));
      },
      contentType: "application/json",
      error: function (err) {
        console.log(err);
        confirm(err.responseJSON.message);
      },
      success: function (data) {
        orderPagePending();
        alert("Đã huỷ!");
        upQuantity();
      },
    });
  }
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
