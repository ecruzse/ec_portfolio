/*
Name: Eric Cruz 
Date: 7/8/23
OOP based calculator
*/

class BalanceCalculator {
    constructor() {

        this.idCounter = 0;
        this.domElements = {};
        this.domList = ["bbfInput", "depositInput", "checkAmountInput", "deductionsInput", 'enteredDeposits', 'depositTotal', 'balance', 'otherDeductions', 'balanceForward', 'calculateButton', 'resetButton', 'depositPlusButton', 'deductionsCreated', 'createdFields', 'createdDepositFields', 'createdDeductionFields'];

        //Get the modal
        this.modal = document.getElementById("modal");
        // Get the button that opens the modal
        this.btn = document.getElementById("resetButton");
        // Get the <span> element that closes the modal
        this.closeBtn = document.getElementById("closeBtn");
        
        this.mNo = document.getElementById('mNo')
        this.mYes = document.getElementById('mYes')
        this.windowListener()
        this.mNo.onclick = this.closeModal
        this.btn.onclick = this.showModal
        this.closeBtn.onclick = this.closeModal
        this.mYes.onclick = this.resetUserValues
        this.domCreate()
    };     

    // creates the DOM object and assigns the key value pairs
    domCreate = function domCreate() {
        for (let i = 0; i <= this.domList.length; i++) {
            this.domElements[this.domList[i]] = document.getElementById(`${this.domList[i]}`);
        };
    };

    addTotal() {
        return this.domElements['bbfInput'] + this.depositValue;
    };
    findBalance() {
        return this.addTotal() - this.checkAmountValue;
    };
    findDepositsValue() {
        return this.depositsValue;
    };
    addDeductionValue() {
        return this.deductionsValue;
    };
    findBalanceForward() {
        return this.findBalance() - this.addDeductionValue();
    };
    findTotalSpending() {
        return this.checkAmountValue + this.deductionsValue;
    };

    // grabs the user's input from the input fields, including the fields created from the plus buttons
    collectUserValues() {
        this.domCreate();
        let BBFValue = parseFloat(this.domElements['bbfInput'].value);
        let depositValue = parseFloat(this.domElements['depositInput'].value);
        let checkAmountValue = parseFloat(this.domElements['checkAmountInput'].value);
        let deductionsValue = parseFloat(this.domElements['deductionsInput'].value);

        if (isNaN(BBFValue)) {
            BBFValue = 0;
        };
        if (isNaN(depositValue)) {
            depositValue = 0;
        };
        if (isNaN(checkAmountValue)) {
            checkAmountValue = 0;
        };
        if (isNaN(deductionsValue)) {
            deductionsValue = 0;
        };

        let depositGroupList = document.getElementsByName('depositGroup');
        let deductionGroupList = document.getElementsByName('deductionGroup');

        if (depositGroupList.length > 0) {
            for (let i = 0; i < depositGroupList.length; i++) {
                if (isNaN(parseFloat(depositGroupList[i].value))) {
                    depositValue += 0;
                } else {
                    depositValue += parseFloat(depositGroupList[i].value);
                };
            };
        };

        if (deductionGroupList.length > 0) {
            for (let i = 0; i < deductionGroupList.length; i++) {
                if (isNaN(parseFloat(deductionGroupList[i].value))) {
                    deductionsValue += 0;
                } else {
                    deductionsValue += parseFloat(deductionGroupList[i].value);
                };
            };
        };

        this.domElements['bbfInput'] = BBFValue;
        this.depositValue = depositValue;
        this.checkAmountValue = checkAmountValue;
        this.deductionsValue = deductionsValue;
        this.displayResults();
    };

