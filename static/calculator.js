const inputBalanceBFWD = document.getElementById("bbf")
const inputDeposits =  document.getElementById("deposits")
const inputCheckAmnt = document.getElementById("checkAmount")
const inputOtherDeductns =  document.getElementById("otherDeductions0")
const deductionInputDiv = document.getElementById("deductionInputDiv")
const depositInputDiv =  document.getElementById("depositInputDiv")
const depositTotal =  document.getElementById("depositTotal")
const balance =  document.getElementById("balance")
const balanceForward =  document.getElementById("balanceForward")

let inputTags = document.getElementsByTagName('input')

// working code
document.getElementById("submitButton").addEventListener("click", calculation)
document.getElementById("plusButton").addEventListener("click", addDeposit)
document.getElementById("minusButton").addEventListener("click", removeDeposit)


// **** FUNCTIONING CODE ******
let depositsListID = []
let depositSum = 0.0
function calculation() {   
    
    depositsListID.push(parseFloat(document.getElementById('deposits0').value))
    console.log('depositsListID ' + depositsListID)

    if (depositsListID.length > 1) {
        for (let x = 1; x < depositsListID.length - 1; x++) {
        depositSum += depositsListID[x]
        console.log('depositsListID > 1 ' + depositsListID[x])
        }
    } else if (depositsListID.length == 1) {
        depositSum += depositsListID[0]
        console.log('depositsListID == 1 ' + depositsListID[0])
    }
    console.log(depositSum)

    depositTotalCalculated = depositSum + parseFloat(inputBalanceBFWD.value)
    // depositTotal.innerHTML = `Deposit Total ${parseFloat(depositTotalCalculated, 2)}`
    depositTotal.innerHTML = `Deposit Total ${depositTotalCalculated.toFixed(2)}`
    

    balanceCalculated = depositTotalCalculated - parseFloat(inputCheckAmnt.value)
    balance.innerHTML =  `Balance ${balanceCalculated.toFixed(2)}`

    balanceForwardCalculated = balanceCalculated - parseFloat(inputOtherDeductns.value) 
    balanceForward.innerHTML = `Balance Forward ${balanceForwardCalculated.toFixed(2)}`
}   

let numID = 0
function addDeposit() {
    
    numID += 1
    
    let newInput = document.createElement('input')   
    newInput.setAttribute('type','number')
    // newInput.setAttribute('class','form-control')
    newInput.setAttribute('value','0')
    newInput.setAttribute('class',`depositInputs${numID}`)
    // newInput.setAttribute('class',`form-control`)
    newInput.setAttribute('id',`deposits${numID}`)
    
    depositInputDiv.appendChild(newInput)
    
    console.log(depositsListID.push(parseFloat(inputTags[`${parseFloat(numID)}`].value)))
    console.log('numID' + numID)
    // console.log('depoists val ' + parseFloat(document.getElementById(`deposits${numID}`).value))

    depositsListID.push(parseFloat(document.getElementById(`deposits${numID}`).value))

    console.log('depositsListID' + depositsListID)
        
}

let deductionsListID = []
let deductionSum = 0.0
function removeDeposit() {
    
    if(inputTags.length > 4) {
        inputTags[inputTags.length - 3].remove()
        depositsListID.pop(depositsListID.length - 1 )
        console.log(depositsListID)
        // depositsListID.push(parseFloat(document.getElementById('deposits0').value))
        numID -= 1  
    }    
}
// **** END OF FUNCTIONING CODE ******


// 2690.76 1759.44 327.25 1276.2