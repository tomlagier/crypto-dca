# crypto-dca
Server that executes balanced DCA against a portfolio of cryptocurrency

## Overview
Distributed as a docker-compose file pulling down an app, a cron job runner, and a DB. The app will host the web front-end and handle setting and retrieving settings, as well as enabling or disabling the cron job scheduler. The scheduler will execute the job on-time and needs to be extremely crash resistant. The database needs to be able to store sensitive credentials securely.

## Chron job
The chron job, once enabled, executes automatic trades based on a variety of criteria, on a set interval.

### Requirements
1. Scheduled once per interval
2. If the cron job server crashes, when it is restarted it should check the interval and calculate the remaining time from the current time. If more than a single interval has passed, it should immediately execute and then schedule the next execution for the difference between the current time and the intended next interval time.

### Tech stack
1. Node script using setTimeout for scheduling
2. PM2 to keep it alive in container
3. Alpine docker image as base
4. ??? for tests
5. Bittrex node SDK for API requests
6. Sequelize for ORM
7. Configured by environment variables in the .env-chron file

### Procedure
1. Query Bittrex for the current amount and price of each coin held on Bittrex (/getbalances)
3. Query market cap data (coinmarketcap) for all interested coins
2. For each coin:
    1. Query Bittrex for the current transaction fee, minimum order amount for USDT-coin pair (/getcurrencies)
    2. If 1 - (amount - tx fees) / amount <= fee tolerance, withdraw that coin to local address (/withdraw)
    3. Log withdrawal to transaction log
    4. Calculate investment amount for each coin (automatic: interval spend * coin market cap / sum all market caps, manual: interval spend * manual % allocation)
    5. Increment each coin's current spend amount
    6. Check if the coin has an outstanding order. If it does, cancel it
    7. Check if the coin buy is valid
        1. > than minimum transaction +/- some fuzzing
        2. some sanity check (what?) about ask price
        3. enough USDT in Bittrex to support it
    8. If valid, execute order with coins full spend amount (/buylimit)
    9. Poll until order has resolved (/getopenorders)
    10. Log buy to transaction log, set coin spend amount to 0

## Database
The database is a bog-standard pgsql database, pulled in from the common docker image.

### Tech stack
1. Postgres DB
2. Just use standard pgsql image
3. HMAC for storing API credentials?
4. Configured by .env-db file

### Stored data
1. Bittrex API credentials
2. Local wallet address
3. Remote wallet address
5. Transaction log
6. Requested interval and execution time
7. Interval spend
8. Current locally held coins
9. Current coin spend amounts
10. Fee tolerance for each coin
11. Portfolio distribution
12. Whether to manually or automatically distribute portfolio

*TODO: Draw up schema*

## App/Frontend
The app contains a webserver for hosting the frontend, a little business logic for updating the DB with settings, and the migrations for the DB.

### Tech stack
1. Express server for serving frontend/assets
2. Standard WebPack/TypeScript/React/Redux/SCSS stack for building frontend
3. Sequelize for ORM/migrations
4. Alpine docker image as base
5. ChartJS or D3 for pretty graphs
6. Configured by .env-app file

### Capabilities
1. Add Bittrex credentials
2. View current local (logged - not actually inspecting blockchain) and remote holdings
3. Set, update, and enable interval
4. View transaction log
5. Add local wallet address and fee tolerance
6. Set and update portfolio distribution preference and actual distribution if manual
7. Pretty graphs about portfolio performance?

### To-do
* Make omnicored RPC server more secure
    * Cert based auth
    * No open allowed IPs
* Publish omnicored docker images
* Create client actions as a part of the API
    * Create wallet
    * Check wallet balance
    * Send local Tether to Bittrex
* Figure out better test running situation
* Fatten up my models
* Finish model tests
* Transaction search
* Badly need to implement https://github.com/mickhansen/dataloader-sequelize

### User stories

As a user, I want to...
* be able to create an account
* be able to log in
* be able to add some coins to invest in
    * set a fee tolerance
    * set a percentage of the portfolio
    * associate a local and remote wallet to the coin
    * enable or disable a coin
    * change wallets
* set my purchase amount
* set my purchase interval
* start or stop the purchases
* see my portfolio
    * the amount of each coin on the exchange
    * the amount of each coin that has been transferred locally
    * the amount on each coin waiting to be spent
* see all transactions that have happened
