# plex-bridge-homebridge-http-webhooks

In order to run this app:

- Install [node.js](https://nodejs.org/en/).
- Clone the repository.
- Install dependencies using `npm install`.
- [Add the webhook](https://app.plex.tv/web/app#!/account/webhooks) `http://localhost:51828/` to [your plex server](https://app.plex.tv/web/app#!/account/webhooks)
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

1. Run the app `DEBUG=plex* ACCESSORY=plexContact URL=http://localhost:51828/ node index.js`
2. Play a video on the device you want to trigger the webhook
3. You will see the event logged to the console when the webhook is hit. Copy the `uuid` for the player
4. Replace `<PLAYER_UUID>` with the copied player `uuid` in the command in the Run section.p

# Run

Now run the script with the `PLAYER` argument:

```bash
PLAYER=<PLAYER_UUID> ACCESSORY=plexContact URL=http://localhost:51828/ node index.js
```

Thanks to [plexinc/webhooks-home-automation](https://github.com/plexinc/webhooks-home-automation).
