/*
Name: Eric Cruz 
Date: 7/8/23
*/

// TODO - CALCULATE THE DEPOSITS TOTAL JUST LIKE DEDUCTIONS TOTAL, RESET INPUTS FROM ADDED INPUTS 

// DOM elements
let bbfInput = document.getElementById('bbfInput')
let depositInput = document.getElementById('depositInput')
let checkAmountInput = document.getElementById('checkAmountInput')
let deductionsInput = document.getElementById('deductionsInput')

let depositTotal = document.getElementById('depositTotal')
let balance = document.getElementById('balance')
let otherDeductions = document.getElementById('otherDeductions')
let balanceForward = document.getElementById('balanceForward')

let calculateButton = document.getElementById('calculateButton')
let resetButton = document.getElementById('resetButton')

calculateButton.addEventListener('click', collectUserValues)
resetButton.addEventListener('click', resetUserValues)

//class performs calculations
class BalanceCalculator {
    constructor(balanceBBFValue, depositsValue, checkAmountValue, deductionsValue) {
        this.balanceBBFValue = balanceBBFValue  
        this.depositsValue = depositsValue
        this.checkAmountValue = checkAmountValue
        this.deductionsValue = deductionsValue
    }
    addTotal() {
        return this.balanceBBFValue + this.depositsValue
    }   
    findBalance() {
        return this.addTotal() - this.checkAmountValue
    }
    addDeductionValue() {
        return this.deductionsValue
    }
    findBalanceForward() {
        return this.findBalance() - this.addDeductionValue()
    }
    findTotalSpending() {
        return this.checkAmountValue + this.deductionsValue
    }

    displayResults() {
        let results = []
        let total = ` Total $${this.addTotal().toFixed(2)}`
        let balance = `Balance $${this.findBalance().toFixed(2)}`
        let otherDeductions = `Deductions Total $${this.addDeductionValue().toFixed(2)}`
        let balanceForward = `Balance Forward $${this.findBalanceForward().toFixed(2)}`
        results.push(total,balance, otherDeductions, balanceForward)
        
        return results
    }

    clearValues() {
        this.balanceBBFValue = null 
        this.depositsValue = null
        this.checkAmountValue = null
        this.deductionsValue = null
    }
}

// creates user input when plus button is pressed on both deposits and deductions
let idCounter = 0
function createUserInput(buttonType) {
    let newDivInput = document.createElement('div')
    let newInput = document.createElement('input')
    let inputButton = document.createElement('button')

    newDivInput.setAttribute('class','input-group')
    newDivInput.setAttribute('name','input-group')
    
    newInput.setAttribute('type','number')
    newInput.setAttribute('class','form-control')
    newInput.setAttribute('placeholder','$0.00')

    inputButton.setAttribute('type','button')
    inputButton.setAttribute('class','btn btn-info')
    inputButton.setAttribute('onclick',`deleteUserInput(this)`)
    inputButton.innerHTML = '-'

    // collects the pressed button's id and checks if it's from deposits or deductions
    if(buttonType.id == 'depositPlusButton') {    
        newDivInput.setAttribute('id',`plusButtonDiv${idCounter}`)
        inputButton.setAttribute('id',`plusButton${idCounter}`)
        newInput.setAttribute('name','depositGroup')
        newDivInput.appendChild(newInput)
        newDivInput.appendChild(inputButton)
        document.getElementById('depositsDiv').appendChild(newDivInput)
    }
    if(buttonType.id == 'deductionPlusButton') {
        newDivInput.setAttribute('id',`minusButtonDiv${idCounter}`)
        inputButton.setAttribute('id',`minusButton${idCounter}`)
        newInput.setAttribute('name','deductionGroup')
        newDivInput.appendChild(newInput)
        newDivInput.appendChild(inputButton)
        document.getElementById('deductionsDiv').appendChild(newDivInput)
    }       
    idCounter+=1
}

// deletes input field when minus button pressed
function deleteUserInput(buttonId) {    
    document.getElementById(`${buttonId.id}`).parentElement.remove()
}

// grabs the user's input from the input fields, including the fields created from the plus buttons
let testing
function collectUserValues() {
    let BBFValue = parseFloat(bbfInput.value)
    let depositValue = parseFloat(depositInput.value)
    let checkAmountValue = parseFloat(checkAmountInput.value)
    let deductionsValue = parseFloat(deductionsInput.value)

    let depositGroupList = document.getElementsByName('depositGroup')
    let deductionGroupList = document.getElementsByName('deductionGroup')

    if(isNaN(BBFValue)){
        BBFValue = 0
        console.log('ran')
    } 
    if(isNaN(depositValue)){
        depositValue = 0
        console.log('ran')
    } 
    if(isNaN(checkAmountValue)){
        checkAmountValue = 0
        console.log('ran')
    } 
    if(isNaN(deductionsValue)){
        deductionsValue = 0
        console.log('ran')
    }
    if(depositGroupList.length > 0){
        for(let i = 0; i < depositGroupList.length; i++) {
            depositValue += parseFloat(depositGroupList[i].value)
        }
    }

    if(deductionGroupList.length > 0){
        for(let i = 0; i < deductionGroupList.length; i++) {
            deductionsValue += parseFloat(deductionGroupList[i].value)
        }
    }
    
    testing = new BalanceCalculator(BBFValue, depositValue, checkAmountValue, deductionsValue)
    displayResults()
}

// displays the user's values from collectUserValues()
function displayResults() {
    if(testing.addTotal() < (testing.findTotalSpending())) {
        document.getElementById("balanceForward").style.backgroundColor = "red";
        document.getElementById("balanceForward").style.color = "#eee"; 
    } else {
        document.getElementById("balanceForward").style.backgroundColor = "rgba(0, 255, 102, 0.193)";
        document.getElementById("balanceForward").style.color = "initial"; }

    let results = testing.displayResults()
    depositTotal.innerHTML = results[0]
    balance.innerHTML = results[1]
    otherDeductions.innerHTML = results[2]
    balanceForward.innerHTML = results[3]
}   

// runs when reset button is clicked
function resetUserValues() {
    let text = "Are You Sure You Want To Clear?";
    if (confirm(text) == true) {
        testing = new BalanceCalculator(parseFloat(0), parseFloat(0), parseFloat(0), parseFloat(0))
        testing.clearValues()
        depositTotal.innerHTML = ''
        balance.innerHTML = ''      
        otherDeductions.innerHTML = ''  
        balanceForward.innerHTML = ''
        bbfInput.value = '' 
        depositInput.value = '' 
        checkAmountInput.value = '' 
        deductionsInput.value = '' 
        document.getElementById("balanceForward").style.backgroundColor = "rgba(0, 255, 102, 0.193)";
        document.getElementById("balanceForward").style.color = "initial"; 
    } 
}

// 2690.76 1759.44 327.25 1276.2