# PWA

## Description
This is a Progressive Web App clone of the [Anonynote](https://anonynote.org/) website. The app allows users to create notes that are stored in the browser's storage. The notes can be added and marked.

## Execution

In the case of wanting to run the program locally, the following steps must be followed:

1. Clone the repository
2. Open the terminal and navigate to the project folder
3. Install the dependencies with `bun install`
4. Run the program with `bun run build` and then `bun run preview`

### Online
You can access the app online [echopad.netlify.app/](echopad.netlify.app/), where you can use the app without having to install it. If you want it, you can add it to your home screen.

### Local Development
#### Dependencies

- Install bun


## How to use

To use the app, you must first create a Notapad by writing a title and clicking on the "Create Notepad" button. Then you can add notes by writing the content of a note and clicking on the "Add Note" button. You can mark the notes as done by clicking on the checkbox.

For the app to work, you must allow the app to receive notifications, as it uses Firebase Cloud Messaging to send notifications to the user.

## Notifications
The app uses Firebase Cloud Messaging to send notifications to the user. If you want to try the notifications, you can run the app locally see the token in the console and send a notification using the token. Using the following command:

```bash
api_key=YOUR_SERVER_KEY

curl --header "Authorization: key=$api_key" \
     --header "Content-Type: application/json" \
     https://fcm.googleapis.com/fcm/send \
     -d '{
          "registration_ids": ["token_here"],
          "notification": {
            "title": "This is a title!",
            "body": "This is a body!"
          }
        }'
```


## Contributors

- [Bastian Marinkovic](https://github.com/BMarink512/)
- [Ignacio Porte](https://github.com/IgnacioPorte)
- [Maximiliano Torres](https://github.com/Maxi1805)
