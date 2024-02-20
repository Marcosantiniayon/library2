// Theme stylesheets
const theme1 = document.getElementById('theme1');
const theme2 = document.getElementById('theme2');
const theme3 = document.getElementById('theme3');
const theme4 = document.getElementById('theme4');

// Modal elements & Form inputs
const bookModal = document.querySelector('.book-modal');
const overlay = document.querySelector('.overlay');
const form = document.querySelector('.bookInfo-form');
let titleInput = document.getElementById('title-input');
let authorInput = document.getElementById('author-input');
let pagesInput = document.getElementById('pages-input');
let pagesReadInput = document.getElementById('pages-read-input');
let notesInput = document.getElementById('notes-textarea');

// UI state
const myLibrary = [];
let editingBook = false;
let currentBook = "";
let currentBookIndex = 0;
let currentView = "book-cards-view";
let currentSort = "progress-sort";
let isSortReversed = false;
let currentFilter = "all-filter"

// Database
function Book(title, author, pages, pagesRead, notes) {
  return {title, author, pages, pagesRead, notes};
}
Book.prototype.info = function(){
    console.log(this.title + " by " + this.author + ", " + this.pages + " pages, " + this.pagesRead + " pages read");
}

// IIFE's (controller modules)
const initialize = (function () {
    const setDefaultTheme = (function () {
        theme1.disabled = false;
        theme2.disabled = true;
        theme3.disabled = true;
        theme4.disabled = true;
    }());
    
})();

