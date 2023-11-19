"use strict";
let $ = (data) => document.querySelector(data);
let errorP = $('#error');
let userInput = $("#input");
let rgbDiv = $("#rgbResult");
let rgbConvertorBtn = $('#rgbConvertor');
let submitBtn = $('input[type="submit"]');
let inputType = $('#inputType');
let decimalInp = $('#decimal');
let hexInp = $('#hex');
let binaryInp = $('#binary');
let allFormInp = [decimalInp, binaryInp, hexInp];
let rButton = $('#rButton');
let gButton = $('#gButton');
let bButton = $('#bButton');
let rgbInp = $('#rgb');
let decimalBtn = $('#decimalBtn');
let binaryBtn = $('#binaryBtn');
let hexBtn = $('#hexBtn');
let rgbBtn = $('#rgbBtn');
let btnArray = [decimalBtn, binaryBtn, hexBtn, rgbBtn];
let restartBtn = $('#restart');
let from = '';
let inputValue = 0;
let openConvertor = false;
rgbConvertorBtn === null || rgbConvertorBtn === void 0 ? void 0 : rgbConvertorBtn.addEventListener('click', () => {
    from = inputType.value;
    if (openConvertor) {
        rgbDiv.style.opacity = '0';
        openConvertor = false;
    }
    else {
        rgbDiv.style.opacity = '1';
        openConvertor = true;
        if (userInput.value) {
            if (from == 'decimal') {
                rgbConvertor(decToHex(userInput.value));
            }
            else if (from == 'hex') {
                rgbConvertor(userInput.value);
            }
            else if (from == 'binary') {
                rgbConvertor(decToHex(binaryToDec(userInput.value)));
            }
        }
    }
});
submitBtn === null || submitBtn === void 0 ? void 0 : submitBtn.addEventListener('click', () => {
    from = inputType.value;
    allFormInp.forEach(inp => {
        inp.value = '';
    });
    rButton.innerHTML = '';
    rButton.innerHTML = '';
    rButton.innerHTML = '';
    rgbDiv.style.opacity = '0';
    let nonHexPattern = /[a-zA-Z]/;
    let hexPattern = /[a-fA-F]/;
    if (nonHexPattern.test(userInput.value) && from !== 'hex') {
        errorP.style.opacity = '1';
    }
    else if (!hexPattern.test(userInput.value) && from == 'hex') {
        errorP.style.opacity = '1';
    }
    else {
        errorP.style.opacity = '0';
        switch (from) {
            case 'decimal':
                decimalInp.value = userInput.value;
                binaryInp.value = decToBinary(userInput.value);
                hexInp.value = decToHex(userInput.value);
                break;
            case 'hex':
                hexInp.value = userInput.value;
                decimalInp.value = hexToDec(userInput.value);
                break;
            case 'binary':
                binaryInp.value = userInput.value;
                decimalInp.value = binaryToDec(userInput.value);
                break;
        }
    }
});
let decToBinary = (inpNumber) => {
    let collectNum = [];
    let quotient = inpNumber;
    let rest;
    while (quotient !== 0) {
        rest = quotient % 2;
        collectNum.unshift(rest);
        quotient = Math.floor(quotient / 2);
    }
    let stringNum = '';
    collectNum.forEach(num => {
        stringNum += num;
    });
    return Number(stringNum);
};
let decToHex = (inpNumber) => {
    let collectNum = [];
    let quotient = inpNumber;
    let rest;
    while (quotient !== 0) {
        rest = quotient % 16;
        switch (rest) {
            case 10:
                rest = 'A';
                break;
            case 11:
                rest = 'B';
                break;
            case 12:
                rest = 'C';
                break;
            case 13:
                rest = 'D';
                break;
            case 14:
                rest = 'E';
                break;
            case 15:
                rest = 'F';
                break;
        }
        collectNum.unshift(rest);
        quotient = Math.floor(quotient / 16);
    }
    let stringNum = '';
    collectNum.forEach(num => {
        stringNum += num;
    });
    return stringNum;
};
let reverseString = (inpNum) => {
    let stringArray = inpNum.toString().split('');
    let numberArray = [];
    stringArray.forEach(num => {
        numberArray.unshift(num);
    });
    return numberArray;
};
let binaryToDec = (inpNumber) => {
    let sum = 0;
    let numberArray = reverseString(inpNumber);
    for (let i = 0; i < numberArray.length; i++) {
        sum += Math.pow(2, i) * Number(numberArray[i]);
    }
    hexInp.value = decToHex(sum);
    return sum;
};
let hexToDec = (inpNumber) => {
    let sum = 0;
    let numberArray = reverseString(inpNumber);
    for (let i = 0; i < numberArray.length; i++) {
        let rest = 0;
        switch (numberArray[i].toUpperCase()) {
            case "A":
                rest = 10;
                break;
            case "B":
                rest = 11;
                break;
            case "C":
                rest = 12;
                break;
            case "D":
                rest = 13;
                break;
            case "E":
                rest = 14;
                break;
            case "F":
                rest = 15;
                break;
            default:
                rest = Number(numberArray[i]);
        }
        sum += Math.pow(16, i) * rest;
    }
    binaryInp.value = decToBinary(sum);
    return sum;
};
let rgbConvertor = (inpNum) => {
    let arrayForConvert = [];
    let arrayOfInp = inpNum.split("");
    for (let i = 0; i < arrayOfInp.length; i += 2) {
        let newArr = [];
        newArr.push(arrayOfInp[i], arrayOfInp[i + 1]);
        arrayForConvert.push(newArr);
    }
    let arrayOfDec = [];
    arrayForConvert.forEach(arr => {
        let newElm = hexToDec(arr.join('')) + '';
        arrayOfDec.push(newElm);
    });
    rButton.innerHTML = arrayOfDec[0] ? arrayOfDec[0] : '0';
    gButton.innerHTML = arrayOfDec[1] ? arrayOfDec[1] : '0';
    bButton.innerHTML = arrayOfDec[2] ? arrayOfDec[2] : '0';
    rgbInp.value = `(${rButton.innerHTML}, ${gButton.innerHTML} , ${bButton.innerHTML})`;
};
btnArray.forEach(btn => {
    btn.addEventListener('click', (event) => {
        copyInpData(event);
    });
});
const copyInpData = (event) => {
    const dataBtnValue = event.target.getAttribute('data-btn');
    if (dataBtnValue !== '') {
        switch (dataBtnValue) {
            case 'decimalInp':
                navigator.clipboard.writeText(decimalInp.value);
                break;
            case 'binaryInp':
                navigator.clipboard.writeText(binaryInp.value);
                break;
            case 'hexInp':
                navigator.clipboard.writeText(hexInp.value);
                break;
            case 'rgbInp':
                navigator.clipboard.writeText(rgbInp.value);
                break;
        }
    }
};
restartBtn.addEventListener('click', () => {
    userInput.value = '';
    inputType.value = 'decimal';
    allFormInp.forEach(inp => inp.value = '');
    rButton.innerHTML = "R";
    gButton.innerHTML = "G";
    bButton.innerHTML = "B";
    rgbInp.value = '';
    errorP.style.opacity = '0';
});
