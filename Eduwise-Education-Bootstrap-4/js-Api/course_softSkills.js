"use strict";

let courseName = "";
let minPrice1 = 0;
let maxPrice1 = 0;
let status1 = "";
let courseType = "SOFT_SKILL";

let isManagerCourse = true;
let token = "";

let pageNumber = 1;
let size = 3;
let sortField = "id";
let sortType = "ASC";
let apiBase = "http://localhost:7777/api/v1/course/";

$(document).ready(function () {
  $("#search_input").on("input", function (event) {
    event.preventDefault();
    courseName = $("#search_input").val();
    if (courseName) {
      $("#header_inner").hide();
    } else {
      $("#header_inner").show();
    }
    getListCourse();
  });
});

$(function () {
  buildManager();
  getListCourse();
});

function buildManager() {
  if ("USER" === localStorage.getItem("role") || localStorage.getItem("role") === null) {
    isManagerCourse = false;
  } else {
    isManagerCourse = true;
    $("#button-add").empty().append(`<button class="btn btn-primary" style="color: aliceblue;" onclick="addCourse()"><ion-icon name="add-outline"></ion-icon>
      Add Course</button>`);
  }
}

function CourseSearchRequest(courseName, minPrice, maxPrice, status, courseType, pageNumber, size, sortField, sortType) {
  this.courseName = courseName;
  this.minPrice = minPrice;
  this.maxPrice = maxPrice;
  this.status = status;
  this.courseType = courseType;
  this.page = pageNumber;
  this.size = size;
  this.sortField = sortField;
  this.sortType = sortType;
}

function CourseCreateRequest(id, courseName, image, price, lessionNumber, studentNumber, status, courseType, teacherId, courseDescription) {
  this.id = id;
  this.courseName = courseName;
  this.price = price;
  this.image = image;
  this.lessionNumber = lessionNumber;
  this.studentNumber = studentNumber;
  this.status = status;
  this.courseType = courseType;
  this.teacherId = teacherId;
  this.courseDescription = courseDescription;
}

function CreatOrderRequest(accountId, courseId) {
  this.accountId = accountId;
  this.courseId = courseId;
}

function getListCourse() {
  if ("USER" === localStorage.getItem("role") || localStorage.getItem("role") === null) {
    isManagerCourse = false;
  } else {
    isManagerCourse = true;
    $("#button-add").empty().append(`<button class="btn btn-primary" style="color: aliceblue;" onclick="addCourse()"><ion-icon name="add-outline"></ion-icon>
      Add Course</button>`);
  }
  let request = new CourseSearchRequest(courseName, minPrice1, maxPrice1, status1, courseType, pageNumber, size, sortField, sortType);
  $.ajax({
    url: apiBase + "search",
    type: "POST",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));
    },
    contentType: "application/json", // Định nghĩa định dạng dữ liệu truyền vào là json
    data: JSON.stringify(request),
    error: function (err) {
      // Hành động khi api bị lỗi
      console.log("err", err);
      confirm(err.responseJSON.message);
    },
    success: function (data) {
      // Hành động khi thành công
      fillData(data.content);
      console.log("data:", data.content);
      buildPagination(data.number + 1, data.totalPages);
    },
  });
}

