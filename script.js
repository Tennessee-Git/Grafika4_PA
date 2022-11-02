let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d", { willReadFrequently: true });

let fileInput = document.getElementById("file");
let fileButton = document.getElementById("fileButton");

let applyAdd = document.getElementById("applyAdd");
let applySubtract = document.getElementById("applySubtract");
let applyMultiply = document.getElementById("applyMultiply");
let applyDivide = document.getElementById("applyDivide");
let resetBrightness = document.getElementById("resetBrightness");
let applyGrayscale = document.getElementById("applyGrayscale");

let addInput = document.getElementById("add");
let subtractInput = document.getElementById("subtract");
let multiplyInput = document.getElementById("multiply");
let divideInput = document.getElementById("divide");
let brightnessInput = document.getElementById("brightness");
let grayscaleInput = document.getElementById("grayscale");

let brightnessValue = document.getElementById("brightnessValue");

let averageFilterButton = document.getElementById("avgBtn");
let medianFilterButton = document.getElementById("medBtn");

let imageUploaded = false;
let originalImage;

const processFile = () => {
  var file = fileInput.files[0];
  var reader = new FileReader();
  var image = new Image();
  reader.onload = function (e) {
    image.onload = () => {
      let nw = image.naturalWidth;
      let nh = image.naturalHeight;
      canvas.height = nh;
      canvas.width = nw;
      imageUploaded = true;
      ctx.drawImage(image, 0, 0, nw, nh);
      originalImage = ctx.getImageData(0, 0, nw, nh);
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
  // var imageData = JSON.parse(JSON.s);
  var imageData = ctx.createImageData(
    originalImage.width,
    originalImage.height
  );
  imageData.data.set(originalImage.data);
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

const applyLightnessGrayscale = () => {
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var arr = imageData.data;
  for (let i = 0; i < arr.length; i += 4) {
    var sum =
      Math.min(arr[i], arr[i + 1], arr[i + 2]) +
      Math.max(arr[i], arr[i + 1], arr[i + 2]);
    var grayValue = Math.round(sum / 2);
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
  var value = 1 / 9;
  var mask = [value, value, value, value, value, value, value, value, value];
  var arr = converTo2dArray(imageData.data, canvas.height, canvas.width);
  applyLinearFilter(arr, canvas.height, canvas.width, mask, false);
};

const applyMedianFilter = () => {
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var arr = converTo2dArray(imageData.data, canvas.height, canvas.width);
  for (let x = 0; x < canvas.width; x++)
    for (let y = 0; y < canvas.height; y++) {
      arr[y][x] = 0.3 * arr[y][x].r + 0.59 * arr[y][x].g + 0.11 * arr[y][x].b;
    }
  for (let x = 1; x < canvas.width - 1; x++) {
    for (let y = 1; y < canvas.height - 1; y++) {
      let arrToSort = [];
      arrToSort.push(arr[y][x]);
      arrToSort.push(arr[y + 1][x]);
      arrToSort.push(arr[y - 1][x]);
      arrToSort.push(arr[y][x + 1]);
      arrToSort.push(arr[y][x - 1]);
      arrToSort.push(arr[y + 1][x + 1]);
      arrToSort.push(arr[y + 1][x - 1]);
      arrToSort.push(arr[y - 1][x + 1]);
      arrToSort.push(arr[y - 1][x - 1]);
      arrToSort = arrToSort.sort((a, b) => a - b);
      arr[y][x] = arrToSort[4];
    }
  }
  var tempArr = arr.flat();
  var outputArray = new Uint8ClampedArray(4 * canvas.width * canvas.height);
  var tempArrIndex = 0;
  for (let i = 0; i < outputArray.length; i += 4) {
    outputArray[i] = tempArr[tempArrIndex];
    outputArray[i + 1] = tempArr[tempArrIndex];
    outputArray[i + 2] = tempArr[tempArrIndex];
    outputArray[i + 3] = 255;
    tempArrIndex++;
  }
  imageData.data = outputArray;
  ctx.putImageData(
    new ImageData(outputArray, canvas.width, canvas.height),
    0,
    0
  );
};

const applySobelFilter = () => {
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var mask = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
  var arr = converTo2dArray(imageData.data, canvas.height, canvas.width);
  for (let x = 0; x < canvas.width; x++)
    for (let y = 0; y < canvas.height; y++) {
      arr[y][x] = 0.3 * arr[y][x].r + 0.59 * arr[y][x].g + 0.11 * arr[y][x].b;
    }
  applyLinearFilter(arr, canvas.height, canvas.width, mask, true);
};

const applySharpeningFilter = () => {
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var mask = [-1, -1, -1, -1, 9, -1, -1, -1, -1];
  var arr = converTo2dArray(imageData.data, canvas.height, canvas.width);
  applyLinearFilter(arr, canvas.height, canvas.width, mask, false);
};

const applyGaussianBlur = () => {
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var mask = [1, 2, 1, 2, 4, 2, 1, 2, 1];
  var arr = converTo2dArray(imageData.data, canvas.height, canvas.width);
  for (let x = 0; x < canvas.width; x++)
    for (let y = 0; y < canvas.height; y++) {
      arr[y][x] = 0.3 * arr[y][x].r + 0.59 * arr[y][x].g + 0.11 * arr[y][x].b;
    }
  applyLinearFilter(arr, canvas.height, canvas.width, mask, true);
};

const applyLinearFilter = (image, height, width, mask, grayscale) => {
  if (!grayscale) {
    for (let x = 1; x < width - 1; x++) {
      for (let y = 1; y < height - 1; y++) {
        var sumR = 0,
          sumG = 0,
          sumB = 0;
        sumR =
          image[(y - 1, x - 1)].r * mask[0] +
          image[(y - 1, x)].r * mask[1] +
          image[(y + 1, x + 1)].r * mask[2] +
          image[(y, x - 1)].r * mask[3] +
          image[(y, x).r] * mask[4] +
          image[(y, x + 1)].r * mask[5] +
          image[(y + 1, x - 1)].r * mask[6] +
          image[(y + 1, x)].r * mask[7] +
          image[(y + 1, x + 1)].r * mask[8];
        image[y][x] = {
          r: sumR,
          g: sumG,
          b: sumB,
        };
      }
    }
  } else {
    for (let x = 1; x < canvas.width - 1; x++) {
      for (let y = 1; y < canvas.height - 1; y++) {
        var sumGray = 0;
        sumGray =
          image[(y - 1, x - 1)] * mask[0] +
          image[(y - 1, x)] * mask[1] +
          image[(y + 1, x + 1)] * mask[2] +
          image[(y, x - 1)] * mask[3] +
          image[(y, x)] * mask[4] +
          image[(y, x + 1)] * mask[5] +
          image[(y + 1, x - 1)] * mask[6] +
          image[(y + 1, x)] * mask[7] +
          image[(y + 1, x + 1)] * mask[8];
        if (sumGray < 0) sumGray = 0;
        if (sumGray > 255) sumGray = 255;
        image[y][x] = sumGray;
      }
    }
  }
  convertToImageData(image, height, width);
};

const converTo2dArray = (imageData, height, width) => {
  let arr = [];
  for (let i = 0; i < imageData.length; i += 4) {
    arr.push({
      r: imageData[i],
      g: imageData[i + 1],
      b: imageData[i + 2],
    });
  }
  var outputArray = [];
  for (let i = 0; i < height; i++) {
    outputArray.push(Array.from(Array(width)));
  }
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      outputArray[y][x] = arr[x + width * y];
    }
  }
  return outputArray;
};

const convertToImageData = (array, height, width) => {
  var imageSrc = new Uint8ClampedArray(4 * width * height);
  for (let i = 0; i < imageSrc.length; i += 4) {
    imageSrc[i] = array[i / 4 / width][(i / 4) % width].r;
    imageSrc[i + 1] = array[i / 4 / width][(i / 4) % width].g;
    imageSrc[i + 2] = array[i / 4 / width][(i / 4) % width].b;
    imageSrc[i + 3] = 255;
  }
  ctx.putImageData(new ImageData(imageSrc, width, height), 0, 0);
};

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

brightnessInput.addEventListener("input", () => {
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
    else if (selectedOption === "g3") applyLightnessGrayscale();
    else alert("Pick grayscale method!");
  } else alert("Pick an image!");
});

averageFilterButton.addEventListener("click", () => {
  if (imageUploaded) {
    var value = brightnessInput.value;
    applyAverageFilter();
  } else alert("Pick an image!");
});

medianFilterButton.addEventListener("click", () => {
  if (imageUploaded) {
    var value = brightnessInput.value;
    applyMedianFilter();
  } else alert("Pick an image!");
});
