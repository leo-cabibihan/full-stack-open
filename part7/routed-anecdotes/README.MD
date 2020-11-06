~~## Task 7.1~~

Add React Router to the application so that by clicking links in the Menu-component the view can be changed.

At the root of the application, meaning the path /, show the list of anecdotes:

The Footer-component should always be visible at the bottom.

The creation of a new anecdote should happen e.g. in the path create:

~~## Task 7.2~~

Implement a view for showing a single anecdote:

~~## Task 7.3~~

The default functionality of the creation form is quite confusing, because nothing seems to be happening after creating a new anecdote using the form.

Improve the functionality such that after creating a new anecdote the application transitions automatically to showing the view for all anecdotes and the user is shown a notification informing them of this successful creation for the next 10 seconds:

## Task 7.4

Simplify the anecdote creation form of your application with the useField custom hook we defined earlier. One natural place to save the custom hooks of your application is in the /src/hooks/index.js file. If you use the named export instead of the default export:

~~ ## Task 7.5 ~~

Add a button to the form that you can use to clear all the input fields:

Expand the functionality of the useField hook so that it offers a new reset operation for clearing the field.

## Task 7.6

If you see the warning in the console, make the necessary changes to get rid of it
