//access DOM elements of the calculator
const inputBox = document.getElementById('input');
const expressionDiv = document.getElementById('expression');
const resultDiv = document.getElementById('result');
//define expression and result variable
let expression = '';
let result = '';
let lastButtonClicked = '';

//Define event handler for button clicks
function buttonClick(event){
    //get values from clicked button
    const target = event.target;
    const action = target.dataset.action;
    const value = target.dataset.value;
   // console.log(target, action, value);

   //switch case to control the calculator
   switch (action){
        case 'number':
            if (expression === '' && result === '') {
            addValue(value);}
            else if(expression === '' && result!== ''){}
            else{
                addValue(value);
            }
            break;
        case 'clear':
            clear();
            break;
        case 'backspace':
            backspace();
            break;
    //add result to expression if expression is empty
        case 'addition':
        case 'subtraction':
        case 'multiplication':
        case 'division':
            if(expression !== '' && result === ''){
                startFromExpression(value);
            }else if(expression === '' && result !== ''){
                startFromResult(value);
            }else if(expression !== '' && !isLastCharOperator()) {
                addValue(value);
            }
            break;
        case 'submit':
            submit();
            break;
        case 'negate':
            negate();
            break;
         case 'mod':
            percentage();
            break;
        case 'decimal':
            decimal(value);
            break;
   }
   getLastButtonClick(action);
   //update display
   updateDisplay(expression, result);
}
function getLastButtonClick(button) {
    if(button=== 'addition' || 
        button ==='subtraction' ||
        button ==='multiplication' || 
        button === 'division'){
            lastButtonClicked = button;
    } 
}

inputBox.addEventListener('click', buttonClick)

function addValue(value) {
    if (value === '.'){
    const lastOperatorIndex = expression.search(/[+\-*/]/);
    const lastDecimalIndex = expression.lastIndexOf('.');
    const lastNumberIndex = Math.max(
    expression.lastIndexOf('+'),
    expression.lastIndexOf('-'),
    expression.lastIndexOf('*'),
    expression.lastIndexOf('/')
);
    if (
        (lastOperatorIndex > lastDecimalIndex ||
        lastDecimalIndex < lastNumberIndex ||
        lastDecimalIndex === - 1) &&
        (expression === '' ||
            expression.slice(lastNumberIndex + 1).indexOf('-') 
            === -1)
            ) {
        expression += value;
    }
  }else {
    expression += value;
  }
}
function updateDisplay(expression, result) {
    expressionDiv.textContent = expression;
    resultDiv.textContent= result;
}
function clear() {
    expression= '';
    result= '';
    operator= '';
}
function backspace() {
    expression = expression.slice(0,-1)
}
function isLastCharOperator() {
    return isNaN(parseInt(expression.slice(-1)));
}
function startFromExpression(value) {
    result = expression;
    expression = value;
}
function startFromResult(value) {
    expression = value;
}
function submit(){
    result = evaluateExpression();
    expression = '';
}
function evaluateExpression(){
    
    const evalResult = eval(result + expression);
    return isNaN(evalResult) || !isFinite(evalResult)
    ? ' '
    : evalResult < 1
    ? parseFloat(evalResult.toFixed(10))
    : parseFloat(evalResult.toFixed(2));
}
function negate(){
    //negate result if expression = empty / result!= empty
    if(expression ==='' && result !== ''){
        result = -result;
    }else if (!expression.startsWith('-') && expression !== ''){
        expression = '-' +expression;
    }else if (expression.startsWith('-')){
        expression = expression.slice(1);
    }
}


//alte Prozent-Funktion
 /*function percentage(){
    if(expression !==''){
        result = evaluateExpression();
        expression = '';
        if (!isNaN(result) && isFinite(result)){
            result /= 100;
        }else {
            result = '';
        }
    } else if (result !== ''){
        result = parseFloat(result) / 100;
    }
}*/


// neue Prozent-Funktion
function percentage() {
    const cleanedMultiplication = expression.replace('*', '');
    const cleanedDivision = expression.replace('/', '');


    if (lastButtonClicked === 'addition' || lastButtonClicked === 'subtraction'){
        let getPercentagefromResult = result * expression / 100;        
        expression = getPercentagefromResult;
        let plus = '+';
        if (expression >= 0){
        expression = plus + expression;
        }
    }else if (lastButtonClicked ==='multiplication' ){
        let percentageMultiplication = cleanedMultiplication / 100;        
        expression = percentageMultiplication;
        let multiply = '*';
        if (expression >= 0){
        expression = multiply + expression;
        }
    }else if (lastButtonClicked === 'division'){
        let percentageDivision = cleanedDivision / 100;        
        expression = percentageDivision;
        let divide = '/';
        if (expression >= 0){
        expression = divide + expression;
        }
        }
}

function decimal(value){
    if (!expression.endsWith('.') && !isNaN(expression.slice(-1))) {
        addValue(value);
    }
}
