"use strict";
var baseUrlOrder = "http://localhost:7777/api/v1/order";
var baseUrlVideo = "http://localhost:7777/api/v1/video";

function getListOrder(status) {
  let userId = localStorage.getItem("id");
  let token = localStorage.getItem("token");

  $.ajax({
    url: baseUrlOrder + "/get-by-status?accountID=" + userId + "&status=" + status,
    type: "GET",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    contentType: "application/json",
    error: function (err) {
      console.log(err);
      confirm(err.responseJSON.message);
    },
    success: function (orders) {
      $("#order-list").empty(); // Clear the order list

      orders.forEach(function (order) {
        let orderElement = $('<div class="order"></div>');
        orderElement.append("</br><h2>Khóa Học: " + order.course.courseName + "</h2></br>");

        let courseId = order.course.id;
        let urlGetVideos = baseUrlVideo + "/get-by-courseID" + "?courseID=" + courseId;

        $.ajax({
          url: urlGetVideos,
          type: "GET",
          beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
          },
          contentType: "application/json",
          error: function (err) {
            console.log(err);
            confirm(err.responseJSON.message);
          },
          success: function (videos) {
            let videoListElement = $('<div class="video-list"></div>');

            videos.forEach(function (video) {
              let videoElement = $('<div class="video"></div>');
              videoElement.append("</br><h4>" + video.title + ":</h4></br>");

              // Nhúng video YouTube
              videoElement.append(video.pathVideo);
              videoListElement.append(videoElement);
            });

            orderElement.append(videoListElement);
          },
        });

        $("#order-list").append(orderElement);
      });
    },
  });
}

// Gọi hàm khi trang tải xong hoặc khi cần
$(document).ready(function () {
  getListOrder("DONE");
});
