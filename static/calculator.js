/*
Name: Eric Cruz 
Date: 7/8/23
OOP based calculator
*/

function BalanceCalculator() {

    this.idCounter = 0;
    
    // calculation functions
    this.addTotal = function addTotal() {
        return this.domElements['bbfInput'] + this.depositValue;
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

    this.domElements = {};
    this.domList = ["bbfInput", "depositInput", "checkAmountInput", "deductionsInput",'enteredDeposits','depositTotal','balance','otherDeductions','balanceForward','calculateButton', 'resetButton','depositPlusButton','deductionsCreated','createdFields','createdDepositFields','createdDeductionFields']
    // creates the DOM object and assigns the key value pairs
    this.domCreate = function domCreate(){
        for(let i = 0; i <= this.domList.length; i++){
            this.domElements[this.domList[i]] = document.getElementById(`${this.domList[i]}`);
        };
    };
    this.domCreate();

    // grabs the user's input from the input fields, including the fields created from the plus buttons
    this.collectUserValues = function collectUserValues() {
        this.domCreate();
        let BBFValue =  parseFloat(this.domElements['bbfInput'].value);
        let depositValue =  parseFloat(this.domElements['depositInput'].value);
        let checkAmountValue =  parseFloat(this.domElements['checkAmountInput'].value);
        let deductionsValue =  parseFloat(this.domElements['deductionsInput'].value);

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

        let depositGroupList = document.getElementsByName('depositGroup');
        let deductionGroupList = document.getElementsByName('deductionGroup');

        if(depositGroupList.length > 0){
            for(let i = 0; i < depositGroupList.length; i++) {
                if(isNaN(parseFloat(depositGroupList[i].value))){
                    depositValue += 0;
                } else {
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

        this.domElements['bbfInput'] = BBFValue;
        this.depositValue = depositValue;
        this.checkAmountValue = checkAmountValue;
        this.deductionsValue = deductionsValue;  
        this.displayResults();
    };

    // displays the user's values from collectUserValues() 
    this.displayResults = function displayResults() {
        let total = ` Total $${this.addTotal().toLocaleString('en-US')}`;
        let balance = `Balance $${this.findBalance().toLocaleString('en-US')}`;
        let otherDeductions = `Deductions Total $${this.addDeductionValue().toLocaleString('en-US')}`;
        let balanceForward = `Balance Forward $${this.findBalanceForward().toLocaleString('en-US')}`;

        if(this.addTotal() < (this.findTotalSpending())) {
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
    this.createUserInput = function createUserInput(buttonType) {
        let newDivInput = document.createElement('div');
        let newInput = document.createElement('input');
        let inputButton = document.createElement('button');

        newDivInput.setAttribute('class','input-group');
        newDivInput.setAttribute('name','input-group');
        
        newInput.setAttribute('type','number');
        newInput.setAttribute('class','form-control');
        newInput.setAttribute('placeholder','$0.00');
        newInput.setAttribute('step','0.1');

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
            this.domElements['createdDepositFields'].appendChild(newDivInput);  
        };

        if(buttonType == 'deductionPlusButton') {
            newDivInput.setAttribute('id',`minusButtonDiv${this.idCounter}`);
            inputButton.setAttribute('id',`minusButton${this.idCounter}`);
            newInput.setAttribute('name','deductionGroup');
            newDivInput.appendChild(newInput);
            newDivInput.appendChild(inputButton);
            this.domElements['createdDeductionFields'].appendChild(newDivInput);
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
            
            this.domElements['createdDepositFields'].innerHTML = '';
            this.domElements['createdDeductionFields'].innerHTML = '';
            this.domElements['depositTotal'].innerHTML = '';
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