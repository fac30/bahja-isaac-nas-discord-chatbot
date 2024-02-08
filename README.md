# bahja-isaac-nas-discord-chatbot
Discord and OpenAI chatbot

--- 
## Notes for secure config #2 handover

In the browser go to discord.com/developers/applications
Click top right "new applications" and create an application (give it a name of your choice)

On the left hand menu click on "Bot" and click reset token, save the token somewhere - also in your .env file save it under "TOKEN" i.e TOKEN = "abc123"
Still on the same screen toggle off "Public Bot" and toggle on all 3 in the "Privileged Gateway Intents"

Then on the left hand menu click "0Auth2" => "URL Generator", in scopes select "Bot" and "applications.commands" and in "Bot Permissions" select "send messages"
At the bottom click "generate URL" and save somewhere.

Go to Discord and create a server and then paste the generated URL from above in the text field and send, then click the link you have sent and follow the steps to install the chatbot on the server.
