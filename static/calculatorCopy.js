const inputBalanceBFWD = document.getElementById("bbf")
const inputDeposits =  document.getElementById("deposits")
const inputCheckAmnt = document.getElementById("checkAmount")
const inputOtherDeductns =  document.getElementById("otherDeductions")
const deductionInputDiv = document.getElementById("deductionInputDiv")
const depositInputDiv =  document.getElementById("depositInputDiv")
const depositTotal =  document.getElementById("depositTotal")
const balance =  document.getElementById("balance")
const balanceForward =  document.getElementById("balanceForward")
const inputFormDiv = document.getElementById("inputFormDiv")

let inputTags = document.getElementsByTagName('input')


// document.getElementById("submitButton").addEventListener("click", calculation)
// document.getElementById("plusButton").addEventListener("click", addDeposit)
// document.getElementById("minusButton").addEventListener("click", removeDeposit)


let newInputDiv = document.createElement('div')
newInputDiv.setAttribute('class', 'input-group')
newInputDiv.setAttribute('id', 'newInputDiv')

inputFormDiv.appendChild(newInputDiv)

let newInput = document.createElement('input')
newInput.setAttribute('id', 'otherDeductions1')
newInput.setAttribute('value', '0')
newInput.setAttribute('class', 'form-control')

newInputDiv.appendChild(newInput)




// 2690.76 1759.44 327.25 1276.2