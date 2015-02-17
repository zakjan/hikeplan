# HikePlan

[![CircleCI](https://img.shields.io/circleci/project/zakjan/hikeplan.svg)](https://circleci.com/gh/zakjan/hikeplan)

Hiking route planner. Server & client JS web application.

## Dependencies

```
npm install
cd client && npm install
```

## Development

```
npm run dist && npm start
cd client && npm run dist -- -w   # watch
```

## Production

```
npm run dist && npm start
cd client && npm run dist -- -p   # production
```

## Deployment

* CircleCI: [circle.yml](circle.yml)
* Heroku: [Procfile](Procfile)