function buildPagination(number, totalPages) {
  // kiểm tra nếu trang hiện tại là trang đầu -> disable đi
  if (number === 1) {
    $("#pagination").empty().append(`<li class="pagination-item">
                              <a class="pagination-item__link">
                              
                              </a></li>`);
  } else {
    $("#pagination").empty().append(`<li class="pagination-item">
                              <a href="#" class="pagination-item__link " onclick="prePage()">
                              <img src="images/icons/left-arrow.png" alt="" class="img-fluid" />
                              </a></li>`);
  }

  // Dùng hàm for để build ra số trang. Kiểm tra xem trang hiện tại là bao nhiêu thì background vàng
  for (let index = 1; index <= totalPages; index++) {
    if (number === index) {
      $("#pagination").append(
        `<li class="pagination-item pagination-item--active">
                                <a href="" class="pagination-item__link" onclick="chosePage(` +
          index +
          `)">` +
          index +
          `</a>
                              </li>`
      );
    } else {
      $("#pagination").append(
        `<li class="pagination-item">
                                <a href="" class="pagination-item__link" onclick="chosePage(` +
          index +
          `)">` +
          index +
          `</a>
                              </li>`
      );
    }
  }

  // Kiểm tra nếu trang hiện tại là trang cuối -> disable đi
  if (number === totalPages) {
    $("#pagination").append(`<li class="pagination-item">
                              <a class="pagination-item__link "">
                              
                              </a></li>`);
  } else {
    $("#pagination").append(`<li class="pagination-item">
                              <a href="#" class="pagination-item__link " onclick="nextPage()">
                              <img src="images/icons/right-arrow.png" alt="" class="img-fluid" />
                              </a></li>`);
  }
}

function chosePage(page) {
  event.preventDefault();
  pageNumber = page;
  getListCourse();
}
function prePage() {
  event.preventDefault();
  pageNumber--;
  getListCourse();
}

function nextPage() {
  event.preventDefault();
  pageNumber++;
  getListCourse();
}

function formatVND(amount) {
  return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

function fillData(data) {
  $("#course_item").empty();

  data.forEach(function (element) {
    const priceNumber = Number(element.price);
    let price_VN = formatVND(priceNumber);
    let text = `<div class="col-12 col-sm-6 col-md-6 col-lg-4">
      <div class="single-courses">
        <div class="courses_banner_wrapper">
          <div class="courses_banner">
            <a href="course_Detail.html" ><img src="${element.image}" alt="" class="img-fluid" /></a>
          </div>
          <div class="purchase_price">
            <a href="#" class="read_more-btn">${price_VN}</a>
          </div>
        </div>
        <div class="courses_info_wrapper">
          <div class="courses_title">
            <h3><a href="course_Detail.html" onclick="renameCourse('${element.courseName}')">${element.courseName}</a></h3>
            <div class="teachers_name">Teacher - <a href="#" title="">${element.teacher.name}</a></div>
          </div>
          <div class="courses_info">
            <ul class="list-unstyled">
              <li><i class="fas fa-user"></i>${element.studentNumber} Students</li>
              <li><i class="fas fa-calendar-alt"></i>${element.lessionNumber} Days</li>
            </ul>
            
            ${
              isManagerCourse
                ? `<a href="#" class="cart_btn" onclick="editCourse('${element.id}', '${element.courseName}', '${element.image}', '${element.price}', '${element.courseDescription}', '${element.studentNumber}','${element.lessionNumber}','${element.status}','${element.teacher.id}','${element.courseType}')">Update</a>
                `
                : `<a href="#" class="cart_btn" onclick="addToBasket('${element.id}')">Add to Cart</a>`
            }
          </div>
        </div>
      </div>
    </div>    
    `;
    $("#course_item").append(text);
  });
}

function addCourse() {
  document.getElementById("title").innerText = "TẠO MỚI";
  document.getElementById("id").value = "";
  document.getElementById("id").placeholder = "Không Nhập ID";
  document.getElementById("id").disabled = true;
  document.getElementById("myModal").style.display = "block";
}

function editCourse(id, courseName, image, price, courseDescription, studentNumber, lessionNumber, status, teacherId, courseType) {
  document.getElementById("id").value = id;
  document.getElementById("nameCourse").value = courseName;
  document.getElementById("courseType").value = courseType;
  document.getElementById("image").value = image;
  document.getElementById("price").value = price;
  document.getElementById("lessionNumber").value = lessionNumber;
  document.getElementById("studentNumber").value = studentNumber;
  document.getElementById("teacherId").value = teacherId;
  document.getElementById("status").value = status;
  document.getElementById("description").value = courseDescription;
  document.getElementById("title").innerText = "CẬP NHẬT";
  document.getElementById("id").disabled = true;
  document.getElementById("myModal").style.display = "block";
}

function hideModal() {
  document.getElementById("myModal").style.display = "none";
  clearCourseModal();
}
function clearCourseModal() {
  document.getElementById("nameCourse").value = "";
  document.getElementById("courseType").value = "";
  document.getElementById("image").value = "";
  document.getElementById("price").value = "";
  document.getElementById("lessionNumber").value = "";
  document.getElementById("studentNumber").value = "";
  document.getElementById("teacherId").value = "";
  document.getElementById("status").value = "";
  document.getElementById("description").value = "";
}

function saveCourse() {
  const id = document.getElementById("id").value;
  const courseName = document.getElementById("nameCourse").value;
  const courseType = document.getElementById("courseType").value;
  const image = document.getElementById("image").value;
  const price = document.getElementById("price").value;
  const lessionNumber = document.getElementById("lessionNumber").value;
  const studentNumber = document.getElementById("studentNumber").value;
  const teacherId = document.getElementById("teacherId").value;
  const status = document.getElementById("status").value;
  const description = document.getElementById("description").value;

  // Tạo 1 request
  let request = new CourseCreateRequest(id, courseName, image, price, lessionNumber, studentNumber, status, courseType, teacherId, description);
  let url = id === "" ? apiBase + "create" : apiBase + "update";
  let type = id === "" ? "POST" : "PUT";

  //   ------------------------------------- API UPDATE, THÊM MỚI SẢN PHẨM -------------------------------------
  $.ajax({
    url: url,
    type: type,
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));
    },
    contentType: "application/json",
    data: JSON.stringify(request),
    error: function (err) {
      console.log(err);
      confirm(err.responseJSON.message);
    },
    success: function (data) {
      document.getElementById("myModal").style.display = "none";
      getListCourse();
      clearCourseModal();
    },
  });
}
function confirmDeleteCourse(filmId) {
  console.log("testdelete");
  document.getElementById("modalConfirmDelete").style.display = "block";
  document.getElementById("filmIdDelete").value = filmId;
}

