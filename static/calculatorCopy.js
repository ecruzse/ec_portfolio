const inputBalanceBFWD = document.getElementById("bbf")
const inputDeposits =  document.getElementById("deposits")
const inputCheckAmnt = document.getElementById("checkAmount")
const inputOtherDeductns =  document.getElementById("otherDeductions0")
const deductionInputDiv = document.getElementById("deductionInputDiv0")
const depositInputDiv =  document.getElementById("depositInputDiv")
const depositTotal =  document.getElementById("depositTotal")
const balance =  document.getElementById("balance")
const balanceForward =  document.getElementById("balanceForward")
const inputFormDiv = document.getElementById("inputFormDiv")
const clearButton = document.getElementById("clearButton")

document.getElementById("plusButtonDeductions").addEventListener("click", addDeduction)
document.getElementById("minusButtonDeductions").addEventListener("click", removeDeduction)
document.getElementById("plusButtonDeposit").addEventListener("click", addDeposit)
document.getElementById("minusButtonDeposit").addEventListener("click", removeDeposit)
document.getElementById("submitButton").addEventListener("click", calculation)
clearButton.addEventListener('click', clear)

let depositValues = []
let deductionValues = []

let deductionInputCount = 0
function addDeduction() {

    let newInputDiv = document.createElement('div')
    let newInput = document.createElement('input')
    deductionInputCount += 1
    
    newInputDiv.setAttribute('class', 'input-group')
    newInputDiv.setAttribute('id', `newDeductionInputDiv${deductionInputCount}`)
    inputFormDiv.appendChild(newInputDiv)

    newInput.setAttribute('id', `otherDeductions${deductionInputCount}`)
    newInput.setAttribute('value', '0')
    newInput.setAttribute('class', 'form-control')
    newInput.setAttribute('type', 'number')
    newInput.setAttribute('step', '1')
    newInputDiv.appendChild(newInput)

    console.log('inputCount in addDeduction ' + deductionInputCount)
}

function removeDeduction() {
    if (document.getElementById(`newDeductionInputDiv${deductionInputCount}`) !== document.getElementById(`newInputDiv0}`)) { 
        document.getElementById(`newDeductionInputDiv${deductionInputCount}`).remove()
        console.log('inputCount in removeDeduction ' + deductionInputCount)
        deductionInputCount -= 1
    }
}

let depositInputCount = 0
function addDeposit() {

    let newInputDiv = document.createElement('div')
    let newInput = document.createElement('input')
    depositInputCount += 1
    
    newInputDiv.setAttribute('class', 'input-group')
    newInputDiv.setAttribute('id', `newDepositInputDiv${depositInputCount}`)
    depositInputDiv.appendChild(newInputDiv)

    newInput.setAttribute('id', `deposits${depositInputCount}`)
    newInput.setAttribute('value', '0')
    newInput.setAttribute('class', 'form-control')
    newInput.setAttribute('step', '1')
    newInput.setAttribute('type', 'number')
    newInputDiv.appendChild(newInput)
    
}

function removeDeposit() {
    if (document.getElementById(`newDepositInputDiv${depositInputCount}`) !== document.getElementById(`newInputDiv0}`)) { 
        document.getElementById(`newDepositInputDiv${depositInputCount}`).remove()
        console.log('inputCount in removeDeduction ' + depositInputCount)
        depositInputCount -= 1
        
        if (depositValues.length > 1) {
        depositValues.pop(document.getElementById(`deposits${depositInputCount}`).value)
        console.log(depositValues)
        }
    }
}

function calculation() {

    for(let x = 0; x <= depositInputCount; x++) {
        depositValues.push(document.getElementById(`deposits${x}`).value)
        // console.log("depositValues " + depositValues)
    }

    for(let x = 0; x <= deductionInputCount; x++) {
        deductionValues.push(document.getElementById(`otherDeductions${x}`).value)
        // console.log("deductionValues " + deductionValues)
    }

    let depositValueTotal = 0
    for(let x = 0; x < depositValues.length; x++) {
        depositValueTotal += parseFloat(depositValues[x])
        // console.log(`type of ${typeof(depositValues[x])}`)
    }

    let deductionValueTotal = 0
    for(let x = 0; x < deductionValues.length; x++) {
        deductionValueTotal += parseFloat(deductionValues[x])
        // console.log(`type of ${typeof(depositValues[x])}`)
    }
    
    displayCalculation(depositValueTotal,deductionValueTotal)
}

function displayCalculation(depositValueTotal,deductionValueTotal) {

    let bbfValue = parseFloat(inputBalanceBFWD.value, 2)
    let checkAmountValue = inputCheckAmnt.value

    let total = bbfValue + depositValueTotal
    depositTotal.innerHTML = `Total: $${parseFloat(total , 2).toFixed(2)}`

    let balanceNum = total - parseFloat(checkAmountValue)
    balance.innerHTML = `Balance: $${parseFloat(balanceNum, 2).toFixed(2)}`

    document.getElementById('otherDeductionsOutput').innerHTML = `Other Deductions: $${deductionValueTotal.toFixed(2)}`

    let balanceForwardNum = balanceNum - deductionValueTotal
    balanceForward.innerHTML = `Balance Forward: $${parseFloat(balanceForwardNum,2).toFixed(2)}`

    deductionValues = []
    depositValues = []
}

// add a clear button 
function clear() {

    if(deductionValues.length > 0) {
        for(let x = 0; x <= deductionValues.length; x++) {
            document.getElementById(`otherDeductions${x}`).value = 0
        }
    }else if(deductionValues.length == 0){
        document.getElementById(`otherDeductions0`).value = 0
    }

    if(depositValues.length > 0) {
        for(let x = 0; x <= depositValues.length; x++) {
            document.getElementById(`deposits${x}`).value = 0
        } 
    }else if(depositValues.length == 0){
            document.getElementById(`deposits0`).value = 0
        }
    
    depositTotal.innerHTML = ''
    balance.innerHTML = ''
    document.getElementById('otherDeductionsOutput').innerHTML = ''
    balanceForward.innerHTML = ''
            
    inputBalanceBFWD.value = 0
    inputCheckAmnt.value = 0
    depositValues = []
    deductionValues = []
    deductionInputCount = 0
    depositInputCount = 0
}

// 2690.76 1759.44 327.25 1276.2