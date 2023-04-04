Propine : 
Propine's command-line tool helps generate portfolios from historical data stored in CSV format. When reading large files, the standard node process may encounter heap out of memory issues. Therefore, memory management must be handled carefully. Instead of reading the entire file and keeping it in a variable, Propine captures and processes data based on the requirements.

Depending on the configuration, the program processes each line and calculates token balances based on the nature of the transaction. In other words, keeps track of the total deposits and withdrawals based on the given timeline. Once the balances are captured, the program applies calculations to determine the current available balance, converts it into USD, and displays it on the console.

To ensure maintainability, Propine relies on a third-party dependency, Rate Orbital/API, to format the data and maintain consistency. Additionally, to support multiple tokens, a configuration file maintains a list of tokens and ensures token integrity.

# Creating Command Line Interface Environment.

1. Pull the GitHub Repo and Ensure the Node Vesion <16.0.

2. Run command `npm install -g`

3. Run command `npm install`

3. Tool usage config.js to configure default tokens to read, if CSV has a new token, simply add the token in config supportedTokens.

4. Add the CSV file in the home Directory of this project with name `logs.csv` or Choose the CSV data source file , use command : `propine --file <FullQualifiedFileName>`

5. In case of different CryptoToFiat Rate Api, Api can be updated which will pass the data conversionRate for type handling.

# CLI Tool Usage

1. To check the Latest Portfolio in USD, use command - `propine`

2. To check the Latest Portofolio of a particular token, use command : `propine --token <TokenName>`
e.g. : propine --token XRP

3. To check the Latest Portofolio of a particular tokens, use command : `propine --token <TokenName> <TokenName>` 
e.g. : propine --token XRP ETH

4. To check the portfolio of a particular date, use command : `propine --date <YYYY-mm-dd>` 
e.g. : propine --date 2019-02-01 

5. To check the portfolio of a particular token along with particular date, use command : `propine --date <YYYY-mm-dd> --token <TokenName>`
e.g. : propine --date 2019-02-01 --token XRP

6. To update the configuration file location, use command : `propine --config <FullQualifiedFileName>`


7. Choose the Different CSV data source file , use command : `propine --file <FullQualifiedFileName>`