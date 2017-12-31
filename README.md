# crypto-dca

Server that executes balanced DCA against a portfolio of cryptocurrency

**This is not ready for use** - it is in early development. If you want to see the state of the world, you can run `docker-compose up -d --build` and visit `localhost:8087`. Run `docker-compose -f docker-compose-dev.yml -d` for development environment.

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
2. Query market cap data (coinmarketcap) for all interested coins
3. For each coin:
   1. Query Bittrex for the current transaction fee, minimum order amount for USDT-coin pair (/getcurrencies)
   2. If 1 - (amount - tx fees) / amount <= fee tolerance, withdraw that coin to local address (/withdraw)
   3. Log withdrawal to transaction log
   4. Calculate investment amount for each coin (automatic: interval spend _ coin market cap / sum all market caps, manual: interval spend _ manual % allocation)
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
4. Transaction log
5. Requested interval and execution time
6. Interval spend
7. Current locally held coins
8. Current coin spend amounts
9. Fee tolerance for each coin
10. Portfolio distribution
11. Whether to manually or automatically distribute portfolio

[Schema](./schema.md)

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

* Transaction search
* Need to think about authorization - can only query your own data? Maybe create some roles?
* Need to make tests more efficient - move unit/IT to their own block and do seeding/teardown separately so we're not running into all these weird DB states
* Migrate header to App Bar component
* Migrate current structure to layout
* Add PortfolioDashboard container
* Add Settings container

### Authentication

* Handled through passport.js
* Just using Local strategy for now
* User context passed to resolvers
* Message handling TBD

### Authorization

* All objects should have UserID attached
* Prevent read/write unless userID matches
* Can be done in a resolver wrapper

### User stories

As a user, I want to...

* [x] be able to create an account
* [x] be able to log in
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
