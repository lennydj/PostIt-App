# PostIt App

PostIt is a simple application that allows friends and colleagues create groups for notifications. This way one person can post notifications to everyone by sending a message once. The application allows people create accounts, create groups and add registered users to the groups, and then send messages out to these groups whenever they want.


## Requirements

Clone or Download the project.
Open the command line and cd into the folder.
Install dependencies npm install.
You can install nodemon and run the nodemon command to run it or just type in node server.js.
Run test npm test.

## Usage
Signup with the route 'api/user/signup' .
You can use the following routes:

POST that signin a user
'/api/user/signin'

POST that creates a new group.
'/api/group'

POST that allows allow users add other users to groups
'/api/group/<group id>/user'

POST route that allows a logged in user post messages to created groups
/api/group/<group id>/message

GET route that allows a logged in user retrieve messages that have been posted to groups he/she belongs to
GET: /api/group/<group id>/messages

GET retrieves specific role.
POST creates the role with new details