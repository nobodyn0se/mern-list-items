# MERN List Items
This mini project demonstrates simple CRUD operations on list items through a user-facing webpage created with React and backend server built with NodeJS.

You can create a new user account, the credentials of which will be stored in MongoDB. Passwords are hashed before storage. Once done, you can log in to your account to start adding, updating or deleting list items. 

All API routes are protected by tokens, hence, third-party actors cannot access or modify the data without gaining access to secure tokens. A token is generated for every new registration or login and sent to the request through the headers' [authorization] field.

As of now, the tokens are not persistent on local storage, hence the token will expire upon refreshing the page.

The backend server is deployed on GCP at this URL: https://mern-list-items.el.r.appspot.com/v1
The frontend is deployed on Netlify at this URL : https://mern-list-items.netlify.app/


## How to install it?

Open the terminal of your favorite IDE and run:
`git clone https://github.com/nobodyn0se/mern-list-items.git`

There are two ways you can test this app. One on your local machine (local testing) or the deployment.


### Local testing
For local testing, start the backend server:
Ensure that your present working directory points to mern-list-items. Verify that using `pwd` for Linux/Mac or `cd` for Windows. Now run:

```
cd backend
npm i
npm run dev
```

This will start the server in development mode. You will see a console message stating the port number : 6000

The URL for local testing will be http://localhost:6000/v1
You can replace the URL within the code wherever applicable.

Please note: The local testing env still connects to the hosted MongoDB. Hence, any changes you make to the list items will still reflect on the production app.

Now start the frontend local instance using the following commands:
```
cd ..
cd frontend
npm i
npm start
```

This should start the frontend server on port : 3000
The frontend URL will be http://localhost:3000

### Production testing
For production testing, navigate to : https://mern-list-items.netlify.app/
You can verify auth protection by sending requests to the endpoints without tokens and see Auth Denied messages.

## How to use the UI?
The login page is the first page that opens. You can log in to your account or create a new one using the Sign Up link at the bottom.

For testing you can use a pre-registered user with the following credentials:
```
username: testuser1
password: test123
```

Once logged in, the top will display the total number of list items currently in DB.

Each list item will be shown in a card, that contains an edit icon, delete icon, list item title and description (optional).

On the right hand bottom of the page is a floating action button to add a new list item. Clicking on add, update or delete buttons will open a modal that takes relevant inputs from the user. Once those changes are saved, the list view will refresh to update the new values.

To log out, simply refresh the page.


## Planned future updates
- Persistent login through a session (with custom expiry) with an explicit logout button
- Interactive snackbar messages to denote success or error feedback
- Pagination for the list item view
- Abstraction layer between the network calls and presentation layer
- Reactive form validations on the frontend
- Optimization of backend responses to minimize network calls after every action
- Refactoring of codebase using more robust state management solutions
- Migrate frontend view to Vite or NextJS, network calls from REST to GraphQL
- Add a shimmer effect or container for loading
