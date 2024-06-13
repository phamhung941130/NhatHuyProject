"use strict";
// link api
// var apicourseURL = "http://localhost:8080/api/v1/nhomhoctaps";
// var apitailieuURL = "http://localhost:8080/api/v1/thanhviens";

//
function isLogin() {
  if (localStorage.getItem("ID")) {
    return true;
  }
  return false;
}

// load header, main and footer
$(function () {
  $(".header").load("header.html", function (response, status, xhr) {
    if (status == "error") {
      console.log("Error: " + xhr.status + " " + xhr.statusText);
    }
  });

  $(".footer").load("/templates/footer.html");
});

// đi đến trang chủ
// function clickNavihome() {
//   $(".main").load("/templates/home.html", function () {
//     document.getElementById("user-full-name").innerHTML = storage.getItem("FULL_NAME");
//   });
// }

// đến trang quản lý course
function clickNaviViewListCourse() {
  $(".main").load("/course.html", function () {
    initcourseTable("");
    searchByEnterKey();
    initDapartmentTypeList();
    // showAlertWarning();
  });
}

// đến trang quản lý tailieu
function clickNaviViewListDoc() {
  $(".main").load("/tailieu/tailieu.html", function () {
    inittailieuTable("");
    inittailieuRoleList();
    inittailieucourseList();
    searchtailieuByEnterKey();
  });
}

// đến trang Đề Cương
function clickDaicuong() {
  $(".main").load("/templates/daiCuong.html", function () {});
}

// ẩn modal tạo mới course
function hideAddNewModal() {
  $("#add-new-course").modal("hide");
  $("#add-tailieu-button button").hide();
  resetcourseModal();
}

// ẩn add tailieu to course modal
function hideAddtailieuTocourseModal() {
  $("#add-tailieu-to-course").modal("hide");
  resetcourseModal();
}

// thông báo
function showAlertSuccess() {
  $("#alert-success")
    .fadeTo(5000, 200)
    .slideUp(2000, function () {
      $("#alert-success").slideUp(5000);
    });
}

// param để truyền vào course api(search, filter, pageable)
let getApiParam = {
  pageNumber: 0,
  search: "",
  minDate: "",
  maxDate: "",
  getParamString() {
    return "?pageNumber=" + this.pageNumber + "&search=" + this.search + "&minCreatedDate=" + this.minDate + "&maxCreatedDate=" + this.maxDates;
  },
};

// Phân trang
function pagination(result) {
  const activeNumber = result.number + 1;
  $("#pagination-course").html(
    `<a title="Previous" href = "javascript:void(0)" onclick="tocoursePage(${activeNumber > 1 ? activeNumber - 1 : activeNumber})">Previous</a>`
  );
  for (let i = 0; i < result.totalPages; i++) {
    const curNumber = i + 1;
    if (curNumber == activeNumber) {
      $("#pagination-course").append(`<a href = "javascript:void(0)" class="active">${curNumber}</a>`);
    } else {
      $("#pagination-course").append(`<a href = "javascript:void(0)" onclick="tocoursePage(${curNumber.toString()})">${curNumber}</a>`);
    }
  }
  $("#pagination-course").append(
    `<a href = "javascript:void(0)" title="Next" onclick="tocoursePage(${activeNumber < result.totalPages ? activeNumber + 1 : activeNumber})">Next</a>`
  );
}

// chuyển tới trang số ***
function tocoursePage(number) {
  getApiParam.pageNumber = number;
  initcourseTable(getApiParam.getParamString());
}

// Lấy danh sách cho bảng course
function openAddNewcourseModal() {
  $("#add-new-course").modal("show");
  $("#add-tailieu-button button").show();
  $("#add-new-course-title").html("Create New course");
  resetcourseModal();
  // khởi tạo danh sách type cho course
  initDapartmentTypeList();
  // khởi tạo danh sách tailieu để thêm vào course
  inittailieuTableToAddTocourse();
}

// reset lại course modal
function resetcourseModal() {
  document.getElementById("course-id").value = "";
  document.getElementById("course-name").value = "";
  document.getElementById("course-type-select").value = "";
}

