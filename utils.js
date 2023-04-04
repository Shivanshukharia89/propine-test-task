require('dotenv').config();
const fs = require('fs')
const axios = require('axios');
const readline = require('readline');


const tokenAccounts = {};

const conversionRate = (_currency, _rate) => ({ currency: _currency, rate: _rate });

const accountingTokensXLS = async (tokenTypes, date, logFile) => {

    const readStream = fs.createReadStream(logFile, 'utf-8');

    await new Promise((resolve, reject) => {
        let rl = readline.createInterface({ input: readStream })
        rl.on('line', (line) => {
            const [timestamp, transactionType, tokenType, amount] = line.split(',');

            if (date && timestamp > date)
                return

            if (!tokenTypes.includes(tokenType))
                return
            if (tokenAccounts[tokenType]) {
                if (tokenAccounts[tokenType][transactionType]) {
                    tokenAccounts[tokenType][transactionType] += Number(amount);
                }
                else {
                    tokenAccounts[tokenType][transactionType] = Number(amount);
                }
            }
            else {
                tokenAccounts[tokenType] = { [transactionType]: Number(amount) };
            }
        });
        rl.on('error', (error) => { reject(error) });
        rl.on('close', () => {
            resolve();
        })
    })
    return tokenAccounts;
}

const currentUsdPrice = async (rateEndpoint, tokenType) => {
    try {
        const options = {
            method: 'GET',
            url: rateEndpoint.replace('${tokenType}', tokenType),
            headers: {
                accept: 'application/json',
                Authorization: process.env.CRYPTO_CONVERSION_API_TOKEN
            }
        };

        const response = await axios.request(options)
        if (response instanceof Error) {
            return response
        } else {
            return conversionRate('USD', response.data.USD)
        }
    } catch (error) {
        throw error;
    }
}

const getTotalAmount = async (tokenTypes, date, logFile, rateEndpoint) => {
    
    const balances = {};

    const tokenData = await accountingTokensXLS(tokenTypes, date, logFile);
    for (const token of tokenTypes) {
        if (tokenData[token]) {
            balances[token] = ((tokenData[token]['DEPOSIT'] - tokenData[token]['WITHDRAWAL']) * (await currentUsdPrice(rateEndpoint, token)).rate).toLocaleString("en-US", { style: "currency", currency: "USD" });
        }
        else {
            balances[token] = 0;
        }
    }
    return balances;
};

module.exports = {getTotalAmount,currentUsdPrice,accountingTokensXLS,conversionRate}