# plex-bridge-homebridge-http-webhooks

# ARCHIVED

This repo's intended purpose has been met by [homebridge-plex-sensors](https://www.npmjs.com/package/homebridge-plex-sensors).
I recommend it in place of this package. The code here is still a decent starting point if you want to map a plex
webhook to some other form of web request, but it is not super useful in its current state.

#  Getting Started

In order to run this app:

- Install [node.js](https://nodejs.org/en/).
- Clone the repository.
- Install dependencies using `npm install`.
- [Add the webhook](https://app.plex.tv/web/app#!/account/webhooks) `http://localhost:12000/` to [your plex server](https://app.plex.tv/web/app#!/account/webhooks) (the port is configurable)
- You should be using [`homebridge`](https://github.com/nfarina/homebridge) and [`homebridge-http-webhooks`](https://github.com/benzman81/homebridge-http-webhooks) `npm install -g homebridge homebridge-http-webhooks`

# Configs

In `~/.homebridge/config.json`:

```json
"platforms": [
    {
      "platform": "HttpWebHooks",
      "webhook_port": "51828",
      "sensors": [
        {
          "id": "plexContact",
          "name": "Plex Webhook Contact Sensor",
          "type": "contact"
        }
      ]
    }
  ]
```

## First run

This script filters for a specific player before hitting the homebridge webhook. To determine the player:

1. Run the app
```bash
DEBUG=plex*\
ACCESSORY=plexContact\
PLEX_WEBHOOK_PORT=12000\
HB_WEBHOOK_URL=http://localhost:51828/\
node index.js
```
2. Play a video on the device you want to trigger the webhook
3. You will see the event logged to the console when the webhook is hit. Copy the `uuid` for the player
4. Replace `<PLAYER_UUID>` with the copied player `uuid` in the command in the Run section.p

# Run

Now run the script with the `PLAYER` argument:

```bash
DEBUG=plex*\
ACCESSORY=plexContact\
PLEX_WEBHOOK_PORT=12000\
HB_WEBHOOK_URL=http://localhost:51828/\
PLAYER=<PLAYER_UUID>\
node index.js
```

From now on, when you toggle the plex play state from the `PLAYER`, you should see the contact sensor state update in the iOS 10 Home app. Using the Home app, you can create Automation rules based on these changes.

Thanks to [plexinc/webhooks-home-automation](https://github.com/plexinc/webhooks-home-automation).
