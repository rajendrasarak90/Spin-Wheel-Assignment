// function to crete a spinner
function create_spinner() {
  // colors for showing different gift cards in the wheel
  color_data = [
    "#fedf30",
    "#fdb441",
    "rgb(255, 2, 242)",
    "#eb5454",
    "#bf9dd3",
    "#29b8cd",
    "#00f2a6",
    "#f67",
  ];
  // gift card names
  label_data = [
    "Shirt",
    "Bike",
    "Wallet",
    "Mobile",
    "Camera",
    "Shoes",
    "Watch",
    "Chain",
  ];
  var color = color_data;
  var label = label_data;
  var slices = color.length;
  var sliceDeg = 360 / slices;
  var deg = rand(0, 360);
  var ctx = canvas.getContext("2d");
  var width = canvas.width; // size
  var center = width / 2; // center
  ctx.clearRect(0, 0, width, width);
  for (var i = 0; i < slices; i++) {
    ctx.beginPath();
    ctx.fillStyle = color[i];
    ctx.moveTo(center, center);
    ctx.arc(center, center, width / 2, deg2rad(deg), deg2rad(deg + sliceDeg));
    ctx.lineTo(center, center);
    ctx.fill();
    var drawText_deg = deg + sliceDeg / 2;
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(deg2rad(drawText_deg));
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "bold 15px sans-serif";
    ctx.fillText(label[i], 100, 5);
    ctx.restore();
    deg += sliceDeg;
  }
}
create_spinner();

var deg = rand(0, 360);
var speed = 10;
var ctx = canvas.getContext("2d");
var width = canvas.width; // size
var center = width / 2; // center
var isStopped = false;
var lock = false;
var slowDownRand = 0;
var attempt = 1;

// function for running the wheel i.e. runs after clicking on Spin Now!
function spin() {
  if (attempt === 3) {
    return swal({
      title: "Want New Try?",
      text: "Refresh the page for playing again",
      type: "warning",
      confirmButtonText: "OK",
      closeOnConfirm: true,
    });
  }
  color_data = [
    "#fedf30",
    "#fdb441",
    "#fd6930",
    "#eb5454",
    "#bf9dd3",
    "#29b8cd",
    "#00f2a6",
    "#f67",
  ];
  label_data = [
    "Shirt",
    "Bike",
    "Wallet",
    "Mobile",
    "Camera",
    "Shoes",
    "Watch",
    "Chain",
  ];
  var color = color_data;
  var label = label_data;
  var slices = color.length;
  var sliceDeg = 360 / slices;
  deg += speed;
  deg %= 360;

  if (!lock) {
    lock = true;
    slowDownRand = rand(0.99, 0.993);
  }
  speed = speed > 0.2 ? (speed *= slowDownRand) : 0;
  // Stopped!

  if (lock && !speed) {
    var ai = Math.floor(((360 - deg - 90) % 360) / sliceDeg); // deg 2 Array Index
    ai = (slices + ai) % slices; // Fix negative index

    // First attempt: Display "Try Again" alert
    if (attempt === 1) {
      attempt++;
      deg = rand(0, 360);
      speed = 10;
      ctx = canvas.getContext("2d");
      width = canvas.width; // size
      center = width / 2; // center
      isStopped = false;
      lock = false;
      slowDownRand = 0;
      return swal({
        title: "Try Again",
        text: "Better luck next time!",
        type: "warning",
        confirmButtonText: "OK",
        closeOnConfirm: true,
      });
    }
    // Second attempt: Display the gift card
    else if (attempt === 2) {
      attempt++;
      return swal({
        title: "Congratulations!",
        text: "You won a " + label[ai] + " as a gift card!",
        type: "success",
        confirmButtonText: "OK",
        closeOnConfirm: true,
      });
    }
  }
  ctx.clearRect(0, 0, width, width);
  for (var i = 0; i < slices; i++) {
    ctx.beginPath();
    ctx.fillStyle = color[i];
    ctx.moveTo(center, center);
    ctx.arc(center, center, width / 2, deg2rad(deg), deg2rad(deg + sliceDeg));
    ctx.lineTo(center, center);
    ctx.fill();
    var drawText_deg = deg + sliceDeg / 2;
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(deg2rad(drawText_deg));
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "bold 15px sans-serif";
    ctx.fillText(label[i], 100, 5);
    ctx.restore();
    deg += sliceDeg;
  }
  window.requestAnimationFrame(spin);
}

function deg2rad(deg) {
  return (deg * Math.PI) / 180;
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
}
