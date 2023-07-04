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
resetButton.addEventListener('click', clearUserValues)

class balanceCalculator{
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

function createInputField() {
   
}

let testing
function collectUserValues() {
    // let depositValuesTotal = 0
    let BBFValue = bbfInput.value
    let depositValue = depositInput.value
    let checkAmountValue = checkAmountInput.value
    let deductionsValue = deductionsInput.value

    if(BBFValue != "" && depositValue != "" && checkAmountValue != "" && deductionsValue != ""){
        testing = new balanceCalculator(parseFloat(BBFValue), parseFloat(depositValue), parseFloat(checkAmountValue), parseFloat(deductionsValue))
        displayResults()
    } 
    if(depositValue == "") {
        depositValue = 0
    } 
    if(checkAmountValue == "") {
        checkAmountValue = 0
    } 
    if(deductionsValue == "") {
        deductionsValue = 0
    } 
    if(BBFValue == "") {
        BBFValue = 0
    } 

    testing = new balanceCalculator(parseFloat(BBFValue), parseFloat(depositValue), parseFloat(checkAmountValue), parseFloat(deductionsValue))
    displayResults()
}

function displayResults() {
    
    let results = testing.displayResults()
    depositTotal.innerHTML = results[0]
    balance.innerHTML = results[1]
    otherDeductions.innerHTML = results[2]
    balanceForward.innerHTML = results[3]
    }   

function clearUserValues() {

    let text = "Are You Sure You Want To Clear?";
    if (confirm(text) == true) {
        testing.clearValues()
        depositTotal.innerHTML = ''
        balance.innerHTML = ''      
        otherDeductions.innerHTML = ''  
        balanceForward.innerHTML = ''
        bbfInput.value = '' 
        depositInput.value = '' 
        checkAmountInput.value = '' 
        deductionsInput.value = '' 
    } else {
        text = "You canceled!";
    }

   
}

// 2690.76 1759.44 327.25 1276.2