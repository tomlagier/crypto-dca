# Schema

## Models

### User
* ID
* Name
* Password

### Wallet
* ID
* User ID
* Address

### Option
* ID
* User ID
* Option Name
* Option Value

Options:
* Manual or automatically distribute potfolio
* Interval spend value
* Interval time
* Transaction time

### Transaction
* ID
* User ID
* Date
* Currency pair
* Amount
* Destination
* Success

### Coin
* ID
* User ID
* Fee tolerance
* Active
* Percentage of portfolio
* Amount held locally
* Amount held on exchange
* Amount saved towards next purchase
