


//Available theme stylesheets
const theme1 = document.getElementById('theme1');
const theme2 = document.getElementById('theme2');
const theme3 = document.getElementById('theme3');
const theme4 = document.getElementById('theme4');

//Main page elements
const bookModal = document.querySelector('.book-modal');
const overlay = document.querySelector('.overlay');
const form = document.querySelector('.bookInfo-form');

//Main buttons
const addBookBtn = document.querySelector('.add-book-btn');





const initializePage = (function () {
    const setDefaultTheme = (function () {
        theme1.disabled = false;
        theme2.disabled = true;
        theme3.disabled = true;
        theme4.disabled = true;
    }());
})();

addBookBtn.addEventListener('click', function () {
    openModal();
    function openModal(){
        bookModal.style.display = 'block';
        overlay.style.display = 'block';
    }
});

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

    viewOptions.forEach(option => {
        option.addEventListener('click', function () {
            switchView(option);
        });
        function switchView(option) {
            //Unselect options
            viewOptions.forEach(option => {
                option.classList.remove('option-selected');
            })
            //Select option
            option.classList.add('option-selected');

            if (option.id === 'book-cards-view') {  
                console.log(option.id);
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

            } else if (option.id === 'list-view') {
                console.log(option.id);
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
        }
    });
})();

const modalBtns = (function () {
    const submitBtn = document.getElementById('submit-btn')
    const cancelBtn = document.getElementById('cancel-btn');
    const deleteBtn = document.getElementById('delete-btn');
    
})();





