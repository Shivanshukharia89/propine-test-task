const supportedTokens = ['XRP', 'ETH', 'BTC'];
const logFile = 'logs.csv';
const rateEndpoint = 'https://min-api.cryptocompare.com/data/price?fsym=${tokenType}&tsyms=USD'

module.exports = { supportedTokens, logFile, rateEndpoint };