// khởi tạo danh sách course
function initcourseTable(param) {
  // alert(123);
  $("tbody").empty();
  $.ajax({
    url: apicourseURL + param,
    type: "GET",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", "Basic " + btoa(localStorage.getItem("USERNAME") + ":" + localStorage.getItem("PASSWORD")));
    },
    success: function (result) {
      console.log(result);
      pagination(result);
      var list = result.content;
      list.forEach(function (item) {
        $("tbody").append(
          `<tr>
                    <td><input type='checkbox'  name='check-input' value='${item.id}'></td>
                    <td>${item.name}</td>'
                    <td>${item.totalMember}</td>
                    <td>${item.type}</td>
                    <td>${item.createdDate}</td>
                    <td>
                    <a class="add-member" title="Add Member" data-toggle="tooltip" onclick ="opendAddtailieuTocourseModal(${item.id})"><i class="material-icons">add_circle</i></a>
                    <a class="edit" title="Edit" data-toggle="tooltip" onclick ="opendUpdatecourseModal(${item.id})"><i class="material-icons">&#xE254;</i></a>
                    <a class="delete" title="Delete" data-toggle="tooltip" onclick ="openDeletecourseModal(${item.id})"><i class="material-icons">&#xE872;</i></a>
                    </td>
                    </tr>`
        );
      });
    },
  });
}

// lấy danh sách tailieu để add vào course
function inittailieuTableToAddTocourse() {
  $("#tailieu-list-table tbody").empty();
  $.ajax({
    url: apitailieuURL + "/list",
    type: "GET",
    async: false,
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", "Basic " + btoa(localStorage.getItem("USERNAME") + ":" + localStorage.getItem("PASSWORD")));
    },
    success: function (result) {
      result.forEach(function (item) {
        $("#tailieu-list-table tbody").append(
          "<tr>" +
            "<td><input type='checkbox' name='check-tailieu' value='" +
            item.id +
            "'></td>" +
            "<td>" +
            item.username +
            "</td>" +
            "<td>" +
            item.fullName +
            "</td>" +
            "<td>" +
            item.role +
            "</td>" +
            "</tr>"
        );
      });
    },
  });
}

// tìm kiếm bằng phím enter
function searchByEnterKey() {
  $("#search-by-name").keydown((event) => {
    let keyCode = event.which;
    if (keyCode == 13) {
      searchcourseByName();
    }
  });
}

// tìm phòng ban theo tên phòng ban
function searchcourseByName() {
  var name = document.getElementById("search-by-name").value;
  getApiParam.search = name;
  initcourseTable(getApiParam.getParamString());
}

// khởi tạo danh sách course có filter
function initcourseTableWithFilter() {
  var type = document.getElementById("course-type-filter").value;
  var minDate = document.getElementById("min-date").value;
  var maxDate = document.getElementById("max-date").value;
  // filter theo type
  getApiParam.type = type;
  // filter theo min date
  getApiParam.minDate = minDate;
  // filter theo max date
  getApiParam.maxDate = maxDate;
  initcourseTable(getApiParam.getParamString());
}

// lấy mảng id của những tailieu cần thêm vào course
function getArrayID() {
  var listIDs = new Array();
  var checkboxes = document.getElementsByName("check-tailieu");
  for (var checkbox of checkboxes) {
    if (checkbox.checked) {
      listIDs.push({ id: checkbox.value });
    }
  }
  return listIDs;
}

// lấy mảng id của những tailieu sẽ xóa
function getArrayIdToDelete() {
  var listIDs = new Array();
  var checkboxes = document.getElementsByName("check-input");
  for (var checkbox of checkboxes) {
    if (checkbox.checked) {
      listIDs.push(checkbox.value);
    }
  }
  return listIDs;
}

// khởi tạo danh sách course type cho drop box của course
function initDapartmentTypeList() {
  $(".form-select").empty();
  $(".form-select").html(`<option value="">--Choose a type--</option>`);

  $.ajax({
    url: apicourseURL + "/types",
    type: "GET",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", "Basic " + btoa(localStorage.getItem("USERNAME") + ":" + localStorage.getItem("PASSWORD")));
    },
    success: function (result) {
      result.forEach(function (item) {
        console.log(item);
        $(".form-select").append('<option value="' + item.typeValue + '">' + item.typeName + "</option>");
      });
    },
  });
}

