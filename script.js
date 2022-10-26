let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d", { willReadFrequently: true });

let fileInput = document.getElementById("file");
let fileButton = document.getElementById("fileButton");

let applyAdd = document.getElementById("applyAdd");
let applySubtract = document.getElementById("applySubtract");
let applyMultiply = document.getElementById("applyMultiply");
let applyDivide = document.getElementById("applyDivide");
let applyBrightness = document.getElementById("applyBrightness");
let applyGrayscale = document.getElementById("applyGrayscale");

let addInput = document.getElementById("add");
let subtractInput = document.getElementById("subtract");
let multiplyInput = document.getElementById("multiply");
let divideInput = document.getElementById("divide");
let brightnessInput = document.getElementById("brightness");
let grayscaleInput = document.getElementById("grayscale");

let brightnessValue = document.getElementById("brightnessValue");

let imageUploaded = false;
let originalImage;

const processFile = () => {
  var file = fileInput.files[0];
  var reader = new FileReader();
  var image = new Image();
  reader.onload = function (e) {
    image.onload = () => {
      let w = canvas.width;
      let nw = image.naturalWidth;
      let nh = image.naturalHeight;
      let aspect = nw / nh;
      let h = w / aspect;
      canvas.height = h;
      imageUploaded = true;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      originalImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    };
    image.src = reader.result;
  };
  reader.readAsDataURL(file);
};

const addValues = (value) => {
  var LUT = [256];
  for (let i = 0; i < 256; i++) {
    LUT[i] = i + value > 255 ? 255 : i + value;
  }
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var arr = imageData.data;
  for (let i = 0; i < arr.length; i += 4) {
    arr[i] = LUT[arr[i]];
    arr[i + 1] = LUT[arr[i + 1]];
    arr[i + 2] = LUT[arr[i + 2]];
    arr[i + 3] = 255;
  }
  imageData.data = arr;
  ctx.putImageData(imageData, 0, 0);
};

const subtractValues = (value) => {
  var LUT = [256];
  for (let i = 0; i < 256; i++) {
    LUT[i] = i - value < 0 ? 0 : i - value;
  }
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var arr = imageData.data;
  for (let i = 0; i < arr.length; i += 4) {
    arr[i] = LUT[arr[i]];
    arr[i + 1] = LUT[arr[i + 1]];
    arr[i + 2] = LUT[arr[i + 2]];
    arr[i + 3] = 255;
  }
  imageData.data = arr;
  ctx.putImageData(imageData, 0, 0);
};

const multiplyValues = (value) => {
  var LUT = [256];
  for (let i = 0; i < 256; i++) {
    LUT[i] = i * value > 255 ? 255 : i * value;
  }
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var arr = imageData.data;
  for (let i = 0; i < arr.length; i += 4) {
    arr[i] = LUT[arr[i]];
    arr[i + 1] = LUT[arr[i + 1]];
    arr[i + 2] = LUT[arr[i + 2]];
    arr[i + 3] = 255;
  }
  imageData.data = arr;
  ctx.putImageData(imageData, 0, 0);
};

const divideValues = (value) => {
  var LUT = [256];
  for (let i = 0; i < 256; i++) {
    LUT[i] = i / value < 0 ? 0 : Math.round(i / value);
  }
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var arr = imageData.data;
  for (let i = 0; i < arr.length; i += 4) {
    arr[i] = LUT[arr[i]];
    arr[i + 1] = LUT[arr[i + 1]];
    arr[i + 2] = LUT[arr[i + 2]];
    arr[i + 3] = 255;
  }
  imageData.data = arr;
  ctx.putImageData(imageData, 0, 0);
};

const changeBrightness = (value) => {
  var LUT = [256];
  for (let i = 0; i < 256; i++) {
    var temp = i + 255 * (value / 100);
    if (temp < 0) LUT[i] = 0;
    else if (temp > 255) LUT[i] = 255;
    else LUT[i] = temp;
  }
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var arr = imageData.data;
  for (let i = 0; i < arr.length; i += 4) {
    arr[i] = LUT[arr[i]];
    arr[i + 1] = LUT[arr[i + 1]];
    arr[i + 2] = LUT[arr[i + 2]];
    arr[i + 3] = 255;
  }
  imageData.data = arr;
  ctx.putImageData(imageData, 0, 0);
};

const applyLuminosityGrayscale = () => {
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var arr = imageData.data;
  for (let i = 0; i < arr.length; i += 4) {
    var grayValue = 0.3 * arr[i] + 0.59 * arr[i + 1] + 0.11 * arr[i + 2];
    arr[i] = grayValue;
    arr[i + 1] = grayValue;
    arr[i + 2] = grayValue;
    arr[i + 3] = 255;
  }
  imageData.data = arr;
  ctx.putImageData(imageData, 0, 0);
};

const applyAverageGrayscale = () => {
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var arr = imageData.data;
  for (let i = 0; i < arr.length; i += 4) {
    var sum = arr[i] + arr[i + 1] + arr[i + 2];
    var grayValue = Math.round(sum / 3);
    arr[i] = grayValue;
    arr[i + 1] = grayValue;
    arr[i + 2] = grayValue;
    arr[i + 3] = 255;
  }
  imageData.data = arr;
  ctx.putImageData(imageData, 0, 0);
};

const applyAverageFilter = () => {
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
};

const applyMedianFilter = () => {
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
};

const applySobelFilter = () => {
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
};

const applySharpeningFilter = () => {
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
};

const applyGaussianBlur = () => {
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
};

function cloneImageData(imgData) {
  return new ImageData(imgData.data, imgData.width, imgData.height);
}

fileButton.addEventListener("click", processFile);

applyAdd.addEventListener("click", () => {
  if (imageUploaded) addValues(Number(addInput.value));
  else alert("Pick an image!");
});

applySubtract.addEventListener("click", () => {
  if (imageUploaded) subtractValues(Number(subtractInput.value));
  else alert("Pick an image!");
});

applyMultiply.addEventListener("click", () => {
  if (imageUploaded) multiplyValues(Number(multiplyInput.value));
  else alert("Pick an image!");
});

applyDivide.addEventListener("click", () => {
  if (imageUploaded) divideValues(Number(divideInput.value));
  else alert("Pick an image!");
});

applyBrightness.addEventListener("click", () => {
  if (imageUploaded) {
    var value = brightnessInput.value;
    changeBrightness(value);
  } else alert("Pick an image!");
});

applyGrayscale.addEventListener("click", () => {
  if (imageUploaded) {
    var selectedOption = document.getElementById("grayscale").value;

    if (selectedOption === "g1") applyLuminosityGrayscale();
    else if (selectedOption === "g2") applyAverageGrayscale();
    else alert("Pick grayscale method!");
  } else alert("Pick an image!");
});
