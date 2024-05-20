// param để search và filter cho tailieu
var getApitailieuParam = {
  pageNumber: 0,
  search: "",
  role: "",
  courseName: "",
  getParamString() {
    return "?pageNumber=" + this.pageNumber + "&search=" + this.search + "&role=" + this.role + "&courseName=" + this.courseName;
  },
};

// f5 lại bảng tailieu
function refreshtailieuTable() {
  inittailieuTable("");
}

// ẩn modal tạo mới tailieu
function hideAddNewtailieuModal() {
  $("#add-new-tailieu-modal").modal("hide");
}

// khởi tạo danh sách tailieu có filter
function inittailieuTableWithFilter() {
  let role = document.getElementById("tailieu-role-filter").value;
  let courseName = document.getElementById("tailieu-course-filter").value;
  console.log(role);
  console.log(courseName);
  getApitailieuParam.role = role;
  getApitailieuParam.courseName = courseName;
  inittailieuTable(getApitailieuParam.getParamString());
}

// tìm tailieu theo phím enter
function searchtailieuByEnterKey() {
  $("#search-tailieu-by-name").keydown((event) => {
    let keyCode = event.which;
    if (keyCode == 13) {
      searchtailieuByName();
    }
  });
}

// tìm tailieu theo name
function searchtailieuByName() {
  var name = document.getElementById("search-tailieu-by-name").value;
  getApitailieuParam.search = name;
  // lấy param rồi khởi tạo bảng
  inittailieuTable(getApitailieuParam.getParamString());
}

// phân trang cho tailieu
function paginationtailieu(result) {
  const activeNumber = result.number + 1;
  $("#pagination-tailieu").html(
    `<a title="Previous" href = "javascript:void(0)" onclick="totailieuPage(${activeNumber > 1 ? activeNumber - 1 : activeNumber})">Previous</a>`
  );
  for (let i = 0; i < result.totalPages; i++) {
    const curNumber = i + 1;
    if (curNumber == activeNumber) {
      $("#pagination-tailieu").append(`<a href = "javascript:void(0)" class="active">${curNumber}</a>`);
    } else {
      $("#pagination-tailieu").append(`<a href = "javascript:void(0)" onclick="totailieuPage(${curNumber})">${curNumber}</a>`);
    }
  }
  $("#pagination-tailieu").append(
    `<a href = "javascript:void(0)" title="Next" onclick="totailieuPage(${activeNumber < result.totalPages ? activeNumber + 1 : activeNumber})">Next</a>`
  );
}

// hiện modal xóa tailieu
function openDeletetailieuModal(tailieuID) {
  $("#delete-tailieu-modal").modal("show");
  document.getElementById("delete-tailieu-id").value = tailieuID;
  console.log(document.getElementById("delete-tailieu-id").value);
}

// testModalUser
function openUserModal() {
  $("#delete-tailieu-modal").modal("show");
  //   document.getElementById("delete-tailieu-id").value = tailieuID;
  //   console.log(document.getElementById("delete-tailieu-id").value);
}

// ẩn modal xóa tailieu
function hideDeletetailieuModal() {
  $("#delete-tailieu-modal").modal("hide");
}

// lấy mảng id của những tailieu sẽ xóa
function getArrayIdtailieusToDelete() {
  var listIDs = new Array();
  var checkboxes = document.getElementsByName("check-input");
  for (var checkbox of checkboxes) {
    if (checkbox.checked) {
      listIDs.push(checkbox.value);
    }
  }
  return listIDs;
}

// xóa từng tailieu
function deletetailieu() {
  let id = document.getElementById("delete-tailieu-id").value;
  $.ajax({
    url: apitailieuURL + "/" + id,
    type: "DELETE",
    async: false,
    success: function (result) {},
  });
  hideDeletetailieuModal();
  inittailieuTable("");
  showAlertSuccess();
}