// save course (create new course or update course)
function savecourse() {
  var courseID = document.getElementById("course-id").value;
  if (courseID == undefined || courseID == "") {
    createNewcourse();
  } else {
    updatecourse(courseID);
  }
}

// tạo mới course
function createNewcourse() {
  let name = document.getElementById("course-name").value;
  let type = document.getElementById("course-type-select").value;
  let tailieus = getArrayID();
  let totalMember = tailieus.length;
  let course = {
    name: name,
    totalMember: totalMember,
    type: type,
    tailieus: tailieus,
  };

  if (name.length < 1 || name.length > 30) {
    alert("Độ dài name không hợp lệ");
    return;
  }

  let isOk = true;

  // gọi api thêm course mới
  $.ajax({
    url: apicourseURL,
    type: "POST",
    data: JSON.stringify(course), // body
    contentType: "application/json",
    async: false,
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", "Basic " + btoa(localStorage.getItem("USERNAME") + ":" + localStorage.getItem("PASSWORD")));
    },
    success: function (result) {
      isOk = true;
    },
    error: function (xhr) {
      isOk = false;
      console.log(xhr.responseJSON.message);
      const errs = xhr.responseJSON.error;
      let errorList = "";
      for (const key in errs) {
        if (Object.hasOwnProperty.call(errs, key)) {
          const element = errs[key];
          errorList += element + "\n";
        }
      }
      alert(errorList);
    },
  });
  if (isOk == true) {
    hideAddtailieuTocourseModal();
    hideAddNewModal();
    showAlertSuccess();
  }

  initcourseTable("");
}

function getcourseById(id) {
  $.ajax({
    url: apicourseURL + "/" + id,
    type: "GET",
    async: false,
    success: function (result) {
      //fill data
      document.getElementById("course-id").value = result.id;
      document.getElementById("course-name").value = result.name;
      document.getElementById("course-type-select").value = result.type;
      const tailieus = result.tailieus;
      const checkboxes = document.getElementsByName("check-tailieu");
      for (const tailieu of tailieus) {
        for (const checkbox of checkboxes) {
          if (checkbox.value == tailieu.tailieuId) {
            checkbox.checked = true;
          }
        }
      }
    },
  });
}

var courseTemp;

// hiện modal update course
function opendUpdatecourseModal(id) {
  $("#add-new-course").modal("show");
  $("#add-new-course-title").html("Edit course");
  $("#add-tailieu-button button").show();
  inittailieuTableToAddTocourse();

  $.ajax({
    url: apicourseURL + "/" + id,
    type: "GET",
    async: false,
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", "Basic " + btoa(localStorage.getItem("USERNAME") + ":" + localStorage.getItem("PASSWORD")));
    },
    success: function (result) {
      courseTemp = result;
      //fill data
      document.getElementById("course-id").value = result.id;
      document.getElementById("course-name").value = result.name;
      document.getElementById("course-type-select").value = result.type;
      document.getElementById("course-createdate").value = result.createdDate;
      console.log(result.createdDate);
      const tailieus = result.tailieus;
      const checkboxes = document.getElementsByName("check-tailieu");
      for (const tailieu of tailieus) {
        for (const checkbox of checkboxes) {
          if (checkbox.value == tailieu.tailieuId) {
            checkbox.checked = true;
          }
        }
      }
    },
  });

  // getcourseById(id);
}

// hiện modal để thêm tailieu vào course
function showAddtailieuTocourseModal() {
  $("#add-tailieu-to-course").modal("show");
}

