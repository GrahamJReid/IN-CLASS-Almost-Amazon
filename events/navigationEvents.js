import { getAuthors, getFavoriteAuthors } from '../api/authorData';
import { getBooks, booksOnSale } from '../api/bookData';
import { searchedBooksOnDom, showBooks, showBooksArr } from '../pages/books';
import { signOut } from '../utils/auth';
import { showAuthors } from '../pages/authors';

// navigation events
const navigationEvents = (user) => {
  // LOGOUT BUTTON
  document.querySelector('#logout-button')
    .addEventListener('click', signOut);

  // TODO: BOOKS ON SALE
  document.querySelector('#sale-books').addEventListener('click', () => {
    booksOnSale(user.uid).then(showBooks);
  });

  // TODO: ALL BOOKS
  document.querySelector('#all-books').addEventListener('click', () => {
    getBooks(user.uid).then(showBooks);
  });

  // FIXME: STUDENTS Create an event listener for the Authors
  // 1. When a user clicks the authors link, make a call to firebase to get all authors
  // 2. Convert the response to an array because that is what the makeAuthors function is expecting
  // 3. If the array is empty because there are no authors, make sure to use the emptyAuthor functio
  document.querySelector('#authors').addEventListener('click', () => {
    getAuthors(user.uid).then(showAuthors);
  });

  // FAVORITE AUTHORS
  document.querySelector('#favoriteAuthors').addEventListener('click', () => {
    getFavoriteAuthors(user.uid).then(showAuthors);
  });

  // STRETCH: SEARCH
  document.querySelector('#search').addEventListener('keyup', (e) => {
    e.preventDefault();
    const searchValue = document.querySelector('#search').value.toLowerCase();
    console.warn(searchValue);
    // eslint-disable-next-line arrow-parens
    const searchResult = showBooksArr.filter(taco => taco.title.toLowerCase().includes(searchValue));
    console.warn(searchResult);
    searchedBooksOnDom(searchResult);
  });
};

console.warn(showBooksArr);
// WHEN THE USER PRESSES ENTER, MAKE THE API CALL AND CLEAR THE INPUT
// if (e.keyCode === 13) {
// MAKE A CALL TO THE API TO FILTER ON THE BOOKS
// IF THE SEARCH DOESN'T RETURN ANYTHING, SHOW THE EMPTY STORE
// OTHERWISE SHOW THE STORE

// document.querySelector('#search').value = '';

export default navigationEvents;
