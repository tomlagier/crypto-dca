# crypto-dca
Server that executes balanced DCA against a portfolio of cryptocurrency

##
Distributed as a docker-compose file pulling down an app, a cron job runner, and a DB. The app will host the web front-end and handle setting and retrieving settings, as well as enabling or disabling the cron job scheduler. The scheduler will execute the job on-time and needs to be extremely crash resistant. The database needs to be able to store sensitive credentials securely. The DB should never be exposed to the host network.

The front-end needs to collect the following information and store it in a secure manner:

1. API credentials to Bittrex
2. Wallet address for local storage of cryptocurrency

Requirements for chron job:
1. Scheduled once per execution cycle
2. If the cron job server crashes, when it is restarted it should check the interval and calculate the remaining time from the current time. If more than a single interval has passed, it should immediately execute and then schedule the next execution for the difference between the current time and the intended next interval time.

Procedure:
1. Query Bittrex for the current amount and price of each coin held on Bittrex (/getbalances)
3. Query market cap data (coinmarketcap) for all interested coins
2. For each coin:
    1. Query Bittrex for the current transaction fee, minimum order amount (/getcurrencies)
    2. If 1 - (amount - tx fees) / amount <= withdraw fee tolerance, withdraw that coin to local address (/withdraw)
    3. Log withdrawal to transaction log
    4. Calculate investment amount for each coin (automatic: interval spend * coin market cap / sum all market caps, manual: interval spend * manual % allocation)
    5. Increment each coin's current spend amount
    6. Check if the coin has an outstanding order. If it does, cancel it
    7. Check if the coin buy is valid (> than minimum transaction +/- some fuzzing and some sanity check (what?) about ask price)
    8. If valid, execute order with coins full spend amount (/buylimit)
    9. Poll until order has resolved (/getopenorders)
    10. Log buy to transaction log, set coin spend amount to 0

Database:
1. Bittrex API credentials
2. Local wallet address
3. Remote wallet address
5. Transaction log
6. Requested interval and execution time
7. Current locally held coins
8. Current remotely held coins
9. Current coin spend amounts
10. Fee tolerance for each coin
11. Portfolio distribution
12. Whether to manually or automatically distribute portfolio

Frontend:
1. Add all credentials
2. View current local and remote holdings
3. Set, update, and enable interval
4. View transaction log
5. Set and update portfolio distribution preference, actual distribution, and fee tolerance
6. Pretty graphs about portfolio performance?