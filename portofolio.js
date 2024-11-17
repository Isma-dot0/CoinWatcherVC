const portfolio = [
    { name: 'Bitcoin', holdings: 0.5, value: 25000 },
    { name: 'Ethereum', holdings: 2, value: 8000 }
];

function displayPortfolio() {
    const tbody = document.querySelector('#portfolio-table tbody');
    tbody.innerHTML = '';
    portfolio.forEach(coin => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${coin.name}</td>
            <td>${coin.holdings}</td>
            <td>$${coin.value}</td>
        `;
        tbody.appendChild(row);
    });
    populateTaxDropdown();
}

function populateTaxDropdown() {
    const dropdown = document.getElementById('crypto-select');
    dropdown.innerHTML = '<option value="total">Total Portfolio</option>';
    portfolio.forEach(coin => {
        const option = document.createElement('option');
        option.value = coin.name;
        option.textContent = coin.name;
        dropdown.appendChild(option);
    });
}

document.getElementById('estimate-tax').addEventListener('click', () => {
    const selected = document.getElementById('crypto-select').value;
    const resultsDiv = document.getElementById('tax-results');
    if (selected === 'total') {
        const totalValue = portfolio.reduce((acc, coin) => acc + coin.value, 0);
        resultsDiv.textContent = `Estimated Tax on Total Portfolio: $${(totalValue * 0.15).toFixed(2)}`;
    } else {
        const coin = portfolio.find(c => c.name === selected);
        if (coin) {
            resultsDiv.textContent = `Estimated Tax on ${coin.name}: $${(coin.value * 0.15).toFixed(2)}`;
        }
    }
});

displayPortfolio();