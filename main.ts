let $ = (data: string) => document.querySelector(data);

let errorP: HTMLElement = $('#error') as HTMLElement;
let userInput: HTMLFormElement = $("#input") as HTMLFormElement;
let rgbDiv: HTMLElement = $("#rgbResult") as HTMLElement;
let rgbConvertorBtn: HTMLElement | null = $('#rgbConvertor') as HTMLElement | null;
let submitBtn: HTMLFormElement = $('input[type="submit"]') as HTMLFormElement;
let inputType: HTMLFormElement = $('#inputType') as HTMLFormElement;

let decimalInp: HTMLFormElement = $('#decimal') as HTMLFormElement;
let hexInp: HTMLFormElement = $('#hex') as HTMLFormElement;
let binaryInp: HTMLFormElement = $('#binary') as HTMLFormElement;
let allFormInp: HTMLFormElement[] = [decimalInp,binaryInp,hexInp];

let rButton: HTMLElement = $('#rButton') as HTMLElement;
let gButton: HTMLElement  = $('#gButton') as HTMLElement ;
let bButton: HTMLElement  = $('#bButton') as HTMLElement ;
let rgbInp: HTMLFormElement = $('#rgb') as HTMLFormElement;

let decimalBtn: HTMLElement = $('#decimalBtn') as HTMLElement;
let binaryBtn: HTMLElement = $('#binaryBtn') as HTMLElement;
let hexBtn: HTMLElement = $('#hexBtn') as HTMLElement;
let rgbBtn: HTMLElement = $('#rgbBtn') as HTMLElement;

let btnArray: HTMLElement[] = [decimalBtn,binaryBtn,hexBtn,rgbBtn];
let restartBtn: HTMLElement = $('#restart') as HTMLElement;

let from: string = '';
let inputValue: number = 0;

let openConvertor: boolean = false;


rgbConvertorBtn?.addEventListener('click' , () : void => {
        from = inputType.value;
        if(openConvertor){
            rgbDiv.style.opacity = '0';
            openConvertor = false;
        }else{
            rgbDiv.style.opacity = '1';
            openConvertor = true;
            if(userInput.value){
                if(from == 'decimal'){
                    rgbConvertor(decToHex(userInput.value));
                }
                else if(from == 'hex'){
                    rgbConvertor(userInput.value);
                }
                else if(from == 'binary'){                
                    rgbConvertor(decToHex(binaryToDec(userInput.value)));
                }
            }
    }
})

submitBtn?.addEventListener('click' , (): void => {
        from = inputType.value;
        allFormInp.forEach(inp => {
            inp.value = '';
        })

        rButton.innerHTML = '';
        rButton.innerHTML = '';
        rButton.innerHTML = '';
        rgbDiv.style.opacity = '0';

        let nonHexPattern: RegExp = /[a-zA-Z]/;
        let hexPattern: RegExp = /[a-fA-F]/;
        
        if(nonHexPattern.test(userInput.value) && from !== 'hex'){
            errorP.style.opacity = '1';
        }
        else if(!hexPattern.test(userInput.value) && from == 'hex'){
            errorP.style.opacity = '1';
        }
        else{
            errorP.style.opacity = '0';
            switch(from){
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
       
})

let decToBinary = (inpNumber: number):number => {
    let collectNum: number[] = [];
    let quotient:number = inpNumber;
    let rest:number;

    while(quotient !== 0){
        rest = quotient%2;
        collectNum.unshift(rest);
        quotient = Math.floor(quotient/2);
    }
    
    let stringNum: string = '';
    collectNum.forEach(num => {
        stringNum += num;
    })
    
    return Number(stringNum);
}

let decToHex = (inpNumber: number): string => {
    let collectNum: (number|string)[] = [];
    let quotient:number = inpNumber;
    let rest:number|string;

    while(quotient !== 0){
        rest = quotient%16;
        switch(rest){
            case 10:        
                rest = 'A';
                break;
            case 11:        
                rest = 'B';
                break;
            case 12:
                rest = 'C'
                break;
            case 13:
                rest = 'D'
                break;
            case 14:
                rest = 'E'
                break;
            case 15:
                rest = 'F';
                break;
    }
    collectNum.unshift(rest);
    quotient = Math.floor(quotient/16);
    }

    let stringNum: string = '';
    collectNum.forEach(num => {
        stringNum += num;
    })
    return stringNum;
}
 
let reverseString = (inpNum: (number | string)) :String[] => {
    let stringArray: string[] = inpNum.toString().split('')
    let numberArray: String[] = [];
    
    stringArray.forEach(num => {
        numberArray.unshift(num);
    })
    
    return numberArray;
}

let binaryToDec = (inpNumber: number):number  => {
    let sum: number = 0;
    let numberArray = reverseString(inpNumber);

    for(let i:number=0;i<numberArray.length;i++){
        sum += Math.pow(2,i) * Number(numberArray[i]);
    }

    hexInp.value = decToHex(sum);
    return sum;
}

let hexToDec = (inpNumber: string):number  => {
    let sum: number = 0;
    let numberArray = reverseString(inpNumber);

    for(let i:number=0;i<numberArray.length;i++){
        let rest: number = 0;
        switch(numberArray[i].toUpperCase()){
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
                rest = Number(numberArray[i])
        }
        sum += Math.pow(16,i) * rest;
    }
    binaryInp.value = decToBinary(sum);
    
    return sum;
}

let rgbConvertor = (inpNum: string):void  => {
    let arrayForConvert :Array<string[]> = [];
    let arrayOfInp :string[]= inpNum.split("");

    for(let i:number=0;i<arrayOfInp.length;i+=2){
        let newArr :string[] = [];
        newArr.push(arrayOfInp[i],arrayOfInp[i+1]); 
        arrayForConvert.push(newArr);
    }

    let arrayOfDec :string[] = [];
        arrayForConvert.forEach(arr => {
        let newElm: string = hexToDec(arr.join('')) + '';
        arrayOfDec.push(newElm);
    })

        rButton.innerHTML = arrayOfDec[0] ? arrayOfDec[0] : '0';
        gButton.innerHTML = arrayOfDec[1] ? arrayOfDec[1] : '0';
        bButton.innerHTML = arrayOfDec[2] ? arrayOfDec[2] : '0';
        rgbInp.value = `(${rButton.innerHTML}, ${gButton.innerHTML} , ${bButton.innerHTML})`
}

btnArray.forEach(btn => {
    btn.addEventListener('click' , (event: Event) => {
        copyInpData(event);
    })
})

const copyInpData = (event: Event) => {
    const dataBtnValue: string | null = (event.target as HTMLElement).getAttribute('data-btn');
    if(dataBtnValue !== ''){
        switch(dataBtnValue){
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
}

restartBtn.addEventListener('click' , () : void => {
    userInput.value = '';
    inputType.value = 'decimal'
    allFormInp.forEach(inp => inp.value = '');
    rButton.innerHTML = "R";
    gButton.innerHTML = "G";
    bButton.innerHTML = "B";
    rgbInp.value = '';
    errorP.style.opacity = '0';
})
