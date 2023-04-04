const { expect } = require('chai');
const {getTotalAmount,currentUsdPrice,accountingTokensXLS,conversionRate} = require('./utils');

describe('conversionRate', () => {
    it('should return an object with currency and rate properties', () => {
        const result = conversionRate('USD', 1.5);
        expect(result).to.have.property('currency').that.is.a('string');
        expect(result).to.have.property('rate').that.is.a('number');
    });
});

describe('accountingTokensXLS', () => {
    it('should return an object with token types as keys and transaction types as values', async () => {
        const tokenTypes = ['BTC', 'ETH'];
        const date = '';
        const logFile = './test.csv';
        const result = await accountingTokensXLS(tokenTypes, date, logFile);
        expect(result).to.have.property('ETH');
        expect(result).to.have.property('BTC');
        expect(result.BTC).to.have.property('DEPOSIT').that.is.a('number')
        expect(result.BTC).to.have.property('WITHDRAWAL').that.is.a('number')
        expect(result.ETH).to.have.property('DEPOSIT').that.is.a('number')
        expect(result.ETH).to.have.property('WITHDRAWAL').that.is.a('number')
       
    });
});

describe('currentUsdPrice', () => {
    it('should return an object with currency and rate properties', async () => {
        const rateEndpoint = 'https://min-api.cryptocompare.com/data/price?fsym=${tokenType}&tsyms=USD';
        const tokenType = 'BTC';
        const result = await currentUsdPrice(rateEndpoint, tokenType);
        expect(result).to.have.property('currency');
        expect(result.currency).to.be.a('string').and.not.equal('');
        expect(result).to.have.property('rate');
        expect(result.rate).that.is.a('number').and.not.equal(0);
    });
});

describe('getTotalAmount', () => {
    it('should return an object with token types as keys and total amount in USD as values', async () => {
        const tokenTypes = ['BTC', 'ETH'];
        const date = '';
        const logFile = './test.csv';
        const rateEndpoint = 'https://min-api.cryptocompare.com/data/price?fsym=${tokenType}&tsyms=USD';
        const result = await getTotalAmount(tokenTypes, date, logFile, rateEndpoint);
        expect(result).to.have.property('ETH');
        expect(result.ETH).to.be.a('string').and.not.equal('');
        expect(result).to.have.property('BTC');
        expect(result.BTC).that.is.a('string').and.not.equal('');
       
        
    });
});