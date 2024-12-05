let baseUrlAuth = "http://localhost:7777/api/v1";

function Account(username, password) {
  this.username = username;
  this.password = password;
}

function AccountSignUp(username, password, fullName, dateOfBirth, phoneNumber, email) {
  this.username = username;
  this.password = password;
  this.fullName = fullName;
  // this.dateOfBirth = dateOfBirth;
  // this.phoneNumber = phoneNumber;
  this.email = email;
}

function signUp() {
  event.preventDefault();
  let username = document.getElementById("username-su").value;
  let password = document.getElementById("password-su").value;
  let fullName = document.getElementById("fullName-su").value;
  // let dateOfBirth = document.getElementById("dateOfBirth-su").value;
  // let phoneNumber = document.getElementById("phoneNumber-su").value;
  let email = document.getElementById("email-su").value;

  let account = new AccountSignUp(username, password, fullName, email);

  //   ------------------------------------- CALL API ĐĂNG KÝ -------------------------------------
  $.ajax({
    url: baseUrlAuth + "/auth/register",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(account),
    error: function (err) {
        console.log(err)
        confirm(err.responseJSON.message)
    },
    success: function (data) {
        console.log(data)
        window.location.href = "./index.html"
       
    }
});

}

function login() {
  event.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  console.log("test username:", username);
  console.log("test password:", password);
  let account = new Account(username, password);
  //   ------------------------------------- API ĐĂNG NHẬP -------------------------------------
  $.ajax({
    url: baseUrlAuth + "/auth/login-jwt" + "?username=" + username + "&password=" + password,
    type: "POST",
    contentType: "application/json",
    dataType: "json",
    async: false,
    error: function (err) {
      console.log(err);
      confirm(err.responseJSON.message);
    },
    success: function (data) {
      console.log(data);
      localStorage.setItem("fullName", data.fullName);
      localStorage.setItem("id", data.id);
      localStorage.setItem("role", data.role);
      localStorage.setItem("token", data.token);
      localStorage.setItem("avatar", data.avatar);
      localStorage.setItem("username", data.username);
      localStorage.setItem("quantity_Order", data.quantity_Order);
      window.location.href = "./index.html";
    },
  });

  // Fake data bằng file json
  // let checkAccount;
  // fetch("data/account.json")
  //   .then((response) => response.json())
  //   .then((json) => checkLogin(json));
  // function checkLogin(json) {
  //   checkAccount = json.find((element) => element.username === username && element.password === password);
  //   console.log(checkAccount);
  //   if (checkAccount) {
  //     localStorage.setItem("fullName", checkAccount.fullName);
  //     localStorage.setItem("id", checkAccount.id);
  //     localStorage.setItem("role", checkAccount.role);
  //     localStorage.setItem("token", checkAccount.token);
  //     localStorage.setItem("username", checkAccount.username);
  //     window.location.href = "./index.html";
  //   } else {
  //     alert("User hoặc mật khẩu ko đúng");
  //   }
  // }
}
