const multiplicationForm = document.querySelector("#multiplication-form");
const numberInput = document.querySelector("#number");
const multiplcationInput = document.querySelector("#multiplicador");
const multiplicationTable = document.querySelector("#multiplication-operations");
const tableTitle = document.querySelector("#table-title");


function updateTableTitle(number, multiplicatorNumber) {
    tableTitle.textContent = `Table of ${number} from 1 to ${multiplicatorNumber}`;
}

function createTable(number, multiplicatorNumber) {
    multiplicationTable.innerHTML = "";

    for (i = 1; i <= multiplicatorNumber; i++) {
        const template = `
        <div class="row">
            <div class="operation">${number} x ${i} = </div>
            <div class="result">${number * i}</div>
        </div>
        `;

        const parser = new DOMParser();

        const htmlTemplate = parser.parseFromString(template, "text/html");

        multiplicationTable.appendChild(htmlTemplate.querySelector(".row"));
    }
}


multiplicationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const multiplicationNumber = +numberInput.value;
    const multiplicatorNumber = +multiplcationInput.value;

    if (!multiplicationNumber || !multiplicatorNumber) {
        return;
    }

    createTable(multiplicationNumber, multiplicatorNumber);
    updateTableTitle(multiplicationNumber, multiplicatorNumber);
})