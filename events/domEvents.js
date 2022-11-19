// eslint-disable-next-line no-unused-vars
import { deleteAuthor, getAuthors, getSingleAuthor } from '../api/authorData';
import {
  deleteBook, getBooks, getSingleBook,
} from '../api/bookData';
import { deleteAuthorBooksRelationship } from '../api/mergedData';
import addAuthorForm from '../components/forms/addAuthorForm';
import addBookForm from '../components/forms/addBookForm';
import { showAuthors } from '../pages/authors';
import { showBooks } from '../pages/books';
import viewBook from '../pages/viewBook';

const domEvents = () => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // TODO: CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        console.warn('CLICKED DELETE BOOK', e.target.id);
        const [, firebaseKey] = e.target.id.split('--');
        deleteBook(firebaseKey).then(() => {
          getBooks().then(showBooks);
        });
      }
    }

    // TODO: CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      // console.warn('ADD BOOK');
      addBookForm();
    }

    // TODO: CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      // console.warn('EDIT BOOK', e.target.id);
      // console.warn(e.target.id.split('--'));
      const [, firebaseKey] = e.target.id.split('--');
      getSingleBook(firebaseKey).then((bookObj) => addBookForm(bookObj));
      // getSingleBook(firebaseKey).then(addBookForm); // using the callback method
    }
    // TODO: CLICK EVENT FOR VIEW BOOK DETAILS
    if (e.target.id.includes('view-book-btn')) {
      console.warn('VIEW BOOK', e.target.id);
      const [, firebaseKey] = (e.target.id.split('--'));
      getSingleBook(firebaseKey).then((obj) => {
        getSingleAuthor(obj.author_id).then((taco) => {
          console.warn(taco);
          const payload = {
            title: obj.title,
            description: obj.description,
            image: obj.image,
            price: obj.price,
            author_id: obj.author_id,
            sale: obj.sale,
            authorObject: {
              email: taco.email,
              first_name: taco.first_name,
              last_name: taco.last_name
            },
            firebaseKey,
          };
          viewBook(payload);
        });
      });
    }

    // FIXME: ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        console.warn('DELETE AUTHOR', e.target.id);
        const [, firebaseKey] = e.target.id.split('--');
        deleteAuthorBooksRelationship(firebaseKey).then(() => {
          getAuthors(firebaseKey).then(showAuthors);
        });
      }
    }

    // FIXME: ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      // console.warn('ADD AUTHOR');
      addAuthorForm();
    }
    // FIXME: ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('update-author')) {
      // console.warn('EDIT BOOK', e.target.id);
      // console.warn(e.target.id.split('--'));
      const [, firebaseKey] = e.target.id.split('--');
      getSingleAuthor(firebaseKey).then((authorObj) => addAuthorForm(authorObj));
      // getSingleBook(firebaseKey).then(addBookForm); // using the callback method
    }
  });
};

export default domEvents;
