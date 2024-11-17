const apiURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1';

async function fetchCryptoPrices() {
    const response = await fetch(apiURL);
    const data = await response.json();
    const tbody = document.querySelector('#price-table tbody');
    tbody.innerHTML = '';
    data.forEach(coin => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${coin.name}</td>
            <td>${coin.symbol.toUpperCase()}</td>
            <td>$${coin.current_price.toFixed(2)}</td>
            <td>${coin.price_change_percentage_24h.toFixed(2)}%</td>
            <td>$${coin.market_cap.toLocaleString()}</td>
            <td><button onclick="setAlert('${coin.name}')">Set Alert</button></td>
        `;
        tbody.appendChild(row);
    });
}

function setAlert(crypto) {
    const alertList = document.getElementById('alert-list');
    const alertItem = document.createElement('li');
    alertItem.textContent = `Alert set for ${crypto}`;
    alertList.appendChild(alertItem);
}

fetchCryptoPrices();