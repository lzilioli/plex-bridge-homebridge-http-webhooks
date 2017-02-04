# plex-bridge-homebridge-http-webhooks

In order to run this app:

You should be using `homebridge` and `homebridge-http-webhooks`

```bash
npm install -g homebridge homebridge-http-webhooks
```
 
- Install [node.js](https://nodejs.org/en/).
- Clone the repository.
- Install dependencies using `npm install`.

```
http -b https://winkapi.quirky.com/users/me/wink_devices "Authorization:Bearer your-bearer-token"
```

- Find the player identifier for the player you want to connect it with.
- Run like this:
 
 ```
 BEARER=bearer-token BULB=bulb-id PLAYER=player-identifier node index.js
 ```
 
- Add the webhook to https://app.plex.tv/web/app#!/account/webhooks