function deleteCourse() {
  let filmId = document.getElementById("filmIdDelete").value;
  //   ------------------------------------- API XOÁ SẢN PHẨM -------------------------------------
  $.ajax({
    url: apiBase + filmId,
    type: "DELETE",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));
    },
    contentType: "application/json",
    error: function (err) {
      console.log(err);
      confirm(err.responseJSON.message);
    },
    success: function (data) {
      document.getElementById("modalConfirmDelete").style.display = "none";
      getListCourse();
    },
  });
}

function addToBasket(courseId) {
  let text = "Bạn có chắc mua khóa học?.";
  if (confirm(text) == true) {
    // Khởi tạo các gía trị cho request
    let accountId = localStorage.getItem("id");
    let request = new CreatOrderRequest(accountId, courseId);
    console.log("coursrID:", courseId, "  accountID:", accountId);

    //   ------------------------------------- API CHO SẢN PHẨM VÀO GIỎ -------------------------------------
    $.ajax({
      url: "http://localhost:7777/api/v1/order/create",
      type: "POST",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));
      },
      contentType: "application/json",
      data: JSON.stringify(request),
      error: function (err) {
        console.log(err);
        confirm(err.responseJSON.message);
      },
      success: function (data) {
        showAlrtSuccess();
        upQuantity();
        getListCourse();
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

function renameCourse(courseName) {
  console.log("test name", courseName);
  document.getElementById("course_name").innerHTML = courseName;
}

function showAlrtSuccess() {
  $("#success-alert")
    .fadeTo(2000, 500)
    .slideUp(500, function () {
      $("#success-alert").slideUp(3000);
    });
}
