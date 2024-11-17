//bitcoin line chart
const ctx = document.getElementById('bitcoin-chart').getContext('2d');
fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7')
    .then(response => response.json())
    .then(data => {
        const labels = data.prices.map(price => new Date(price[0]).toLocaleDateString());
        const prices = data.prices.map(price => price[1]);

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Price (USD)',
                    data: prices,
                    borderColor: '#1e88e5',
                    backgroundColor: 'rgba(30, 136, 229, 0.2)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: { title: { display: true, text: 'Date' } },
                    y: { title: { display: true, text: 'Price (USD)' } }
                }
            }
        });
    });

// Crypto News Ticker
fetch('https://cryptonews-api.com/api/v1?tickers=BTC,ETH&items=5&token=YOUR_API_KEY')
    .then(response => response.json())
    .then(data => {
        const newsList = document.getElementById('news-list');
        data.data.forEach(news => {
            const newsItem = document.createElement('li');
            newsItem.textContent = news.title;
            newsList.appendChild(newsItem);
        });
    });