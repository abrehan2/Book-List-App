document.addEventListener('DOMContentLoaded', () => {

class Book{
    
constructor(title, author, isbn)
{
    this.title = title;
    this.author =  author;
    this.isbn = isbn;
}

}

class UI{

static displayBooks(){

// creating a hard-coded array of objects of books in a static function
const storedBooks = Store.getBooks();

const Books = storedBooks; // now books is an array too

Books.forEach((book) => {

UI.addBookToList(book);

});
}

static addBookToList(book)
{
    const bookList = document.querySelector("#book-list");
    
    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-bg-danger btn-close btn-close-white btn-sm"></td>`;
    bookList.insertAdjacentElement('afterbegin', row);
}

static delete_books(el){

if(el.classlist.contains('delete'))
{
    el.parerentElement.parerentElement.remove();
}
}

static show_alert(message, className)
{
const div = document.createElement('div');

div.className = `alert ${className}`;

div.appendChild(document.createTextNode(message));

const container = document.querySelector(".container");

const form = document.querySelector("#book-form");

container.insertBefore(div, form);

// vanish in 3 seconds
setTimeout(() => {
document.querySelector('.alert').remove();
}, 3000);

}

static clearFields()
{
    document.querySelector("#floatingInput").value = ``;
    document.querySelector("#author").value = ``;
    document.querySelector("#book-isbn").value = ``;    
}

}

class Store{

static getBooks()
{
    // Returning book from LocalStorage
    let books;

   if(localStorage.getItem('books') === null)
   {
    books = [];
   }

   else
   {
    books = JSON.parse(localStorage.getItem('books'));
   }

return books;
}

// Add a book in Local Storage
static addBook(book)
{
    const books = Store.getBooks();

   books.push(book);

   localStorage.setItem('books', JSON.stringify(books));

}

static removeBook(ISBN)
{
    const books = Store.getBooks();

    books.forEach((book, idx) => {

        if(book.isbn === ISBN)
        {
            books.splice(idx, 1);
        }

    });

    localStorage.setItem('books', JSON.stringify(books));
} 
}

UI.displayBooks();

// Add a book to table through Form
document.querySelector("#book-form").addEventListener('submit', (e) => {
    
e.preventDefault();
    
// Get form values
const title = document.querySelector("#floatingInput").value;
const book_author = document.querySelector("#author").value;
const ISBN = document.querySelector("#book-isbn").value;


// validate
if(title == '' || book_author == '' || ISBN == '')
{
    UI.show_alert('Please fill in all fields', 'bg-danger text-center text-white fs-5 w-50 m-auto mb-4');
}

else
{

// Instantiate book
const book = new Book(title, book_author, ISBN);

UI.show_alert('Book added', 'bg-success text-center text-white fs-5 w-50 m-auto mb-4');

// Add book to UI
UI.addBookToList(book);
Store.addBook(book);
UI.clearFields();

}

});

// Delete books from list
document.querySelector("#book-list").addEventListener('click', (e) => {

UI.delete_books(e.target);

});

});
