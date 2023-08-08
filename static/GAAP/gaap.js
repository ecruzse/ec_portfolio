const spanNames = document.getElementsByClassName('names');
const nameContainer = document.getElementById('nameContainer');
const mNameSpan = document.getElementById('mNameSpan');
const wNameSpan = document.getElementById('wNameSpan');
const nameButton = document.getElementById('nameButton');
const addNameButton = document.getElementById('addNameButton'); 
const addNameInput = document.getElementById('addNameInput'); 
const femaleSpan = document.getElementById('femaleSpan'); 
const maleSpan = document.getElementById('maleSpan'); 
const fillButton = document.getElementById('fillButton'); 


// modal consts
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

let participants = {
    male: {
        0: {first: 'LeBron', last: 'James'},
        1: {first: 'Michael', last: 'Jordan'},
        2: {first: 'Larry', last: 'Bird'},
        3: {first: 'Kobe', last: 'Bryant'}
    },
    female: {
        0: {first: 'JeBron', last: 'Lames'},
        1: {first: 'Jichael', last: 'Mordan'},
        2: {first: 'Barry', last:'Lird'},
        3: {first: 'Bobe', last: 'Kryant'}
        
    }
}

for(let value in Object.values(participants.male)){
    maleSpan.innerHTML += `<span class="names" draggable="true" name="male" data-set-gender="male">${participants.male[value].first} ${participants.male[value].last}</span>`
}

for(let value in Object.values(participants.female)){
    femaleSpan.innerHTML += `<span class="names" draggable="true" name="female" data-set-gender="female">${participants.female[value].first} ${participants.female[value].last}</span>`
}

// modal functionality
openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.mod.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.mod')
        closeModal(modal)
        addNameInput.value = ''
    })
})

function openModal(modal) {
    if(modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if(modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
    addNameInput.value = ''
}

// add name button functionality
addNameButton.addEventListener('click', collectData)   
function collectData() {
    let newName = document.getElementById('addNameInput').value
    let radioValue = 0

    document.getElementsByName('MNF')
        .forEach(radio => {
            if(radio.checked) {
                radioValue = radio.value
                
            }
    })

    console.log(radioValue)
    addNames(newName, radioValue)

   
} 

function addNames(newName, radioValue) {

    let nameSpan = document.createElement('span')
    nameSpan.setAttribute('class', 'names')
    nameSpan.setAttribute('draggable', 'true')
    
    nameSpan.innerHTML = newName    

    if(radioValue !== null)
        if (radioValue == 'male') {
            nameSpan.setAttribute('name', 'male')
            nameSpan.setAttribute('data-set-gender', 'male')
            console.log('male')
            mNameSpan.appendChild(nameSpan)
            
        } else {
            console.log('female')
            nameSpan.setAttribute('name', 'female')
            nameSpan.setAttribute('data-set-gender', 'female')
            wNameSpan.appendChild(nameSpan)
            
        }
        assignNames()
    
}

// dragging functionality
let draggables = document.querySelectorAll('.names')
const containers = document.querySelectorAll('.nameField')

function assignNames() {
    draggables = document.querySelectorAll('.names')
    // console.log('assignment names')

    
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            console.log('draggables for each')
            console.log(draggables)
            draggable.classList.add('dragging')
        })

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging')
        })
    })

    containers.forEach(container => {
        container.addEventListener('dragover', e => {
            console.log('containers for each')
            console.log(draggables)
            e.preventDefault()
            const afterElement = getDragAfterElement(container, e.clientY)
            const draggable = document.querySelector('.dragging')
            if(afterElement == null) {
                container.appendChild(draggable)
            } else {
                container.insertBefore(draggable, afterElement)
            }
        })
    })

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('draggable:not(.dragging)')]

        draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect()
            const offset = y - box.top - box.height / 2 
            console.log(offset)
            if (offset < 0 && offset > closest.offset) {
                return {offset: offset, element: child}
            }   else {
                closest
                }
            }, { offset: Number.NEGATIVE_INFINITY }).element

        }
}
assignNames()


// prints page when filled out
fillButton.addEventListener('click', printPage) 

function printPage() {
    console.log('pressed')
    let printableArea = document.querySelector('#printableArea').innerHTML
    let unPrintableArea = document.body.innerHTML
    
    if (confirm('Are You Sure You Want to Print?') == true) {
     
        // removes everything outside of the printable area prints it then puts the other info back
        document.body.innerHTML = printableArea
        window.print()
        document.body.innerHTML = unPrintableArea
        // location.reload()
    } else {
        // document.body.innerHTML = unPrintableArea
        console.log('ok')
    }
    
}






// draggables.forEach(draggable => {
//     draggable.addEventListener('dragstart', () => {
//         console.log('draggables for each')
//         console.log(draggables)
//         draggable.classList.add('dragging')
//     })

//     draggable.addEventListener('dragend', () => {
//         draggable.classList.remove('dragging')
//     })
// })

// containers.forEach(container => {
//     container.addEventListener('dragover', e => {
//         console.log('containers for each')
//         console.log(draggables)
//         e.preventDefault()
//         const afterElement = getDragAfterElement(container, e.clientY)
//         const draggable = document.querySelector('.dragging')
//         if(afterElement == null) {
//             container.appendChild(draggable)
//         } else {
//             container.insertBefore(draggable, afterElement)
//         }
//     })
// })

// function getDragAfterElement(container, y) {
//     const draggableElements = [...container.querySelectorAll('draggable:not(.dragging)')]

//     draggableElements.reduce((closest, child) => {
//         const box = child.getBoundingClientRect()
//         const offset = y - box.top - box.height / 2 
//         console.log(offset)
//         if (offset < 0 && offset > closest.offset) {
//             return {offset: offset, element: child}
//         }   else {
//             closest
//             }
//         }, { offset: Number.NEGATIVE_INFINITY }).element
// }

// change dates
// let dateOne = document.getElementById('date1')
// dateOne.addEventListener('mouseout', () => {
//     if(document.getElementById('date1').value !== '') {
//         changeDate()
//     }})

// function changeDate() {
//     let oldDateString = dateOne.value    
//     let dateString = oldDateString.substring(8,10)
//     let newDay = parseInt(dateString) + 7
//     let newDateString = ''
//     let finalDate = ''

//     if(newDay <= 9 && newDay >= 0) {
//         newDateString = "0" + newDay
//         finalDate = oldDateString.replace(dateString, newDateString)
//         dateTwo = finalDate
//         document.getElementById('date2').value = finalDate
//     } else {
//         newDateString = newDay.toString()
//         finalDate = oldDateString.replace(dateString, newDateString)
//         document.getElementById('date2').value = finalDate
//     }
// }