// xóa nhiều course
function deletetailieus() {
  let ids = getArrayIdtailieusToDelete();
  // console.log(ids);
  let data = JSON.stringify({ ids: ids });
  // console.log(data)

  let isOk = true;
  $.ajax({
    url: apitailieuURL,
    type: "DELETE",
    data: data, // body
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
    hideDeletetailieusModal();
    showAlertSuccess();
  }
  inittailieuTable("");
}

// ẩn modal xóa nhiều tailieu
function hideDeletetailieusModal() {
  $("#delete-tailieus-modal").modal("hide");
}

// mở modal xóa nhiều tailieu
function openDeletetailieusModal() {
  $("#delete-tailieus-modal").modal("show");
}

// chuyển đến trang số ***
function totailieuPage(number) {
  getApitailieuParam.pageNumber = number;
  inittailieuTable(getApitailieuParam.getParamString());
}

// khởi tạo danh sách role cho bảng tailieu
function inittailieuRoleList() {
  $(".form-role-select").empty();
  $(".form-role-select").html(`<option value="">--Choose a type--</option>`);
  $.ajax({
    url: apitailieuURL + "/roles",
    type: "GET",
    success: function (result) {
      console.log(result);
      result.forEach(function (item) {
        $(".form-role-select").append('<option value="' + item.roleValue + '">' + item.roleName + "</option>");
      });
    },
  });
}

// khởi tạo danh sách course cho bảng tailieu
function inittailieucourseList() {
  $(".form-course-select").empty();
  $(".form-course-select").html(`<option value="">--Choose a type--</option>`);
  $.ajax({
    url: apicourseURL + "/lists",
    type: "GET",
    async: false,
    success: function (result) {
      result.forEach(function (item) {
        $("#tailieu-course-filter").append('<option value="' + item.name + '">' + item.name + "</option>");
        $("#tailieu-course-select").append('<option value="' + item.id + '">' + item.name + "</option>");
      });
    },
  });
}

// khởi tạo danh sách role và danh sách course lúc tạo mới tailieu
function openAddNewtailieuModal() {
  $("#add-new-tailieu-modal").modal("show");
  inittailieuRoleList();
  inittailieucourseList();
  resettailieuModal();
}

// reset tailieu modal
function resettailieuModal() {
  $(".modal-body > input").val("");
  $(".modal-body > select").val("");
}

// khởi tạo danh sách course cho drop box của tailieu
function initDapartmentList() {
  $("#course-select").empty();
  $.ajax({
    url: apicourseURL,
    type: "GET",
    success: function (result) {
      var list = result.content;
      list.forEach(function (item) {
        $("#course-select").append('<option value="' + item.id + '">' + item.name + "</option>");
      });
    },
  });
}

// lấy danh sách tailieu
function inittailieuTable(param) {
  $("tbody").empty();
  $.ajax({
    url: apitailieuURL + param,
    type: "GET",
    success: function (result) {
      paginationtailieu(result);
      var list = result.content;
      list.forEach(function (item) {
        $("tbody").append(
          `<tr>
                    <td><input type='checkbox' name='check-input' value='${item.id}'></td>
                    <td>${item.username}</td>'
                    <td>${item.fullName}</td>
                    <td>${item.role}</td>
                    <td>${item.courseName}</td>
                    <td>
                    <a class="edit" title="Edit" data-toggle="tooltip" onclick ="opendUpdatetailieuModal(${item.id})"><i class="material-icons">&#xE254;</i></a>
                    <a class="delete" title="Delete" data-toggle="tooltip" onclick ="openDeletetailieuModal(${item.id})"><i class="material-icons">&#xE872;</i></a>
                    </td>
                    </tr>`
        );
      });
    },
  });
}

// tạo mới tailieu
function createNewtailieu() {
  let username = document.getElementById("tailieu-username").value;
  let firstName = document.getElementById("tailieu-first-name").value;
  let lastName = document.getElementById("tailieu-last-name").value;
  let role = document.getElementById("tailieu-role-select").value;
  let courseId = document.getElementById("tailieu-course-select").value;
  let email = username + "@gmail.com";
  let tailieu = {
    username: username,
    firstName: firstName,
    lastName: lastName,
    // password mặc định để là 123456
    password: "123456",
    email: email,
    role: role,
    courseId: courseId,
  };

  let isOk = true;

  let validMessage = "";
  if (username.length < 8 || username.length > 20) {
    validMessage += "username's length is not valid\n";
  }
  if (firstName.length > 50 || firstName.length < 1) {
    validMessage += "first name's length is not valid\n";
  }
  if (lastName.length > 50 || lastName.length < 1) {
    validMessage += "last name's length is not valid\n";
  }

  if (role == undefined) {
    validMessage += "role must not be null\n";
  }
  if (courseId == undefined) {
    validMessage += "course id must not be null";
  }

  if (validMessage.length != 0) {
    alert(validMessage);
    // console.log(validMessage);
    return;
  } else {
    isOk = true;
  }
  let isCheck = true;
  if (isOk == true) {
    $.ajax({
      url: apitailieuURL,
      type: "POST",
      data: JSON.stringify(tailieu), // body
      contentType: "application/json",
      async: false,
      success: function (result) {
        isCheck = true;
      },
      error: function (xhr) {
        isCheck = false;
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
  }

  inittailieuTable("");
  if (isCheck == true) {
    showAlertSuccess();
    hideAddNewtailieuModal();
  }
}

// lưu tailieu (update tailieu or create new tailieu), nếu có id thì update, nếu ko có thì tạo mới
function savetailieu() {
  let tailieuID = document.getElementById("tailieu-id").value;
  // console.log(tailieuID);

  if (tailieuID == undefined || tailieuID == "") {
    createNewtailieu();
  } else {
    updatetailieu(tailieuID);
  }
  // showAlertSuccess();
}

var tailieuTemp;

// hiện modal update tailieu
function opendUpdatetailieuModal(tailieuID) {
  openAddNewtailieuModal();
  $("#add-new-tailieu-modal h5").html("Update tailieu");
  // gọi api đổ thông tin vào tailieu
  $.ajax({
    url: apitailieuURL + "/" + tailieuID,
    type: "GET",
    async: false,
    success: function (result) {
      tailieuTemp = result;
      console.log(tailieuTemp);
      //fill data
      document.getElementById("tailieu-id").value = result.id;
      document.getElementById("tailieu-username").value = result.username;
      document.getElementById("tailieu-first-name").value = result.firstName;
      document.getElementById("tailieu-last-name").value = result.lastName;
      document.getElementById("tailieu-role-select").value = result.role;
      document.getElementById("tailieu-course-select").value = result.courseId;
    },
  });
}

// update tailieu
function updatetailieu(tailieuID) {
  console.log(tailieuTemp);

  var username = document.getElementById("tailieu-username").value;
  var firstName = document.getElementById("tailieu-first-name").value;
  var lastName = document.getElementById("tailieu-last-name").value;
  var role = document.getElementById("tailieu-role-select").value;
  var courseId = document.getElementById("tailieu-course-select").value;
  tailieuTemp.password = tailieuTemp.username = username;
  tailieuTemp.firstName = firstName;
  tailieuTemp.lastName = lastName;
  tailieuTemp.role = role;
  tailieuTemp.courseId = courseId;

  console.log(tailieuTemp);

  if (tailieuTemp.username.length < 8 || tailieuTemp.username.length > 20) {
    alert("username's length is not valid");
    return;
  }
  if (tailieuTemp.firstName.length > 50 || tailieuTemp.firstName.length < 1) {
    alert("first name's length is not valid");
    return;
  }
  if (tailieuTemp.lastName.length > 50 || tailieuTemp.lastName.length < 1) {
    alert("last name's length is not valid");
    return;
  }

  let isOk = true;
  // gọi api thêm mới tailieu
  $.ajax({
    url: apitailieuURL,
    type: "PUT",
    data: JSON.stringify(tailieuTemp), // body
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
    hideAddNewtailieuModal();
    showAlertSuccess();
  }

  inittailieuTable("");
}
