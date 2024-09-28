const defaultChemicalData = [  
    { name: "Ammonium Persulfate", vendor: "LG Chem", density: 3525.92, viscosity: 60.63, packaging: "Bag", packSize: 100, unit: "kg", quantity: 6495.18 },  
    { name: "Caustic Potash", vendor: "Formosa", density: 3172.15, viscosity: 48.22, packaging: "Bag", packSize: 100, unit: "kg", quantity: 8751.90 },  
    { name: "Dimethylaminopropylamino", vendor: "LG Chem", density: 8435.37, viscosity: 12.62, packaging: "Barrel", packSize: 75, unit: "L", quantity: 5964.61 },  
    { name: "Mono Ammonium Phosphate", vendor: "Sinopec", density: 1597.65, viscosity: 76.51, packaging: "Bag", packSize: 105, unit: "kg", quantity: 8183.73 },  
    { name: "Ferric Nitrate", vendor: "DowDuPont", density: 364.04, viscosity: 14.90, packaging: "Bag", packSize: 105, unit: "kg", quantity: 4154.33 },  
    { name: "n-Pentane", vendor: "Sinopec", density: 4535.26, viscosity: 66.76, packaging: "N/A", packSize: "N/A", unit: "t", quantity: 6274.34 },  
    { name: "Glycol Ether PM", vendor: "LG Chem", density: 6495.18, viscosity: 72.12, packaging: "Bag", packSize: 250, unit: "kg", quantity: 8749.54 },  
    { name: "Sodium Bicarbonate", vendor: "Baker Hughes", density: 3.00, viscosity: 10.40, packaging: "Bag", packSize: 50, unit: "kg", quantity: 5000.00 },  
    { name: "Potassium Hydroxide", vendor: "Olin", density: 2139.00, viscosity: 20.50, packaging: "Barrel", packSize: 200, unit: "L", quantity: 1200.00 },  
    { name: "Calcium Carbonate", vendor: "Imerys", density: 2600.00, viscosity: 30.00, packaging: "Bag", packSize: 150, unit: "kg", quantity: 3000.00 },  
    { name: "Acetic Acid", vendor: "BASF", density: 1040.00, viscosity: 30.00, packaging: "Barrel", packSize: 180, unit: "L", quantity: 2500.00 },  
    { name: "Ethanol", vendor: "Cargill", density: 789.00, viscosity: 1.20, packaging: "Drum", packSize: 200, unit: "L", quantity: 4000.00 },  
    { name: "Methanol", vendor: "Methanex", density: 792.00, viscosity: 0.60, packaging: "Tank", packSize: 1000, unit: "L", quantity: 10000.00 },  
    { name: "Hydrochloric Acid", vendor: "Kraft Chemical", density: 1200.00, viscosity: 1.50, packaging: "Drum", packSize: 205, unit: "L", quantity: 1500.00 },  
    { name: "Sulfuric Acid", vendor: "OxyChem", density: 1840.00, viscosity: 20.50, packaging: "Tank", packSize: 1500, unit: "L", quantity: 800.00 },  
];  

 
let chemicalData = JSON.parse(localStorage.getItem('chemicalData')) || defaultChemicalData;  

function loadTableData() {  
    const tableBody = document.getElementById("tableBody");  
    tableBody.innerHTML = "";  
    chemicalData.forEach((chemical, index) => {  
        const row = document.createElement('tr');  
        row.innerHTML = `  
            <td><input type="checkbox" class="row-select" data-index="${index}"></td>  
            <td contenteditable="true">${chemical.name}</td>  
            <td contenteditable="true">${chemical.vendor}</td>  
            <td contenteditable="true">${chemical.density}</td>  
            <td contenteditable="true">${chemical.viscosity}</td>  
            <td contenteditable="true">${chemical.packaging}</td>  
            <td contenteditable="true">${chemical.packSize}</td>  
            <td contenteditable="true">${chemical.unit}</td>  
            <td contenteditable="true">${chemical.quantity}</td>  
            <td>  
                <button onclick="saveRow(${index})">Save</button>  
            </td>  
        `;  
        tableBody.appendChild(row);  
    });  
}  

function addRow() {  
    const newChemical = {  
        name: prompt("Enter Chemical Name:"),  
        vendor: prompt("Enter Vendor:"),  
        density: parseFloat(prompt("Enter Density:")),  
        viscosity: parseFloat(prompt("Enter Viscosity:")),  
        packaging: prompt("Enter Packaging:"),  
        packSize: parseFloat(prompt("Enter Pack Size:")),  
        unit: prompt("Enter Unit:"),  
        quantity: parseFloat(prompt("Enter Quantity:")),  
    };  
    chemicalData.push(newChemical);  
    saveToLocalStorage();  
    loadTableData();  
}  

function saveRow(index) {  
    const row = document.getElementById("tableBody").children[index];  
    chemicalData[index] = {  
        name: row.children[1].innerText,  
        vendor: row.children[2].innerText,  
        density: parseFloat(row.children[3].innerText),  
        viscosity: parseFloat(row.children[4].innerText),  
        packaging: row.children[5].innerText,  
        packSize: parseFloat(row.children[6].innerText),  
        unit: row.children[7].innerText,  
        quantity: parseFloat(row.children[8].innerText),  
    };  
    saveToLocalStorage();  
    alert("Changes saved!");  
}  

function deleteSelected() {  
    const checkboxes = document.querySelectorAll('.row-select:checked');  
    checkboxes.forEach(checkbox => {  
        const index = checkbox.getAttribute('data-index');  
        chemicalData.splice(index, 1);  
    });  
    saveToLocalStorage();  
    loadTableData();  
}  

function exportData() {  
    alert("File is saved!!!");  
}  

function saveToLocalStorage() {  
    localStorage.setItem('chemicalData', JSON.stringify(chemicalData));  
}  

function sortData(order) {  
    if (order === 'oldToNew') {  
        chemicalData.sort((a, b) => b.quantity - a.quantity);  
    } else if (order === 'newToOld') {  
        chemicalData.sort((a, b) => a.quantity - b.quantity);  
    }  
    saveToLocalStorage();
    loadTableData();
}  

window.onload = loadTableData;  