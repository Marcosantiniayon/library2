const bookModal = document.querySelector('.book-modal');
const overlay = document.querySelector('.overlay');
const form = document.querySelector('.bookInfo-form');
let titleInput = document.getElementById('title-input');
let authorInput = document.getElementById('author-input');
let pagesInput = document.getElementById('pages-input');
let pagesReadInput = document.getElementById('pages-read-input');
let notesInput = document.getElementById('notes-textarea');

const bookCardContainer = document.querySelector('.book-card-container');

const titleError = document.getElementById('title-error');
const authorError = document.getElementById('author-error');
const pagesError = document.getElementById('pages-error');
const pagesReadError = document.getElementById('pagesRead-error');

let bookCard;
let bookCardLeft;
let bookCardRight;
let progress;
let progressCircle;
let paragraphs;

const myLibrary = [];
let bookCardElements = []
let currentBook = "";
let currentBookIndex = 0;
let editingBook = false;
let currentView = "bookCard";
let currentSort = "sortByProgress"
let currentFilter = "All"
let filteredBooks;

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

function optionBtns(){
    const addBookBtn = document.querySelector('.add-book-btn');
    const themeBtn = document.querySelector('.theme-btn');
    const viewBtn = document.querySelector('.view-btn');
    const sortBtn = document.querySelector('.sort-btn');
    const filterBtn = document.querySelector('.filter-btn');

    const dropdownThemeContent = document.getElementById('dropdown-theme-content');
    const dropdownViewContent = document.getElementById('dropdown-view-content');
    const dropdownSortContent = document.getElementById('dropdown-sort-content');
    const dropdownFilterContent = document.getElementById('dropdown-filter-content');

    const theme1Stylesheet = document.getElementById('theme1-stylesheet');
    const theme2Stylesheet = document.getElementById('theme2-stylesheet');
    const theme3Stylesheet = document.getElementById('theme3-stylesheet');
    const theme4Stylesheet = document.getElementById('theme4-stylesheet');

    addBookBtn.addEventListener('click', function(){
        openModal();
    });
    function setDefaultTheme(){
        theme1Stylesheet.disabled = false;
        theme2Stylesheet.disabled = true;
        theme3Stylesheet.disabled = true;
        theme4Stylesheet.disabled = true;

    } setDefaultTheme();
    
    themeBtn.addEventListener('hover', function(){
        const theme = document.getElementById('theme');
        const theme2 = document.getElementById('theme2');
        const theme3 = document.getElementById('theme3');
        const theme4 = document.getElementById('theme4');

        function switchTheme(themeId){
            theme1Stylesheet.disabled = true;
            theme2Stylesheet.disabled = true;
            theme3Stylesheet.disabled = true;
            theme4Stylesheet.disabled = true;
    
            const selectedTheme = document.getElementById(themeId);
            console.log('selected theme: ' + selectedTheme);
            console.log('theme ID: ' + themeId.id);
            if(selectedTheme){
                selectedTheme.disabled = false;
            }
        }
        
        applyBookCardVariables();
    
        theme.addEventListener('click', function(){
            switchTheme(theme1Stylesheet.id);
            theme.classList.add('option-selected');
            theme2.classList.remove('option-selected');
            theme3.classList.remove('option-selected');
            theme4.classList.remove('option-selected');
            closeDropDown(dropdownThemeContent, themeBtn);

        });

        theme2.addEventListener('click', function(){
            switchTheme(theme2Stylesheet.id);
            theme.classList.remove('option-selected');
            theme2.classList.add('option-selected');
            theme3.classList.remove('option-selected');
            theme4.classList.remove('option-selected');
            closeDropDown(dropdownThemeContent, themeBtn);

        });

        theme3.addEventListener('click', function(){
            switchTheme(theme3Stylesheet.id);
            theme.classList.remove('option-selected');
            theme2.classList.remove('option-selected');
            theme3.classList.add('option-selected');
            theme4.classList.remove('option-selected');
            closeDropDown(dropdownThemeContent, themeBtn);

        });

        theme4.addEventListener('click', function(){
            switchTheme(theme4Stylesheet.id);
            theme.classList.remove('option-selected');
            theme2.classList.remove('option-selected');
            theme3.classList.remove('option-selected');
            theme4.classList.add('option-selected');
            closeDropDown(dropdownThemeContent, themeBtn);

        });

    });
    viewBtn.addEventListener('hover', function(){
        const bookCardsView = document.getElementById('book-cards-view');
        const listView = document.getElementById('list-view');
    
        applyBookCardVariables();
    
        bookCardsView.addEventListener('click', function(){
            listView.classList.remove('option-selected');
            bookCardsView.classList.add('option-selected');
            closeDropDown(dropdownViewContent, viewBtn);
            applyBookCardsView();
        });
    
        listView.addEventListener('click', function(){
            bookCardsView.classList.remove('option-selected');
            listView.classList.add('option-selected');
            closeDropDown(dropdownViewContent, viewBtn);
            applyListView();
        });

    });
    sortBtn.addEventListener('hover', function(){
        const progressSort = document.getElementById('progress-sort');
        const titleSort = document.getElementById('title-sort');
        const authorSort = document.getElementById('author-sort');
        
        applyBookCardVariables();

        progressSort.addEventListener('click', function(){
            titleSort.classList.remove('option-selected');
            authorSort.classList.remove('option-selected');
            progressSort.classList.add('option-selected');
            closeDropDown(dropdownSortContent, sortBtn);


            if(currentSort== "sortByProgress"){
                currentSort= "sortByProgress2"
            } else if(currentSort== "sortByProgress2"){
                currentSort = "sortByProgress"
            } else{
                currentSort= "sortByProgress"
            }
            updateDisplay();
            
        });
    
        titleSort.addEventListener('click', function(){
            authorSort.classList.remove('option-selected');
            progressSort.classList.remove('option-selected');
            titleSort.classList.add('option-selected');
            closeDropDown(dropdownSortContent, sortBtn);


            if(currentSort== "sortByTitle"){
                currentSort= "sortByTitle2"
            } else if(currentSort== "sortByTitle2"){
                currentSort = "sortByTitle";
            } else{
                currentSort= "sortByTitle";
            }
            updateDisplay();

        });

        authorSort.addEventListener('click', function(){
            titleSort.classList.remove('option-selected');
            progressSort.classList.remove('option-selected');
            authorSort.classList.add('option-selected');
            closeDropDown(dropdownSortContent, sortBtn);


            if(currentSort== "sortByAuthor"){
                currentSort= "sortByAuthor2"
            } else if(currentSort== "sortByAuthor2"){
                currentSort = "sortByAuthor";
            } else{
                currentSort= "sortByAuthor";
            }
            updateDisplay();

        });
    });
    filterBtn.addEventListener('hover', function(){
        const allFilter = document.getElementById('all-filter');
        const completedFilter = document.getElementById('completed-filter');
        const readingFilter = document.getElementById('reading-filter');
        const toReadFilter = document.getElementById('to-read-filter');
        
        applyBookCardVariables();

        allFilter.addEventListener('click', function(){
            completedFilter.classList.remove('option-selected');
            readingFilter.classList.remove('option-selected');
            toReadFilter.classList.remove('option-selected');
            allFilter.classList.add('option-selected');
            currentFilter = "All";
            closeDropDown(dropdownFilterContent, filterBtn);
            updateDisplay();
        });

        completedFilter.addEventListener('click', function(){
            readingFilter.classList.remove('option-selected');
            toReadFilter.classList.remove('option-selected');
            allFilter.classList.remove('option-selected');
            completedFilter.classList.add('option-selected');

            currentFilter = "Completed";
            closeDropDown(dropdownFilterContent, filterBtn);
            updateDisplay();
        });

        readingFilter.addEventListener('click', function(){
            toReadFilter.classList.remove('option-selected');
            allFilter.classList.remove('option-selected');
            completedFilter.classList.remove('option-selected');
            readingFilter.classList.add('option-selected');

            currentFilter = "Reading";
            closeDropDown(dropdownFilterContent, filterBtn);
            updateDisplay();
        });
        
        toReadFilter.addEventListener('click', function(){
            allFilter.classList.remove('option-selected');
            completedFilter.classList.remove('option-selected');
            readingFilter.classList.remove('option-selected');
            toReadFilter.classList.add('option-selected');

            currentFilter = "To Read";
            closeDropDown(dropdownFilterContent, filterBtn);
            updateDisplay();
        });

    });
} optionBtns();

