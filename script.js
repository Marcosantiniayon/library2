
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

const bookModal = document.querySelector('.book-modal');
const overlay = document.querySelector('.overlay');

const addBookBtn = document.getElementById("add-book-btn");
addBookBtn.addEventListener('click', function(){
    console.log("button clicked");

    bookModal.style.display = 'flex';
    overlay.style.display = 'block';
});

const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener('click', function() {
    const titleInput = document.getElementById('title-input').value;
    const authorInput = document.getElementById('author-input').value;
    const pagesInput = document.getElementById('pages-input').value;
    const pagesReadInput = document.getElementById('pages-read-input').value;
    const notesInput = document.getElementById('notes-textarea').value;

    //Edit Existing Book


    //Add New Book
    const book = new Book(titleInput,authorInput,pagesInput,pagesReadInput, notesInput);
    book.info();    
    const bookCard = document.createElement("div");
        bookCard.classList.add('book-card');
        const bookCardContainer = document.querySelector('.book-card-container');
        bookCardContainer.appendChild(bookCard);
    const titleOutput = document.createElement('p');
        titleOutput.textContent = titleInput;
        bookCard.appendChild(titleOutput);
    const authorOutput = document.createElement('p');
        authorOutput.textContent = authorInput;
        bookCard.appendChild(authorOutput);
    const pagesOutput = document.createElement('p');
        pagesOutput.textContent = pagesInput;
        bookCard.appendChild(pagesOutput);
    const progress = document.createElement('progress');
        progress.value = (pagesReadInput/pagesInput)*100;
        progress.max = 100;
        bookCard.appendChild(progress);

    bookModal.style.display = 'none';
    overlay.style.display = 'none';
    
});