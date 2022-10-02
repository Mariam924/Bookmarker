var BookmarkName= document.getElementById('BookmarkName');
var BookmarkCategory= document.getElementById('BookmarkCategory');
var BookmarkURL= document.getElementById('BookmarkURL');

BookmarkContainer= [];
var currentIndex;

if(localStorage.getItem(`Bookmarks`)!=null){
    BookmarkContainer= JSON.parse(localStorage.getItem(`Bookmarks`));
    displayData(BookmarkContainer);
}
else{
    BookmarkContainer= [];
}

/* ----------------------------------------- addBookmark ------------------------------------ */

function addBookmark(){
    if(validateBookmark()){
        var Bookmark={
            name: BookmarkName.value,
            url: BookmarkURL.value,
            category: BookmarkCategory.value,     
        }
        BookmarkContainer.push(Bookmark);
        console.log(Bookmark)
        clearForm();
        displayData(BookmarkContainer);
        localStorage.setItem(`Bookmarks`, JSON.stringify(BookmarkContainer))
    }
    }

/* ----------------------------------------- displayData ------------------------------------ */

function displayData(list){
    var temp=``;
    for(var i=0; i<list.length; i++){

        temp += `<tr>
        <td>${i+1}</td>
        <td>${list[i].name}</td>
        <td>${list[i].category}</td>
        <td></td>
        <td></td>
        <td><a class=\"btn \" href=\"${list[i].url}\" target=\"_blank\"><i class="fa fa-link send" aria-hidden="true"></i></a></td>
        <td><button onclick="update(${i})" class="btn pen-btn btn-sm"><i class="fa-solid fa-pen"></i></button></td>
        <td><button onclick="deleteElement(${i})" class="btn btn-sm trash-btn"><i class="fa fa-trash" aria-hidden="true" class="text-white"></i></button></td>
    </tr> `

    }
    document.getElementById(`myTable`).innerHTML=temp;
}
/* ----------------------------------------- clearForm ------------------------------------ */

function clearForm(){
    BookmarkName.value = "";
    BookmarkCategory.value = "";
    BookmarkURL.value = "";

    BookmarkName.classList.remove('is-valid');
    BookmarkName.classList.remove('is-invalid');

    BookmarkCategory.classList.remove('is-valid');
    BookmarkCategory.classList.remove('is-invalid');

    BookmarkURL.classList.remove('is-valid');
    BookmarkURL.classList.remove('is-invalid');
}

/* ---------------------------------------- deleteElement ------------------------------------ */

function deleteElement(index){
    BookmarkContainer.splice(index, 1);
    localStorage.setItem('Bookmarks', JSON.stringify(BookmarkContainer));

    displayData(BookmarkContainer);
}

/* ---------------------------------------- update ------------------------------------ */

function update(index){

    currentIndex=index;
    document.getElementById('update').classList.replace('d-none','d-inline-block');
    document.getElementById('add').classList.add('d-none');

    BookmarkName.value = BookmarkContainer[index].name;
    BookmarkCategory.value = BookmarkContainer[index].category; 
    BookmarkURL.value = BookmarkContainer[index].url;

}
/* ---------------------------------------- updateBookmark ------------------------------------ */

function updateBookmark(){
    if(validateBookmark()){
    var Bookmark =
    {
        name: BookmarkName.value,
        category: BookmarkCategory.value,
        url: BookmarkURL.value,
    }
    BookmarkContainer[currentIndex]=Bookmark;
    displayData(BookmarkContainer);
    
    localStorage.setItem('Bookmarks', JSON.stringify(BookmarkContainer))

    document.getElementById('add').classList.replace('d-none','d-inline-block');
    document.getElementById('update').classList.replace('d-inline-block', 'd-none');
    clearForm();
}
    
}

/* --------------------------------------------- search ----------------------------------------- */

function search(term){
    var searchContainer = [];

    for(var i=0 ; i<BookmarkContainer.length; i++){
        if(BookmarkContainer[i].name.toLowerCase().includes(term.toLowerCase()) || BookmarkContainer[i].category.toLowerCase().includes(term.toLowerCase())){
            searchContainer.push(BookmarkContainer[i]);
        }
    }
    displayData(searchContainer);
}

/* --------------------------------------- validateBookmark ---------------------------------------- */

/* ----- validatName -----*/

function validateBookmarkName(){
    var regex = /^[A-Za-z 0-9]{4,20} ?$/gm;

    if(regex.test(BookmarkName.value)){

        if(BookmarkName.classList.contains('is-invalid')){
            BookmarkName.classList.replace('is-invalid', 'is-valid');
        }
        return true;
    }
    else{
        BookmarkName.classList.add('is-invalid');
        return false;
    }
}


/* ----- validatCategory -----*/

function validateBookmarkCategory(){
    /* var regex = /^(mobile|tv|laptop)$/; */
    var regex = /^[A-Z]{3,10}$/;

    if(regex.test(BookmarkCategory.value)){

        if(BookmarkCategory.classList.contains('is-invalid')){
            BookmarkCategory.classList.replace('is-invalid', 'is-valid');
        }
        BookmarkCategory.classList.add('is-valid');
        return true;
    }
    else{
        BookmarkCategory.classList.add('is-invalid');
        return false;
    }
}

/* ----- validatDesc -----*/

function validateBookmarkURL(){
    var regex = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

    if(regex.test(BookmarkURL.value)){

        if(BookmarkURL.classList.contains('is-invalid')){
            BookmarkURL.classList.replace('is-invalid', 'is-valid');
        }
        BookmarkURL.classList.add('is-valid');
        return true;
    }
    else{
        BookmarkURL.classList.add('is-invalid');
        return false;
    }

}

/* ----- validatBookmark -----*/

function validateBookmark(){
    if(validateBookmarkName() && validateBookmarkCategory() && validateBookmarkURL()){
        return true;
    }
    else{
        return false;
    }
}

/* ----------------------------------------- lightBox --------------------------------------- */

var login = document.getElementById('sign-in');
var lightBoxContainer = document.getElementById('lightBoxContainer');
var closeBtn = document.getElementById('closeBtn');
var signInGreen = document.getElementById('signInGreen');
var congratsBoxContainer = document.getElementById('congratsBoxContainer');
var twoBoxes = document.getElementById('twoBoxes');

var closeFeedback = document.getElementById('closeFeedback');
var feedbackBoxContainer = document.getElementById('feedbackBoxContainer');
var RateBtn = document.getElementById('RateBtn');


login.addEventListener('click', function(){
    lightBoxContainer.classList.replace('d-none', 'd-flex')
})

RateBtn.addEventListener('click', function(){
    feedbackBoxContainer.classList.replace('d-none', 'd-flex')
})


/* ----------- close ------------ */
function closeSlider(box){
    box.classList.replace('d-flex', 'd-none');
}

closeBtn.addEventListener('click', function(){
    closeSlider(lightBoxContainer);
})
closeFeedback.addEventListener('click', function(){
    closeSlider(feedbackBoxContainer);
})

document.addEventListener('keydown', function(e){

    if(e.key == 'Escape'){
        closeSlider();
    }
})

/* --------------------------------------- References --------------------------------------- */

/*
1) https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url 
2) https://www.w3docs.com/snippets/html/how-to-remove-focus-around-buttons-on-click.html#:~:text=If%20you%20want%20to%20remove,value%20of%20the%20outline%20property.
3) https://stackoverflow.com/questions/3397113/how-to-remove-focus-border-outline-around-text-input-boxes-chrome
4) https://www.geeksforgeeks.org/how-to-insert-a-javascript-variable-inside-href-attribute/
*/