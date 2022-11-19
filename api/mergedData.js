// for merged promises

import { deleteAuthor, getAuthorBooks, getSingleAuthor } from './authorData';
import { deleteBook, getSingleBook } from './bookData';

// TODO: Get data for viewBook
const getBookDetails = (firebaseKey) => new Promise((resolve, reject) => {
  // GET SINGLE BOOK
  getSingleBook(firebaseKey).then((bookObject) => { // returns single book object
    getSingleAuthor(bookObject.author_id) // we nest this promise so that we can use the book object
      .then((authorObject) => resolve({ ...bookObject, authorObject }));
  }).catch(reject);
  // GET AUTHOR
  // Create an object that has book data and an object named authorObject
});
const deleteAuthorBooksRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getAuthorBooks(firebaseKey).then((authorBooksArray) => {
    const deleteBookPromises = authorBooksArray.map((book) => deleteBook(book.firebaseKey));

    Promise.all(deleteBookPromises).then(() => {
      deleteAuthor(firebaseKey).then(resolve);
    });
  }).catch(reject);
});
// get author book

const getAuthorandBooks = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleAuthor(firebaseKey).then((authorObject) => {
    getAuthorBooks(authorObject.firebaseKey).then((booksArray) => {
      const authorAndBooks = {
        ...authorObject, booksArray
      };
      resolve(authorAndBooks);
    });
  }).catch(reject);

  /* getSingleAuthor(firebaseKey).then((authorObject) => {
    getAuthorBooks(firebaseKey).then(booksArray)
      .then((authorObject) => resolve({ ...authorObject, booksArray }));
  }).catch(reject); */
});
export { getBookDetails, deleteAuthorBooksRelationship, getAuthorandBooks };
