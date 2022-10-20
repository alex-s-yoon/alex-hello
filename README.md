# Microservice Template

[![CircleCI](https://circleci.com/gh/N4L/n4l-microservice-template.svg?style=svg&circle-token=bdfd9bfb5f0d7e8bb9d9666da725535366e9e055)](https://circleci.com/gh/N4L/n4l-microservice-template)
[![Maintainability](https://api.codeclimate.com/v1/badges/e07493a387b017084072/maintainability)](https://codeclimate.com/repos/5d97b696a91eb42cb800e96b/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e07493a387b017084072/test_coverage)](https://codeclimate.com/repos/5d97b696a91eb42cb800e96b/test_coverage)

This provides a simple template of a microservice.

You will need to do a search and replace for 'n4l-microservice-template' until we add a script to initialize this automatically.

You will need to generate a local development port for the service by using the `ports.js` in the [end-to-end-tests](https://github.com/N4L/end-to-end-tests/blob/develop/ports.js) repo.
+ Add the name of the service into the `names` array of `ports.js`
+ Run the script
+ Rename the service if port collision found (low possibility)
+ Add the generated port into `src/config/local.json`

## API Docs

These can be accessed at /api-docs