    // displays the user's values from collectUserValues() 
    displayResults() {
        let total = ` Total $${this.addTotal().toLocaleString('en-US')}`;
        let balance = `Balance $${this.findBalance().toLocaleString('en-US')}`;
        let otherDeductions = `Deductions Total $${this.addDeductionValue().toLocaleString('en-US')}`;
        let balanceForward = `Balance Forward $${this.findBalanceForward().toLocaleString('en-US')}`;

        if (this.addTotal() < (this.findTotalSpending())) {
            document.getElementById("balanceForward").style.backgroundColor = "red";
            document.getElementById("balanceForward").style.color = "#eee";
        } else {
            document.getElementById("balanceForward").style.backgroundColor = "rgba(0, 255, 102, 0.193)";
            document.getElementById("balanceForward").style.color = "initial";
        };

        this.domElements['depositTotal'].innerHTML = total;
        this.domElements['balance'].innerHTML = balance;
        this.domElements['otherDeductions'].innerHTML = otherDeductions;
        this.domElements['balanceForward'].innerHTML = balanceForward;
    };

    // creates user input when plus button is pressed on both deposits and deductions
    createUserInput(buttonType) {
        let newDivInput = document.createElement('div');
        let newInput = document.createElement('input');
        let inputButton = document.createElement('button');

        newDivInput.setAttribute('class', 'input-group');
        newDivInput.setAttribute('name', 'input-group');

        newInput.setAttribute('type', 'number');
        newInput.setAttribute('class', 'form-control');
        newInput.setAttribute('placeholder', '$0.00');
        newInput.setAttribute('step', '0.1');

        inputButton.setAttribute('type', 'button');
        inputButton.setAttribute('class', 'btn btn-info');
        inputButton.setAttribute('onclick', `initializeClass.deleteUserInput(this)`);
        inputButton.innerHTML = '-';

        // collects the pressed button's id and checks if it's from deposits or deductions
        if (buttonType == 'depositPlusButton') {
            newDivInput.setAttribute('id', `plusButtonDiv${this.idCounter}`);
            inputButton.setAttribute('id', `plusButton${this.idCounter}`);
            newInput.setAttribute('name', 'depositGroup');
            newDivInput.appendChild(newInput);
            newDivInput.appendChild(inputButton);
            this.domElements['createdDepositFields'].appendChild(newDivInput);
        };

        if (buttonType == 'deductionPlusButton') {
            newDivInput.setAttribute('id', `minusButtonDiv${this.idCounter}`);
            inputButton.setAttribute('id', `minusButton${this.idCounter}`);
            newInput.setAttribute('name', 'deductionGroup');
            newDivInput.appendChild(newInput);
            newDivInput.appendChild(inputButton);
            this.domElements['createdDeductionFields'].appendChild(newDivInput);
        };
        this.idCounter += 1;
    };

    // deletes input field when minus button pressed
    deleteUserInput(buttonId) {
        document.getElementById(`${buttonId.id}`).parentElement.remove();
    };
    
    // modal functionality
    windowListener() {
        window.onclick = function(event) {
            if (event.target == modal) {
              modal.style.display = "none";
            };
          };
    };

    showModal() {
        modal.style.display = "block";
        console.log('opened')
    };

    closeModal() {
        modal.style.display = "none";
        console.log('closed')
    };

    // runs when reset button is clicked
    resetUserValues() {
        document.getElementById("balanceForward").style.backgroundColor = "rgba(0, 255, 102, 0.193)";
        document.getElementById("balanceForward").style.color = "initial"; 

        document.getElementById('bbfInput').value = '';
        document.getElementById('checkAmountInput').value = ''
        document.getElementById('depositInput').value = ''
        document.getElementById('deductionsInput').value = ''

        document.getElementById('balance').innerHTML = '';
        document.getElementById('otherDeductions').innerHTML = '';
        document.getElementById('balanceForward').innerHTML = '';
        document.getElementById('createdDepositFields').innerHTML = '';
        document.getElementById('createdDeductionFields').innerHTML = '';
        document.getElementById('depositTotal').innerHTML = '';

        
        console.log('reset');
        
    };
    
};

   

// BaseThemeChanger.cssVar = '--divBackground-color'
// // BaseThemeChanger.color = 'rgb(144, 238, 144)'
// BaseThemeChanger.color = '#49db21'

function createMainClass() {    
    initializeClass = new BalanceCalculator();
};
createMainClass();
// 2690.76 1759.44 327.25 1276.2
