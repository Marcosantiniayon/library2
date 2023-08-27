const bookModal = document.querySelector('.book-modal');
const overlay = document.querySelector('.overlay');
const form = document.querySelector('.bookInfo-form');
let titleInput = document.getElementById('title-input');
let authorInput = document.getElementById('author-input');
let pagesInput = document.getElementById('pages-input');
let pagesReadInput = document.getElementById('pages-read-input');
let notesInput = document.getElementById('notes-textarea');

const titleError = document.getElementById('title-error');
const authorError = document.getElementById('author-error');
const pagesError = document.getElementById('pages-error');
const pagesReadError = document.getElementById('pagesRead-error');

const addBookBtn = document.getElementById('add-book-btn');
const submitBtn = document.getElementById('submit-btn')
const cancelBtn = document.getElementById('cancel-btn');
const deleteBtn = document.getElementById('delete-btn');
const bookCardContainer = document.querySelector('.book-card-container');

let bookCardElements = []
const myLibrary = [];
let currentBook = "";
let editingBook = false;


function Book(title, author, pages, pagesRead, notes) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.pagesRead = pagesRead;
    this.notes = notes
}
Book.prototype.info = function(){
    console.log(this.title + " by " + this.author + ", " + this.pages + " pages, " + this.pagesRead + " pages read");
}
function clearInputs(){
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    pagesInput.value = '';
    pagesReadInput.value = '';
    notesInput.value = '';
}
function addBookToLibrary() {
    const book = new Book(titleInput.value,authorInput.value,pagesInput.value,pagesReadInput.value,notesInput.value);
    book.info;
    myLibrary.push(book);
  
    clearInputs();    
}
function updateDisplay(){
    bookCardContainer.textContent = ''; //Clears out old display
    bookCardElements = []; //Clears out old list

    //Creates book card for each book in library 
    for (let i = 0; i < myLibrary.length; i++) {
        //create book card elements
        const bookCard = document.createElement("div");
            bookCard.classList.add('book-card');
            bookCard.setAttribute('data-book-index', i);
            bookCardContainer.appendChild(bookCard);
        const titleOutput = document.createElement('p');
            titleOutput.textContent = myLibrary[i].title;
            bookCard.appendChild(titleOutput);
        const authorOutput = document.createElement('p');
            authorOutput.textContent = "By " + myLibrary[i].author;
            bookCard.appendChild(authorOutput);
        const pagesOutput = document.createElement('p');
            pagesOutput.textContent = myLibrary[i].pages + " pages";
            bookCard.appendChild(pagesOutput);
        const progress = document.createElement('progress');
            console.log(pagesReadInput.value, pagesInput.value);
            progress.value = (myLibrary[i].pagesRead/myLibrary[i].pages)*100;
            progress.max = 100;
            bookCard.appendChild(progress);

        // Store the book card element in the array
        bookCardElements.push(bookCard);
    }
    editBook();
}
function openModal(){
    bookModal.style.display = 'block';
    overlay.style.display = 'block';
}
function closeModal(){
    bookModal.style.display = 'none';
    overlay.style.display = 'none';
}

addBookBtn.addEventListener('click', function(){
    console.log("Add book button clicked");
    openModal();
});

function editBook(){
    bookCardElements.forEach((bookCard, index) => {
        bookCard.addEventListener('click', function() {
            // Perform actions when the book card is clicked
            console.log('Book card clicked:', myLibrary[index].title);
            // You can access the book's properties using myLibrary[index]
            titleInput.value = myLibrary[index].title
            authorInput.value = myLibrary[index].author
            pagesInput.value = myLibrary[index].pages
            pagesReadInput.value = myLibrary[index].pagesRead
            notesInput.value = myLibrary[index].notes
    
            editingBook = true;
            currentBook = myLibrary[index];

            openModal();
        });
    });
}

submitBtn.addEventListener('click', function(event) {
    event.preventDefault(); //Prevent page refresh
    console.log("Submit button clicked");

    // Prevent form submission if validation fails
    if (!validateFormFields()) {
        event.preventDefault();
        console.log("Form is not valid. Please fill out all required fields.");
    } else{
        console.log("Form is valid. Submitting...");
        //Edit Existing Book
        if(editingBook === true){ //Edit Book
            console.log('editing book');
            //need to target currently matching selected bookCard book
            currentBook.title = titleInput.value;
            currentBook.author = authorInput.value;
            currentBook.pages = pagesInput.value;
            currentBook.pagesRead = pagesReadInput.value;
            currentBook.notes = notesInput.value;
        }else{//Add New Book
        addBookToLibrary();
        }
        console.log(myLibrary);
        updateDisplay();
        closeModal();
    }
});

cancelBtn.addEventListener('click', function(event){
    event.preventDefault(); //Prevent page refresh
    editingBook = false;
    closeModal();
    clearInputs();    
});
deleteBtn.addEventListener('click', function(event){
    event.preventDefault(); //Prevent page refresh
    // editingBook = false;
    alert('Are you sure you want to delete?');
});


function validateFormFields(){
    let valid = true;

    // Check title input
    if (titleInput.value === '') {
        titleError.style.display = 'block';
        valid = false;
    } else {
        titleError.style.display = 'none';
    }
    // Check author input
    if (authorInput.value === '') {
        authorError.style.display = 'block';
        valid = false;
    } else {
        authorError.style.display = 'none';
    }
    // Check pages input
    if (pagesInput.value === '') {
        pagesError.style.display = 'block';
        valid = false;
    } else {
        pagesError.style.display = 'none';
    }
    // Check pages-read input
    if (pagesReadInput.value === '') {
        pagesReadError.style.display = 'block';
        valid = false;
    } else {
        pagesReadError.style.display = 'none';
    }
    return valid;
}
