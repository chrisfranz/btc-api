const express = require('express');
const fetch = require('node-fetch')
const PORT = 8000;
const app = express();

app.get('/', async (req, res, next) => {
    const { success, response } = await getPrice({ crypto: 'BTC', fiat: 'USD'});
    if (!success) return res.status(400).send();
    return res.send(`The current price of Bitcoin is ${response}`)
})

async function getPrice({ crypto, fiat }) {
    const url = `https://api.coinbase.com/v2/prices/${crypto}-${fiat}/spot`;
    const response = await fetch(url);
    console.log(typeof response.status)
    if (response.status !== 200) {
        return { success: false }
    }
    const { data } = await response.json();
    return { success: true, response: data.amount };
}

app.listen(PORT, () => console.log(`App listening on Port: ${PORT}`))