function modalBtns(){
    const submitBtn = document.getElementById('submit-btn')
    const cancelBtn = document.getElementById('cancel-btn');
    const deleteBtn = document.getElementById('delete-btn');

    submitBtn.addEventListener('click', function(event) {
        event.preventDefault(); //Prevent page refresh
    
        // Prevent form submission if validation fails
        if (!validateFormFields()) {
            event.preventDefault();
            console.log("Form is not valid. Please fill out all required fields.");
        } else{
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
            updateDisplay();
        }
        clearInputs();    
    });
    cancelBtn.addEventListener('click', function(event){
        event.preventDefault(); //Prevent page refresh
        editingBook = false;
        console.log
        closeModal();
        clearInputs();    
    });
    deleteBtn.addEventListener('click', function(event){
        event.preventDefault(); //Prevent page refresh
        if (confirm('Are you sure you want to delete?')) {
            removeBookFromLibrary();
            clearInputs();
            updateDisplay();
        } else {
            return;
        }
        
    });
} modalBtns();

function editBook(){ // Book card event listeners
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
            currentBookIndex = index;

            openModal();
        });
    });
}
function addBookToLibrary() {
    const book = new Book(titleInput.value,authorInput.value,pagesInput.value,pagesReadInput.value,notesInput.value);
    book.info;
    myLibrary.push(book);
}
function removeBookFromLibrary(){
    const indexToRemove = currentBookIndex;
    myLibrary.splice(indexToRemove, 1);
}
function updateDisplay(){
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

    
    closeModal();

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
function applyBookCardVariables(){
    bookCard = document.querySelectorAll('.book-card');
    bookCardLeft = document.querySelectorAll('.book-card-left');
    bookCardRight = document.querySelectorAll('.book-card-right');
    
    progress = document.querySelectorAll('.progress');
    progressCircle = document.querySelectorAll('.progress-circle');
    paragraphs = document.getElementsByTagName('p');
}
function validateFormFields(){
    let valid = true;

    function _isValidNumberInput(input) {
        const number = Number(input);
        return !isNaN(number) && Number.isInteger(number) && number >= 0;
    }

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
        pagesError.textContent = "# of pages required";
        pagesError.style.display = 'block';
        valid = false;
    } else if(!_isValidNumberInput(pagesInput.value)){
        pagesError.textContent = "Enter valid number";
        pagesError.style.display = 'block';
        valid = false;
    }else {
        pagesError.style.display = 'none';
    }
    // Check pages-read input
    if (pagesReadInput.value === '') {
        pagesReadError.textContent = "# of pages read required";
        pagesReadError.style.display = 'block';
        valid = false;
    } else if(!_isValidNumberInput(pagesInput.value)){
        pagesReadError.textContent = "Enter valid number";
        pagesReadError.style.display = 'block';
        valid = false;
    } else if(Number(pagesReadInput.value) > Number(pagesInput.value)){
        pagesReadError.textContent = "Can't be more than total pages";
        pagesReadError.style.display = 'block';
        valid = false;
    } else {
        pagesReadError.style.display = 'none';
    }
    return valid;
}
function clearInputs(){
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    pagesInput.value = '';
    pagesReadInput.value = '';
    notesInput.value = '';
}
function openModal(){
    bookModal.style.display = 'block';
    overlay.style.display = 'block';
}
function closeModal(){
    bookModal.style.display = 'none';
    overlay.style.display = 'none';
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
} //