// hiện modal add tailieu to course
function opendAddtailieuTocourseModal(id) {
  resetcourseModal();
  $("#add-tailieu-to-course").modal("show");
  $("#add-tailieu-to-course-title").html("Add tailieu To course");
  $("#add-tailieu-button button").show();

  // khởi tạo danh sách tailieu để add vào course
  inittailieuTableToAddTocourse();
  $.ajax({
    url: apicourseURL + "/" + id,
    type: "GET",
    async: false,
    success: function (result) {
      courseTemp = result;
      //fill data
      document.getElementById("course-id").value = result.id;
      document.getElementById("course-name").value = result.name;
      document.getElementById("course-type-select").value = result.type;
      const tailieus = result.tailieus;
      const checkboxes = document.getElementsByName("check-tailieu");
      for (const tailieu of tailieus) {
        for (const checkbox of checkboxes) {
          if (checkbox.value == tailieu.tailieuId) {
            checkbox.checked = true;
          }
        }
      }
    },
  });

  // gọi api lấy phòng ban theo id
  // getcourseById(id);
}

//
function openDeletecourseModal(courseID) {
  $("#delete-course-modal").modal("show");
  document.getElementById("delete-course-id").value = courseID;
}

function hideDeletecourseModal() {
  $("#delete-course-modal").modal("hide");
}

function hideDeletecoursesModal() {
  $("#delete-courses-modal").modal("hide");
}

// update course
function updatecourse(courseID) {
  let name = document.getElementById("course-name").value;
  let type = document.getElementById("course-type-select").value;
  let tailieus = getArrayID();
  let totalMember = tailieus.length;

  courseTemp.name = name;
  courseTemp.type = type;
  courseTemp.tailieus = tailieus;
  courseTemp.totalMember = totalMember;

  if (courseTemp.name.length < 1 || courseTemp.name.length > 30) {
    alert("Độ dài tên phòng ban không hợp lệ");
    return;
  }

  let isOk = true;

  // gọi api để cập nhật phòng ban theo id
  $.ajax({
    url: apicourseURL + "/" + courseID,
    type: "PUT",
    data: JSON.stringify(courseTemp), // body
    contentType: "application/json",
    async: false,
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", "Basic " + btoa(localStorage.getItem("USERNAME") + ":" + localStorage.getItem("PASSWORD")));
    },
    success: function (result) {
      isOk = true;
    },
    error: function (xhr) {
      isOk = false;
      console.log(xhr.responseJSON.message);
      const errs = xhr.responseJSON.error;
      let errorList = "";
      for (const key in errs) {
        if (Object.hasOwnProperty.call(errs, key)) {
          const element = errs[key];
          errorList += element + "\n";
        }
      }
      alert(errorList);
    },
  });

  if (isOk == true) {
    hideAddtailieuTocourseModal();
    hideAddNewModal();
    showAlertSuccess();
  }
  initcourseTable("");
}

// xóa từng course
function deletecourse() {
  let id = document.getElementById("delete-course-id").value;
  $.ajax({
    url: apicourseURL + "/" + id,
    type: "DELETE",
    async: false,
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", "Basic " + btoa(localStorage.getItem("USERNAME") + ":" + localStorage.getItem("PASSWORD")));
    },
    success: function (result) {},
  });
  hideDeletecourseModal();
  initcourseTable("");
  showAlertSuccess();
}

function openDeletecoursesModal() {
  $("#delete-courses-modal").modal("show");
}

// xóa nhiều course
function deletecourses() {
  let ids = getArrayIdToDelete();
  let data = JSON.stringify({ ids: ids });

  let isOk = true;
  $.ajax({
    url: apicourseURL,
    type: "DELETE",
    data: data,
    contentType: "application/json",
    async: false,
    success: function (result) {
      isOk = true;
    },
    error: function (xhr) {
      isOk = false;
      console.log(xhr.responseJSON.message);
      const errs = xhr.responseJSON.error;
      let errorList = "";
      for (const key in errs) {
        if (Object.hasOwnProperty.call(errs, key)) {
          const element = errs[key];
          errorList += element + "\n";
        }
      }
      alert(errorList);
    },
  });
  if (isOk == true) {
    hideDeletecoursesModal();
    showAlertSuccess();
  }
  initcourseTable("");
}

// tải lại trang course
function refreshcourseTable() {
  initcourseTable("");
}
