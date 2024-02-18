


//Available theme stylesheets
const theme1 = document.getElementById('theme1');
const theme2 = document.getElementById('theme2');
const theme3 = document.getElementById('theme3');
const theme4 = document.getElementById('theme4');

//Main buttons
const addBookBtn = document.querySelector('.add-book-btn');

//Display
const bookCardContainer = document.querySelector('.book-card-container');
let currentView = "bookCard";
let currentSort = "sortByProgress"
let currentFilter = "All"
    
const myLibrary = [];

function Book(title, author, pages, pagesRead, notes) {
  return {title, author, pages, pagesRead, notes};
}
Book.prototype.info = function(){
    console.log(this.title + " by " + this.author + ", " + this.pages + " pages, " + this.pagesRead + " pages read");
}


const initialize = (function () {
    const setDefaultTheme = (function () {
        theme1.disabled = false;
        theme2.disabled = true;
        theme3.disabled = true;
        theme4.disabled = true;
    }());
    
})();

const modalController = (function () {

    const bookModal = document.querySelector('.book-modal');
    const overlay = document.querySelector('.overlay');
    const form = document.querySelector('.bookInfo-form');

    let titleInput = document.getElementById('title-input');
    let authorInput = document.getElementById('author-input');
    let pagesInput = document.getElementById('pages-input');
    let pagesReadInput = document.getElementById('pages-read-input');
    let notesInput = document.getElementById('notes-textarea');

    const submitBtn = document.getElementById('submit-btn')
    const cancelBtn = document.getElementById('cancel-btn');
    const deleteBtn = document.getElementById('delete-btn');

    let mode = ''; //new or edit book modes

    function openModal(passedMode){
        bookModal.style.display = 'block';
        overlay.style.display = 'block';
        mode = passedMode;
    }
    function closeModal(){
        bookModal.style.display = 'none';
        overlay.style.display = 'none';
        clearInputs();
    }
    function clearInputs() {
        titleInput.value = '';
        authorInput.value = '';
        pagesInput.value = '';
        pagesReadInput.value = '';
        notesInput.value = '';
    }
    function addBookToLibrary() {
        
        //Get current values from inputs
        const title = titleInput.value;
        const author = titleInput.value;
        const pages = titleInput.value;
        const pagesRead = titleInput.value;
        const notes = titleInput.value;

        //Create new book object
        const book = new Book(title,author,pages,pagesRead,notes);
        book.info;

        //Add it to my library
        myLibrary.push(book);
    }
    function removeBookFromLibrary() {
        const indexToRemove = currentBookIndex;
        myLibrary.splice(indexToRemove, 1);
    }
    submitBtn.addEventListener('click', function (event) {
        event.preventDefault(); //Prevent page refresh
        
        //Check mode (adding new or editing)
        if (mode === 'new' ) {
            addBookToLibrary();
        } else {
            mode = 'Editing book';
        }

        updateDisplay();
        closeModal();
    });
    cancelBtn.addEventListener('click', function (event) {
        event.preventDefault(); //Prevent page refresh
        mode = '';
        closeModal();
    });
    deleteBtn.addEventListener('click', function (event) {
        event.preventDefault(); //Prevent page refresh
        if (mode === 'edit') {
            if (confirm('Are you sure you want to delete?')) {
                removeBookFromLibrary();
                clearInputs();
                updateDisplay();
            } else {
                return;
            }
        } else {
            alert('Cannot delete new book');
            return;
        }   
    });

    return {openModal,closeModal};
})();

const optionBtns = (function () {
    const themeOptions = document.querySelectorAll('.theme.option');
    const viewOptions = document.querySelectorAll('.view.option');
    const sortOptions = document.querySelectorAll('.sort.option');
    const filterOptions = document.querySelectorAll('.filter.option');

    themeOptions.forEach(option => {
        option.addEventListener('click', function () {
            switchTheme(option)
        });
        function switchTheme(option) {
            //Unselect options
            themeOptions.forEach(option => {
                option.classList.remove('option-selected');
            })
            
            //Select option
            option.classList.add('option-selected');

            //Disable all style sheets 
            theme1.disabled = true;
            theme2.disabled = true;
            theme3.disabled = true;
            theme4.disabled = true;

            //Enable correct sheet
            const theme = document.getElementById(option.id);
            theme.disabled = false;
        }
    });
})();

addBookBtn.addEventListener('click', function () {
    let mode = 'new';
    modalController.openModal(mode);
});




