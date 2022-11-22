import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const viewAuthorBook = (obj) => {
  clearDom();

  let domString = ` <div class="text-white ms-5 details">
  <h5>  ${obj.first_name} ${obj.last_name} ${obj.favorite ? '<span class="badge bg-danger"><i class="fa fa-heart" aria-hidden="true"></i></span>' : ''}</h5>
  Author Email: <a href="mailto:${obj.email}">${obj.email}</a>`;

  obj.booksArray.forEach((item) => {
    domString += `
  <p> ${item.description || ''} </p>
 <h3>${item.title}</h3> 
  <img class ="view-authors-books" src ="${item.image}">

   `;
  });
  renderToDOM('#view', domString);
};

export default viewAuthorBook;

// test
