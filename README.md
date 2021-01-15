# Rest-n-React
Vacation rental booking application.

This repo is the reservation component. 
It consists of: 
* dynamic calendar to choose check-in/check-out dates
* update guest count by adults/children/infants
* selected booking costs and fees

## Related components

  - https://github.com/hrsf131-3-group/image-carousel-service.git
  - https://github.com/hrsf131-3-group/reservations-service.git (this repo)
  - https://github.com/hrsf131-3-group/reviews-service.git
  - https://github.com/hrsf131-3-group/more-places-service.git

## Table of Contents

1. [Requirements](#requirements)
1. [Usage](#Usage)
1. [Development](#development)
1. [Testing](#testing)

## Requirements

An `nvmrc` file is included if using [nvm]

- Node 6.13.0

## Usage

From the root directory:
```
'npm install' to install dependencies
'npm start' to start server which listens to port 3002
```

## Development

From within the root directory:
```
'npm dev-react' to start webpack
'npm run clean-database' to clear all data from database
'npm run seed-database' to populate 100 listings
```

## Testing

From within the root directory:
```
'npm run test' to run Jest testing suite
```
