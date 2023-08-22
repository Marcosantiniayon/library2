
function Book(title, author, pages, pagesRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.pagesRead = pagesRead;
}

Book.prototype.info = function(){
    console.log(this.title + " by " + this.author + ", " + this.pages + " pages, " + this.status);
}

const addBookBtn = document.getElementById("add-book-btn");
addBookBtn.addEventListener('click', function(){
    console.log("button clicked");
    const bookModal = document.querySelector('.book-modal');
    const overlay = document.querySelector('.overlay');
    bookModal.style.display = 'flex';
    overlay.style.display = 'block';

});

const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener('click', function() {
    const book = new Book(title,author,pages,pagesRead);
    book.info();    
});