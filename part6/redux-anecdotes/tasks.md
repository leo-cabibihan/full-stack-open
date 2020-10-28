~~## Task 6.3~~

Implement the functionality for voting anecdotes. The amount of votes must be saved to a Redux-store.

~~## Task 6.4~~

Implement the functionality for adding new anecdotes.

You can keep the form uncontrolled, like we did earlier.

~~## Task 6.5~~

Make sure that the anecdotes are ordered by the number of votes.

~~The tasks in between~~

~~## Task 6.9~~

Start using Redux DevTools. Move defining the Redux-store into its own file store.js.

~~## Task 6.10~~

The application has a ready-made body for the Notification component:

Extend the component so that it renders the message stored in the redux store, making the component to take the form:

You will have to make changes to the application's existing reducer. Create a separate reducer for the new functionality and refactor the application so that it uses a combined reducer as shown in this part of the course material.

~~## Task 6.11~~

Extend the application so that it uses the Notification component to display a message for the duration of five seconds when the user votes for an anecdote or creates a new anecdote:

It's recommended to create separate action creators for setting and removing notifications.

~~## Task 6.12~~

Implement filtering for the anecdotes that are displayed to the user.

~~## Task 6.13~~

When the application launches, fetch the anecdotes from the backend implemented using json-server.

~~## Task 6.14~~

Modify the creation of new anecdotes, such that the anecdotes are stored in the backend.

~~## Task 6.15~~

Modify the initialization of redux-store to happen using asynchronous action creators, which are made possible by the redux-thunk-library.

~~## Task 6.16~~

Also modify the creation of a new anecdote to happen using asynchronous action creators, made possible by the redux-thunk-library.

~~## Task 6.17~~

Voting does not yet save changes to the backend. Fix the situation with the help of the redux-thunk-library.

~~## Task 6.18~~

The creation of notifications is still a bit tedious, since one has to do two actions and use the setTimeout function:

~~## Task 6.19~~

Modify the AnecdoteList component so that it uses the connect function instead of the hooks. You may need to implement your own mapStateToProps and mapDispatchToProps functions.

## Task 6.20

Do the same for the Filter and AnecdoteForm components.

## Task 6.21

You (probably) have one nasty bug in your application. If the user clicks the vote button multiple times in a row, the notification is displayed funnily. For example if a user votes twice in three seconds, the last notification is only displayed for two seconds (assuming the notification is normally shown for 5 seconds). This happens because removing the first notification accidentally removes the second notification.

Fix the bug so that after multiple votes in a row, the notification for the last vote is displayed for five seconds. This can be done by cancelling the removal of the previous notification when a new notification is displayed whenever necessary. The documentation for the setTimeout function might also be useful for this.