function updateDisplay() {
    console.log('display updated');

    bookCardContainer.textContent = ''; //Clears out old display
    bookCardElements = []; //Clears out old list

    function applyFilter(){
        if(currentFilter == "All"){
            filteredBooks = myLibrary;
        } else if(currentFilter == "Completed"){
            filteredBooks = myLibrary.filter(book => book.pagesRead === book.pages);
        }else if(currentFilter == "Reading"){
            filteredBooks = myLibrary.filter(book => book.pagesRead > 0 && book.pagesRead <book.pages);
        }else if(currentFilter == "To Read"){
            filteredBooks = myLibrary.filter(book => book.pagesRead === '0');
        }
    } applyFilter();
    
    function applySort(){
        if(currentSort == "sortByProgress"){
            filteredBooks.sort(sortByProgress);
        }else if(currentSort == "sortByTitle"){
            filteredBooks.sort(sortByTitle);
        }else if(currentSort == "sortByAuthor"){
            filteredBooks.sort(sortByAuthor);
        }else if(currentSort == "sortByProgress2"){
            filteredBooks.sort(sortByProgress2);
        }else if(currentSort == "sortByTitle2"){
            filteredBooks.sort(sortByTitle2);
        } else if(currentSort == "sortByAuthor2"){
            filteredBooks.sort(sortByAuthor2);
        }
    } applySort();
    
    //Creates book card for each book in library 
    for (let i = 0; i < filteredBooks.length; i++) {
        //create book card elements
        const bookCard = document.createElement("div");
            bookCard.classList.add('book-card');
            bookCard.setAttribute('data-book-index', i);
            bookCardContainer.appendChild(bookCard);
        const bookCardLeft = document.createElement("div");
            bookCardLeft.classList.add('book-card-left');
            bookCard.appendChild(bookCardLeft);
        const titleOutput = document.createElement('p');
            titleOutput.textContent = filteredBooks[i].title;
            bookCardLeft.appendChild(titleOutput);
        const authorOutput = document.createElement('p');
            authorOutput.textContent = "By " + filteredBooks[i].author;
            bookCardLeft.appendChild(authorOutput);
        const bookCardRight = document.createElement("div");
            bookCardRight.classList.add('book-card-right');
            bookCard.appendChild(bookCardRight);
        const pagesOutput = document.createElement('p');
            pagesOutput.textContent = filteredBooks[i].pagesRead + " / " + filteredBooks[i].pages + " pages";
            bookCardRight.appendChild(pagesOutput);
        const progress = document.createElement('progress');
            progress.classList.add('progress');
            progress.value = (filteredBooks[i].pagesRead/filteredBooks[i].pages)*100;
            progress.max = 100;
            if(progress.value == 100){
                progress.classList.add('progress-done');
            }
            bookCardRight.appendChild(progress);
        const progressCircle = document.createElement('progressCircle');
            progressCircle.classList.add('progress-circle');
            if(progress.value == 100){
                progressCircle.classList.add('progress-circle-done');
            }else if(progress.value == 0){
                progressCircle.classList.remove('progress-circle-done');
                progressCircle.classList.add('progress-circle-toRead');
            }
            bookCardRight.appendChild(progressCircle);

        // Store the book card element in the array
        bookCardElements.push(bookCard);
    }
    applyBookCardVariables();
    if(currentView == "bookCard"){
        applyBookCardsView();
    }else{
        applyListView();
    }
    editBook();
}

function sortByTitle(a, b) {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();

    if (titleA < titleB) {
        return -1;
    }
    if (titleA > titleB) {
        return 1;
    }
    return 0;
}
function sortByTitle2(a, b) {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();

    if (titleA > titleB) {
        return -1;
    }
    if (titleA < titleB) {
        return 1;
    }
    return 0;
}
function sortByProgress(a,b) {
    const readProgressA = a.pagesRead/a.pages
        const readProgressB = b.pagesRead/b.pages
        return readProgressA - readProgressB;
}
function sortByProgress2(a,b) {
    const readProgressA = a.pagesRead/a.pages
        const readProgressB = b.pagesRead/b.pages
        return readProgressB - readProgressA;
}
function sortByAuthor(a, b) {
    const titleA = a.author.toLowerCase();
    const titleB = b.author.toLowerCase();

    if (titleA < titleB) {
        return -1;
    }
    if (titleA > titleB) {
        return 1;
    }
    return 0;
}
function sortByAuthor2(a, b) {
    const titleA = a.author.toLowerCase();
    const titleB = b.author.toLowerCase();

    if (titleA > titleB) {
        return -1;
    }
    if (titleA < titleB) {
        return 1;
    }
    return 0;
}
function applyBookCardsView(){
    bookCardContainer.style.display = 'grid';
    bookCardContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
    bookCardContainer.style.gap = '20px';
    bookCardLeft.forEach((element) => {
        element.style.display = 'block';
    });
    bookCardRight.forEach((element) => {
        element.style.display = 'block';
    });
    bookCard.forEach((bookCard) => {
        bookCard.style.display = "block";
        bookCard.style.border = '1px solid #72A1E5;';
        bookCard.style.paddingTop = "10px";
        bookCard.style.paddingBottom = "10px";
        bookCard.style.marginBottom = "10px";
        bookCard.style.marginBottom = "10px";
        for (let i = 0; i < paragraphs.length; i++) {
            paragraphs[i].style.margin = '12px';
        }

    });
    progress.forEach((progress) =>{
        progress.style.display = "block";
    });
    progressCircle.forEach((circle) =>{
        circle.style.display = "none";
    });
    currentView = 'bookCard';
}
function applyListView(){
    bookCardContainer.style.display = 'flex';
    bookCardContainer.style.flexDirection = 'column';
    bookCardContainer.style.gridTemplateColumns = '';
    bookCardContainer.style.gap = '0px';
    bookCardLeft.forEach((element) => {
        element.style.display = 'flex';
    });
    bookCardRight.forEach((element) => {
        element.style.display = 'flex';
    });
    bookCard.forEach((bookCard) => {
        bookCard.style.display = "flex";
        bookCard.style.border = 'none';
        bookCard.style.justifyContent = "space-between";
        bookCard.style.paddingTop = "0px";
        bookCard.style.paddingBottom = "0px";
        bookCard.style.marginBottom = "2px";
        for (let i = 0; i < paragraphs.length; i++) {
            paragraphs[i].style.margin = '4px';
        }
    });
    progress.forEach((progress) =>{
        progress.style.display = "none";
    });
    progressCircle.forEach((circle) =>{
        circle.style.display = "block";
    });
    currentView = 'ListView';
} 
