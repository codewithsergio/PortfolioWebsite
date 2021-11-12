var inputField = document.getElementById("inputField");
var step1Text = document.getElementById("step1Text");
var step2Text = document.getElementById("step2Text");
var step3Text = document.getElementById("step3Text");
var step4Text = document.getElementById("step4Text");
var meanText = document.getElementById("meanText");
var standText = document.getElementById("standardText");
var medianText = document.getElementById("medianText");
var stepsDiv = document.getElementById("stepsDiv");
var buttonField = document.getElementById("button");
var median = 0;
var mean = 0;
var added = 0;
var addedDeviations = 0;
var stDev = 0;
var hold = 0;
var parsedArray;
var step1String = "";
var initialString = "";
var string = "";
var taskDone = false;
var num2 = "2";

buttonField.innerHTML = "Calculate";
inputField.disabled = false;
function button() {
    stepsDiv.style.visibility = 'visible';
    if (taskDone == true){
        location.reload();
        return;
    }
    
    // if nothing in numField, don't do anything
    if (inputFieldEmpty()){
        return;
    }
    initialString = inputField.value;
    string = initialString.split(" ");
    
    step1String = parseStringToInt(string, step1String);
    
    parsedArray = string;
    console.log(parsedArray + " this is parsedArray midway");
    
    
    // add and divide to solve for the mean
    mean = added / parsedArray.length;
    mean = Math.floor(mean * 10000) / 10000;
    
    step1Text.innerHTML = "Step 1: Find the mean. <br>" + step1String + " = " + added + " / " + parsedArray.length + "<br> Mean = " + mean + "<br><br>";
    // mean solved
    
    
    // display mean answer
    meanText.innerHTML = "Mean: " + mean;
    
    /////////////////////////////////////////////
    // SOLVE FOR STANDARD DEVIATION ////////////
    ///////////////////////////////////////////
    
    orderParsedArray(hold, parsedArray);
    
    //solve for median
    if (parsedArray.length % 2 == 0){
        median = (parsedArray[parsedArray.length / 2] + parsedArray[(parsedArray.length / 2) - 1])/2;
    } else {
        median = parsedArray[Math.floor(parsedArray.length/2)];
    }
    medianText.innerHTML = "Median: " + median;
    
    // calculation to solve for standard deviation
    step2Text.innerHTML = "Step 2: Subtract mean from inputs, and square them. <br>";
    step3Text.innerHTML = "Step 3: Add up all the numbers from step 2. <br>";
    step4Text.innerHTML = "Step 4: Divide the number you got from step 3 by (input length minus 1). <br>";
    for (var i = 0; i < parsedArray.length; i++){
        var minusNum = parsedArray[i] - mean;
        step2Text.innerHTML += "(" + parsedArray[i] + " - " + mean + ") =  " + (Math.floor(minusNum * 10000)/10000) + num2.sup() + " = " + ((Math.floor((minusNum * minusNum) * 100))/100) + "<br>"; // display step 2 nums
        parsedArray[i] = (parsedArray[i] - mean) * (parsedArray[i] - mean);
        step3Text.innerHTML += (Math.floor(parsedArray[i] * 100)/100);
        if (i != parsedArray.length - 1){
            step3Text.innerHTML += " + ";
        }
        addedDeviations += parsedArray[i];
    }
    step3Text.innerHTML += " = " + (Math.floor(addedDeviations * 10000)/10000);
    // rounding standard deviation
    var whatGoesUnderSquareRoot = (Math.floor((addedDeviations / (parsedArray.length - 1)) * 1000)/1000);
    stDev = Math.round((Math.sqrt(addedDeviations / (parsedArray.length - 1)) * 10))/10;
    step4Text.innerHTML += (Math.floor(addedDeviations * 10000)/10000) + " / " + "(" + parsedArray.length + " - 1" + ") = " + " sqrt(" + whatGoesUnderSquareRoot + ")" + " = " + stDev;
    standText.innerHTML = "Standard Deviation: " + stDev;
    
    step2Text.innerHTML += " <br> ";
    step3Text.innerHTML += " <br> <br>";
    step4Text.innerHTML += " <br> <br>" + "Standard Deviation = " + stDev;
    taskDone = true;
    buttonField.innerHTML = "Refresh List";
    inputField.disabled = true;
}

// refactored functions
function inputFieldEmpty(){
    return inputField.value == "";
}

function parseStringToInt(string, step1String){
    for (var i = 0; i < string.length; i++) {
        // check to see if last string is a space
        if (string[i] == ""){
            string.length = string.length - 1;
            break;
        }
        string[i] = parseInt(string[i]);
        step1String += string[i] + " + ";
        added += string[i];
    }
    // remove last plus sign
    step1String = step1String.substring(0, step1String.length - 3);
    
    return step1String;
}

function orderParsedArray(hold, parsedArray){
    for (var i = 0; i < parsedArray.length - 1; i++) {
        for (var p = 1; p < parsedArray.length;p++){
            if (parsedArray[i] > parsedArray[i + p]){
                hold = parsedArray[i];
                parsedArray[i] = parsedArray[i + p];
                parsedArray[i + p] = hold;
            }
        }
    }
}
