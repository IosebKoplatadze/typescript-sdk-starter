# typescript-sdk-starter

## NOTES

- starter for write a SDK, like the [facebook SDK](https://developers.facebook.com/docs/javascript/).
- result will be one .js file and which bootstrap itself after call init() method.

## Development

1. To build you need to run `npm run build`
2. SDK will be placed in `dist`
3. To start project run `npm run start`

### How to bundle SDK and test it with website

- `npm run build`
- take something.sdk.js file from `/dist` folder
- add this two line in html of your site
  > `<div id="sdk-something"></div>`
  > `<script src="./something.sdk.js"></script>`
- SDK will be initialized in `<div id="sdk-something"></div>` after call javascript function `PaymentsSDK.init()` from enywhere