const modalController = (function () {
    const submitBtn = document.getElementById('submit-btn')
    const cancelBtn = document.getElementById('cancel-btn');
    const deleteBtn = document.getElementById('delete-btn');

    function addBookToLibrary() {
        
        //Get current values from inputs
        const title = titleInput.value;
        const author = authorInput.value;
        const pages = pagesInput.value;
        const pagesRead = pagesReadInput.value;
        const notes = notesInput.value;

        //Create new book object
        const book = new Book(title,author,pages,pagesRead,notes);
        book.info;

        //Add it to my library
        myLibrary.push(book);
    }

    function removeBookFromLibrary(){
        const indexToRemove = currentBookIndex;
        myLibrary.splice(indexToRemove, 1);
    }

    submitBtn.addEventListener('click', function (event) {
        event.preventDefault(); //Prevent page refresh
        
        if (editingBook === false ) {
            addBookToLibrary();
        } else {
            editBook();
        }

        updateDisplay();
        closeModal();
    });
    cancelBtn.addEventListener('click', function (event) {
        event.preventDefault(); //Prevent page refresh
        editingBook = false;
        closeModal();
    });
    deleteBtn.addEventListener('click', function (event) {
        event.preventDefault(); //Prevent page refresh
        if (editingBook === true) {
            if (confirm('Are you sure you want to delete?')) {
                removeBookFromLibrary();
                clearInputs();
                updateDisplay();
                closeModal();
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

const buttonsController = (function () {
    const addBookBtn = document.querySelector('.add-book-btn');
    const themeOptions = document.querySelectorAll('.theme.option');
    const viewOptions = document.querySelectorAll('.view.option');
    const sortOptions = document.querySelectorAll('.sort.option');
    const filterOptions = document.querySelectorAll('.filter.option');

    addBookBtn.addEventListener('click', function () {
        editingBook = false;
        modalController.openModal();
    });
    themeOptions.forEach(option => {
        option.addEventListener('click', function () {
            switchTheme(option);
            changeSelected(themeOptions, option);
            closeDropDown(event.target);
        });
        function switchTheme(option) {
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
    viewOptions.forEach(option => {
        option.addEventListener('click', function () {
            switchView(option);
            changeSelected(viewOptions, option);
            closeDropDown(event.target);
        });
        function switchView(option) {
            currentView = option.id;
            updateDisplay();
        }
    });
    sortOptions.forEach(option => {
        option.addEventListener('click', function () {
            applySort(option);
            changeSelected(sortOptions, option);
            updateCaret();
            closeDropDown(event.target);
        });
        
        function applySort(option) {
            // Check for sort reversal
            if (currentSort === option.id) {
                isSortReversed = true;
                currentSort = option.id + '2'; // Update the current sort to the new option

                //Rotate caret

            } else {
                currentSort = option.id; // Update the current sort to the new option
                isSortReversed = false; // Reset the reverse when changing sort types
            }
            console.log(currentSort);
            updateDisplay();
        };
        function updateCaret() {
            sortOptions.forEach(option => {
                // Look for an existing caret within this specific option
                const existingCaret = option.querySelector('.caret');

                if (!option.classList.contains('option-selected') && existingCaret) {
                    // If sort option is not selected and has an existing caret, remove it
                    option.removeChild(existingCaret);
                } else if (option.classList.contains('option-selected') && !existingCaret) {
                    // If sort option is selected and has no existing caret, add it
                    const caret = document.createElement('span');
                    caret.classList.add('caret');
                    caret.innerHTML = '▼';
                    option.appendChild(caret);
                } else if (option.classList.contains('option-selected') && existingCaret) {
                    // If sort option is selected and has an existing caret, rotate it
                    existingCaret.innerHTML = isSortReversed ? '▲' : '▼';
                }
            });
        }
    });
    filterOptions.forEach(option => {
        option.addEventListener('click', function () {
            applyFilter(option);
            changeSelected(filterOptions, option);
            closeDropDown(event.target);
        });
        function applyFilter(option) {
            console.log(option.id)
            currentFilter = option.id;
            updateDisplay();
        }
    });
    function changeSelected(dropdown, passedOption) {
        //Unselect options
        dropdown.forEach(option => {
            option.classList.remove('option-selected');
        })
        //Add selected option
        passedOption.classList.add('option-selected');
    };
    function closeDropDown(option) {
        var dropdown = option.closest('.dropdown-content');
        dropdown.classList.add('hidden');

        //remove hidden dropdown class afterwards
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.addEventListener('mouseenter', function() {
                this.querySelector('.dropdown-content').classList.remove('hidden');
            });
        });
    }

})();

// Functions
function openModal(){
    bookModal.style.display = 'block';
    overlay.style.display = 'block';
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
function editBook() {
    currentBook.title = titleInput.value;
    currentBook.author = authorInput.value;
    currentBook.pages = pagesInput.value;
    currentBook.pagesRead = pagesReadInput.value;
    currentBook.notes = notesInput.value;
}
function updateDisplay() {
    function filterBooks() {
        switch (currentFilter) {
            case "completed-filter":
                return myLibrary.filter(book => book.pagesRead === book.pages);
            case "reading-filter":
                return myLibrary.filter(book => book.pagesRead > 0 && book.pagesRead < book.pages);
            case "to-read-filter":
                return myLibrary.filter(book => book.pagesRead === '0');
            default:
                return myLibrary;
        }
    }
    function sortBooks(books) {
        switch (currentSort) {
            case "title-sort":
            case "title-sort2":
                return books.sort((a, b) => sortHelper(a.title, b.title, isSortReversed));
            case "author-sort":
            case "author-sort2":
                return books.sort((a, b) => sortHelper(a.author, b.author, isSortReversed));
            case "progress-sort":
            case "progress-sort2":
                return books.sort((a, b) => sortHelper(a.pagesRead / a.pages, b.pagesRead / b.pages, isSortReversed));
            default:
                console.log("Unknown sort: " + currentSort);
        }
    }
    function sortHelper(a, b, reverse = false) {
        //Ascending and descending sort
        const lowerA = typeof a === 'string' ? a.toLowerCase() : a;
        const lowerB = typeof b === 'string' ? b.toLowerCase() : b;

        if (reverse) {
            return lowerB < lowerA ? -1 : (lowerB > lowerA ? 1 : 0);
        } else {
            return lowerA < lowerB ? -1 : (lowerA > lowerB ? 1 : 0);
        }
    }

    // Apply filter & sort
    let filteredLibrary = filterBooks();
    let sortedLibrary = sortBooks(filteredLibrary);
    
    // Creating book cards
    const bookCardContainer = document.querySelector('.book-card-container');
    bookCardContainer.textContent = ''; //Clears out old display
    let bookCardElements = []; //Clears out old list
    const createBookCards = (function () {
        //Creates book card for each book in sortedLibrary 
        for (let i = 0; i < sortedLibrary.length; i++) {
            //create book card elements
            const bookCard = document.createElement("div");
            bookCard.classList.add('book-card');
            bookCard.setAttribute('data-book-index', i);
            bookCardContainer.appendChild(bookCard);
                
            const bookCardLeft = document.createElement("div");
            bookCardLeft.classList.add('book-card-left');
            bookCard.appendChild(bookCardLeft);
            
            const titleOutput = document.createElement('p');
            titleOutput.textContent = sortedLibrary[i].title;
            bookCardLeft.appendChild(titleOutput);

            const authorOutput = document.createElement('p');
            authorOutput.textContent = "By " + sortedLibrary[i].author;
            bookCardLeft.appendChild(authorOutput);

            const bookCardRight = document.createElement("div");
            bookCardRight.classList.add('book-card-right');
            bookCard.appendChild(bookCardRight);

            const pagesOutput = document.createElement('p');
            pagesOutput.textContent = sortedLibrary[i].pagesRead + " / " + sortedLibrary[i].pages + " pages";
            bookCardRight.appendChild(pagesOutput);

            const progress = document.createElement('progress');
            progress.classList.add('progress');
            progress.value = (sortedLibrary[i].pagesRead / sortedLibrary[i].pages) * 100;
            progress.max = 100;
            if (progress.value == 100) {
                progress.classList.add('progress-done');
            }
            bookCardRight.appendChild(progress);

            const progressCircle = document.createElement('progressCircle');
            progressCircle.classList.add('progress-circle');
            if (progress.value == 100) {
                progressCircle.classList.add('progress-circle-done');
            } else if (progress.value == 0) {
                progressCircle.classList.remove('progress-circle-done');
                progressCircle.classList.add('progress-circle-toRead');
            }
            bookCardRight.appendChild(progressCircle);

            // Store the book card element in the array
            bookCardElements.push(bookCard);
        }
        // Apply ev. listeners to each book card for viewing & editing
        bookCardElements.forEach((bookCard, index) => {
            bookCard.addEventListener('click', function () {
                
                // Perform actions when the book card is clicked
                console.log('Book card clicked:', myLibrary[index].title);

                // Fill form based on bookCardElement data
                titleInput.value = myLibrary[index].title
                authorInput.value = myLibrary[index].author
                pagesInput.value = myLibrary[index].pages
                pagesReadInput.value = myLibrary[index].pagesRead
                notesInput.value = myLibrary[index].notes


                currentBook = myLibrary[index];
                currentBookIndex = index;

                editingBook = true;

                openModal();
            });
        });
    })();

    // Apply view
    const applyView = (function () {
        const bookCard = document.querySelectorAll('.book-card');
        const bookCardLeft = document.querySelectorAll('.book-card-left');
        const bookCardRight = document.querySelectorAll('.book-card-right');
        const progress = document.querySelectorAll('.progress');
        const progressCircle = document.querySelectorAll('.progress-circle');
        const paragraphs = document.getElementsByTagName('p');

        if (currentView === "book-cards-view") {
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
            progress.forEach((progress) => {
                progress.style.display = "block";
            });
            progressCircle.forEach((circle) => {
                circle.style.display = "none";
            });

        } else if (currentView === "list-view") {
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
            progress.forEach((progress) => {
                progress.style.display = "none";
            });
            progressCircle.forEach((circle) => {
                circle.style.display = "block";
            });
        }
    })();
}