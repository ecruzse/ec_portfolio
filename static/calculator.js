/*
Name: Eric Cruz 
Date: 7/8/23
OOP based calculator
*/
// TODO - change DOM declarations to an object
function BalanceCalculator() {

    // DOM elements
    this.bbfInput = document.getElementById('bbfInput');
    this.depositInput = document.getElementById('depositInput');
    this.checkAmountInput = document.getElementById('checkAmountInput');
    this.deductionsInput = document.getElementById('deductionsInput');

    this.enteredDeposits = document.getElementById('enteredDeposits');
    this.depositTotal = document.getElementById('depositTotal');
    this.balance = document.getElementById('balance');
    this.otherDeductions = document.getElementById('otherDeductions');
    this.balanceForward = document.getElementById('balanceForward');

    this.calculateButton = document.getElementById('calculateButton');
    this.resetButton = document.getElementById('resetButton');
    this.createdDepositFields = document.getElementById('createdFields');
    this.createdDeductionFields = document.getElementById('deductionsCreated');
    
    this.depositPlusButton = document.getElementById('depositPlusButton');
    this.deductionPlusButton = document.getElementById('deductionsCreated');

    this.createdDepositFields = document.getElementById('createdFields');
    this.createdDeductionFields = document.getElementById('deductionsCreated');

    this.idCounter = 0

    
    this.addTotal = function addTotal() {
        return this.bbfInput + this.depositValue;
    };
    this.findBalance = function findBalance() {
        return this.addTotal() - this.checkAmountValue;
    };
    this.findDepositsValue = function findDepositsValue() {
        return this.depositsValue;
    };
    this.addDeductionValue = function addDeductionValue() {
        return this.deductionsValue;
    };
    this.findBalanceForward = function findBalanceForward() {
        return this.findBalance() - this.addDeductionValue();
    };
    this.findTotalSpending = function findTotalSpending() {
        return this.checkAmountValue + this.deductionsValue;
    };

    // grabs the user's input from the input fields, including the fields created from the plus buttons
    this.collectUserValues = function collectUserValues() {
        let BBFValue = parseFloat(bbfInput.value);
        let depositValue = parseFloat(depositInput.value);
        let checkAmountValue = parseFloat(checkAmountInput.value);
        let deductionsValue = parseFloat(deductionsInput.value);

        let depositGroupList = document.getElementsByName('depositGroup');
        let deductionGroupList = document.getElementsByName('deductionGroup');

        if(depositGroupList.length > 0){
            for(let i = 0; i < depositGroupList.length; i++) {
                if(isNaN(parseFloat(depositGroupList[i].value))){
                    typeof(parseFloat(depositGroupList[i].value));
                    depositValue += 0
                } else {
                    typeof(parseFloat(depositGroupList[i].value));
                    depositValue += parseFloat(depositGroupList[i].value);
                };
            };
        };

        if(deductionGroupList.length > 0){
            for(let i = 0; i < deductionGroupList.length; i++) {
                if(isNaN(parseFloat(deductionGroupList[i].value))){
                    deductionsValue += 0;
                } else {
                    deductionsValue += parseFloat(deductionGroupList[i].value);
                };
            };
        };

        if(isNaN(BBFValue)){
            BBFValue = 0;
        };
        if(isNaN(depositValue)){
            depositValue = 0;
        };
        if(isNaN(checkAmountValue)){
            checkAmountValue = 0;
        };
        if(isNaN(deductionsValue)){
            deductionsValue = 0;
        };

        this.bbfInput = BBFValue;
        this.depositValue = depositValue;
        this.checkAmountValue = checkAmountValue;
        this.deductionsValue = deductionsValue;  
        this.displayResults();
    }

    this.displayResults = function displayResults() {
        let total = ` Total $${this.addTotal().toLocaleString('en-US')}`;
        let balance = `Balance $${this.findBalance().toLocaleString('en-US')}`;
        let otherDeductions = `Deductions Total $${this.addDeductionValue().toLocaleString('en-US')}`;
        let balanceForward = `Balance Forward $${this.findBalanceForward().toLocaleString('en-US')}`;

    // displays the user's values from collectUserValues()
        if(this.addTotal() < (this.findTotalSpending())) {
            document.getElementById("balanceForward").style.backgroundColor = "red";
            document.getElementById("balanceForward").style.color = "#eee"; 
        } else {
            document.getElementById("balanceForward").style.backgroundColor = "rgba(0, 255, 102, 0.193)";
            document.getElementById("balanceForward").style.color = "initial"; 
        };

        this.depositTotal.innerHTML = total;
        this.balance.innerHTML = balance;
        this.otherDeductions.innerHTML = otherDeductions;
        this.balanceForward.innerHTML = balanceForward;
    }   

    // creates user input when plus button is pressed on both deposits and deductions
    this.createUserInput = function createUserInput(buttonType) {
        let newDivInput = document.createElement('div');
        let newInput = document.createElement('input');
        let inputButton = document.createElement('button');

        newDivInput.setAttribute('class','input-group');
        newDivInput.setAttribute('name','input-group');
        
        newInput.setAttribute('type','number');
        newInput.setAttribute('class','form-control');
        newInput.setAttribute('placeholder','$0.00');

        inputButton.setAttribute('type','button');
        inputButton.setAttribute('class','btn btn-info');
        inputButton.setAttribute('onclick',`initializeClass.deleteUserInput(this)`);
        inputButton.innerHTML = '-';

        // collects the pressed button's id and checks if it's from deposits or deductions
        if(buttonType == 'depositPlusButton') {    
            newDivInput.setAttribute('id',`plusButtonDiv${this.idCounter}`);
            inputButton.setAttribute('id',`plusButton${this.idCounter}`);
            newInput.setAttribute('name','depositGroup');
            newDivInput.appendChild(newInput);
            newDivInput.appendChild(inputButton);
            this.createdDepositFields.appendChild(newDivInput);  
        };

        if(buttonType == 'deductionPlusButton') {
            newDivInput.setAttribute('id',`minusButtonDiv${this.idCounter}`);
            inputButton.setAttribute('id',`minusButton${this.idCounter}`);
            newInput.setAttribute('name','deductionGroup');
            newDivInput.appendChild(newInput);
            newDivInput.appendChild(inputButton);
            this.createdDeductionFields.appendChild(newDivInput);
        };
        this.idCounter+=1;
    };

    // deletes input field when minus button pressed
    this.deleteUserInput = function deleteUserInput(buttonId) {    
        document.getElementById(`${buttonId.id}`).parentElement.remove();
    };
   
    // runs when reset button is clicked
    this.resetUserValues = function resetUserValues() {
        let text = "Are You Sure You Want To Clear?";
        if (confirm(text) == true) {
            
            document.getElementById("balanceForward").style.backgroundColor = "rgba(0, 255, 102, 0.193)";
            document.getElementById("balanceForward").style.color = "initial"; 
            
            this.createdDepositFields.innerHTML = '';
            this.createdDeductionFields.innerHTML = '';
            this.bbfInput.value = '';
            this.depositTotal.innerHTML = '';
            this.balance.innerHTML = ''   ;
            this.otherDeductions.innerHTML = '';
            this.balanceForward.innerHTML = '';

            document.getElementById('bbfInput').value = '';
            document.getElementById('checkAmountInput').value = '';
            document.getElementById('depositInput').value = '';
            document.getElementById('deductionsInput').value = '';
        } ;
    };
};

function createMainClass() {    
    initializeClass = new BalanceCalculator();
};
createMainClass();
// 2690.76 1759.44 327.25 1276.2