## 8.17 Listing books

After the backend changes the list of books does not work anymore. Fix it.

## 8.18 Log in

Adding new books and changing the birth year of an author do not work because they require user to be logged in.

Implement login functionality and fix the mutations.

It is not necessary yet to handle validation errors.

You can decide how the log in looks on the user interface. One possible solution is to make the login form into a separate view which can be accessed through a navigation menu

The login form

When a user is logged in, the navigation changes to show the functionalities which can only be done by a logged in user

## 8.19 Books by genre, part 1

Complete your application to filter the book list by genre. Your solution might look something like this:

In this exercise the filtering can be done using just React.

## 8.20 Books by genre, part 2

Implement a view which shows all the books based on the logged in user's favourite genre.

## 8.21 books by genre with GraphQL

In the previous exercise 8.20, the filtering could have been done using just React. To complete this exercise, you should filter the books in the recommendations page using a GraphQL query to the server. The query created in exercise 8.5 could be useful here.

This and the next exercises are quite challenging like it should be this late in the course. You might want to complete first the easier ones in next part.

Some tips

Instead of using useQuery it is propably better to do the queries with the useLazyQuery-hook
It is sometimes useful to save the results of a GraphQL query to the state of a component.
Note, that you can do GraphQL queries in a useEffect-hook.
The second parameter of a useEffect - hook can become handy depending on your approach.
8.22 Up to date cache and book recommendations
If you fetch the book recommendations with GraphQL, ensure somehow that the books view is kept up to date. So when a new book is added, the books view is updated at least when a genre selection button is pressed.

When new genre selection is not done, the view does not have to be updated.
