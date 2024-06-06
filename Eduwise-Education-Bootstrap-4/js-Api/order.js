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

  orderPageAll();
});

function orderPageAll() {
  changActivePage("order-all");
  $(".status-order").empty();
  $(".status-order").append("<div>Trạng thái: Tất cả</div>");
  getListOrder(null);
}

function orderPagePending() {
  changActivePage("order-pending");
  getListOrder("PENDING");
  $(".status-order").load("/assets/html/button-order.html");
}

function orderPageDone() {
  changActivePage("order-done");
  getListOrder("DONE");
}

function orderPageCancel() {
  changActivePage("order-cancel");
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

function fillOrderToTable(orderList, status) {
  $("#order-item").empty();
  console.log(orderList);
  for (var index = 0; index < orderList.length; index++) {
    let order = orderList[index];
    let statusOrder;
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
                            onclick="openModalPay()">Mua</button>
                        </div>

                        <div class="col-6">
                            <button type="button" class="btn base-font text-white bg-secondary " style=" width: 80%;" 
                            onclick="cancelOrder(` +
          order.id +
          `)">Huỷ</button>
                        </div>
                    </div>`
        : "Trạng thái: " + statusOrder;

    $("#order-item").append(
      `<div class="row border-bottom mb-3 bg-white">
            <div class="col-3 center-block text-center">
                <img src="` +
        order.course.image +
        `" 
                class="img-fluid img-thumbnail img-order " alt="Sheep">
            </div>
            <div class="col-5 d-flex justify-conten-start align-items-center">
                <div class="">
                    <h4 class="p-2"><b>` +
        order.course.courseName +
        `</b></h4>
                    <div class="p-2">Giá khóa học: ` +
        order.course.price +
        ` đ</div>
                    <div class="p-2">Ngày order: ` +
        order.createDate +
        `</div>
                </div>
            </div>
            <div class="col-4 d-flex justify-conten-start align-items-center">
                <div class="">
                    <h4 class="color-shoppe p-2"><b>Giá: ` +
        order.course.price +
        ` đ</b></h4>
                    <div class="p-2 status-order">` +
        textStatus +
        `</div>
                </div>
            </div>
        </div>`
    );
  }
}

function paymentOder(orderId) {
  //   ------------------------------------- API THANH TOÁN ORDER -------------------------------------
  $.ajax({
    url: baseUrlOrder + "/buy/" + orderId,
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
      alert("Đã thanh toán thành công!");
    },
  });
}

function cancelOrder(orderId) {
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
    },
  });
}

function openModalPay() {
  $("#modalPay").modal("show");
}
