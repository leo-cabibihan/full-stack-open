## ~~Task 7.9~~

Refactor the application from using internal React component state to using Redux for the application's state management.

Change the application's notifications to use Redux at this point of the exercise set.

## ~~Task 7.10~~

Store the information about blog posts in the Redux store. In this exercise it is enough that you can see the blogs in backend and create a new blog.

You are free to manage the state for logging in and creating new blog posts by using the internal state of React components.

## ~~Task 7.11~~

Expand your solution so that it is again possible to like and delete a blog.

## ~~Task 7.12~~

Store the information about the signed in user in the Redux store.

## ~~Task 7.13~~

Implement a view to the application that displays all of the basic information related to users:

## ~~Task 7.14~~

Implement a view for individual users, that displays all of the blog posts added by that user:

## Task 7.15

Implement a separate view for blog posts. You can model the layout of your view after the following example:

Users should be able to access the view by clicking the name of the blog post in the view that lists of all of the blog posts.

After you're done with this exercise, the functionality that was implemented in exercise 5.6 is no longer necessary. Clicking a blog post no longer needs to expand the item in the list and display the details of the blog post.

## Task 7.16

Implement a navigation menu for the application

7.17: comments, step1
Implement the functionality for commenting on blog posts:

Comments should be anonymous, meaning that they are not associated to the user who left the comment.

In this exercise it is enough for the frontend to only display the comments that the application receives from the backend.

An appropriate mechanism for adding comments to a blog post would be an HTTP POST request to the api/blogs/:id/comments endpoint.

7.18: comments, step2
Extend your application so that users can add comments to blog posts from the frontend:

7.19: Styles, step1
Improve the appearance of your application by applying one of the methods shown in the course material.
