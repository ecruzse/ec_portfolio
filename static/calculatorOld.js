const balanceBroughtForward = document.getElementById("bbf")
const deposits =  document.getElementById("deposits")
const checkAmount = document.getElementById("checkAmount")
const deductions = document.getElementById("deductions")
const otherDeductions =  document.getElementById("otherDeductions")
const deductionInputDiv = document.getElementById("deductionInputDiv")
const depositInputDiv =  document.getElementById("depositInputDiv")
const depositTotal =  document.getElementById("depositTotal")
const balance =  document.getElementById("balance")
const balanceForward =  document.getElementById("balanceForward")
const submitButton = document.getElementById("submitButton")
const clearButton = document.getElementById("clearButton")
const errorMessage = document.getElementById("errorMessage")

submitButton.addEventListener('click', collectUserValues)
clearButton.addEventListener('click', clearUserValues)

class calculator{
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
        depositTotal.innerHTML = this.addTotal().toFixed(2)
        balance.innerHTML = this.findBalance().toFixed(2)
        otherDeductions.innerHTML = this.addDeductionValue().toFixed(2)
        balanceForward.innerHTML = this.findBalanceForward().toFixed(2)
    }

    clearValues() {
        this.balanceBBFValue = null 
        this.depositsValue = null
        this.checkAmountValue = null
        this.deductionsValue = null
        depositTotal.innerHTML = ""
        balance.innerHTML = ""
        otherDeductions.innerHTML = ""
        balanceForward.innerHTML = ""

        balanceBroughtForward.value = ''
        deposits.value = ''
        checkAmount.value = ''
        deductions.value = ''
    }

}

let testing
function collectUserValues() {
    let balanceBBFValue = balanceBroughtForward.value
    let depositsValue = deposits.value
    let checkAmountValue = checkAmount.value
    let deductionsValue = deductions.value

    if(balanceBBFValue != "" && depositsValue != "" && checkAmountValue != "" && typeof deductionsValue != ""){
        console.log(balanceBBFValue)
        console.log(depositsValue)
        console.log(checkAmountValue)
        console.log(deductionsValue)
        
        testing = new calculator(parseFloat(balanceBBFValue),parseFloat(depositsValue),parseFloat(checkAmountValue),parseFloat(deductionsValue))
        testing.displayResults()
    } if (balanceBBFValue == "" ){ 
        // errorMessage.innerHTML = 'ERROR: Must enter a number in all fields'
        balanceBBFValue = 0
    } if(depositsValue == "") {
        depositsValue = 0
    } if(checkAmountValue == "") {
        checkAmountValue = 0 
    } if(deductionsValue == "") {
        deductionsValue = 0
    }
    
    testing = new calculator(parseFloat(balanceBBFValue),parseFloat(depositsValue),parseFloat(checkAmountValue),parseFloat(deductionsValue))
    testing.displayResults()
}

function clearUserValues() {
    testing.clearValues()
}

// 2690.76 1759.44 327.25 1276.2