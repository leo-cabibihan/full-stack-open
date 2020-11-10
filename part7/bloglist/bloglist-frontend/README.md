~~## Task 5.5~~

Change the form for creating blog posts so that it is only displayed when appropriate.

By default the form is not visible

![alt text](https://fullstackopen.com/static/de4cfabdf46a837f1f0bfdba4fd27d67/5a190/13ae.png)
It expands when button new note is clicked

![](https://fullstackopen.com/static/0cb27abc7b56ba5ecdd7e9d48d325c87/5a190/13be.png)

The form closes when a new blog is created.

~~## Task 5.6~~

Separate the form for creating a new blog into its own component

~~## Task 5.7~~

Let's add each blog a button, which controls if all of the details about the blog are shown or not.

Full details of the blog open when the button is clicked.

![](https://fullstackopen.com/static/b49e9ca45d0582829eed343baad44910/5a190/13ea.png)

~~## Task 5.8~~

Implement the functionality for the like button

~~## Task 5.9~~

Modify the application to list the blog posts by the number of likes. Sorting the blog posts can be done with the array sort method.

~~## Task 5.10~~

Add a new button for deleting blog posts. Also implement the logic for deleting blog posts in the backend.
![](https://fullstackopen.com/static/87b7180f1f10ce670af1bc21f50233ec/5a190/14ea.png)

~~## Task 5.11~~

Define PropTypes for one of the components of your application.

~~## Task 5.12~~

Add ESlint to the project. Define the configuration according to your liking. Fix all of the linter errors.

~~## Task 5.13~~

Make a test which checks that the component displaying a blog renders the blog's title and author, but does not render its url or number of likes by default

Add CSS-classes to the component to help the testing as necessary.

~~## Task 5.14~~

Make a test which checks that blog's url and number of likes are shown when the button controlling the shown details has been clicked.

~~## Task 5.15~~

Make a test which ensures that if the like button is clicked twice, the event handler the component received as props is called twice.

~~## Task 5.16~~

Make a test for the new blog form. The test should check, that the form calls the event handler it received as props with the right details when a new blog is called.

~~## Task 5.17~~

Configure Cypress to your project. Make a test for checking that the application displays the login form by default.

~~## Task 5.18~~

Make tests for logging in. Test both successful and unsuccessful log in attempts.
Make a new user in the beforeEach block for the tests.

~~## Task 5.19~~

Make a test which checks that a logged in user can create a new blog.

## Task 5.20

Make a test which checks that user can like a blog.

## Task 5.21

Make a test for ensuring that the user who created a blog can delete it.

## Task 5.22

Make a test which checks that the blogs are ordered according to likes with the blog with the most likes being first.

This exercise might be a bit trickier. One solution is to find all of the blogs and then compare them in the callback function of a then command.
