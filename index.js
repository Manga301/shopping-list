const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const filter = document.getElementById("filter");

// display items
function displayItems(){
    const itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.forEach(item => addItemToDOM(item));

    checkUI();
}

// add item
function onAddItemSubmit(e){
    e.preventDefault();

    let newItem = itemInput.value;

    // validate input - check if there's anything in the input field
    if(newItem === ""){
        alert("Please add an item");
        return;
    }

    // item DOM element
    addItemToDOM(newItem);

    // add to localStorage
    addItemToStorage(newItem);

    // check UI state
    checkUI()

    // clear input field
    itemInput.value = "";

    
}

// display items on the DOM
function addItemToDOM(item){

    // create a list item
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(item));
    
    const button = createButton("remove-item btn-link text-red");
    li.appendChild(button);
    
    itemList.appendChild(li);

}

// add item to localStorage
function addItemToStorage(item){
    const itemsFromStorage = getItemsFromStorage();

    // add new item to the list
    itemsFromStorage.push(item);

    // convert to JSON string and set to localStorage
    localStorage.setItem("item", JSON.stringify(itemsFromStorage));

}

// form button 
function createButton(classes){
    const button = document.createElement("button");
    button.className = classes;
    const icon = createIcon("fa-solid fa-xmark");
    button.appendChild(icon);

    return button;
}

// button icon
function createIcon(classes){
    const icon = document.createElement("i");
    icon.className = classes;
    return icon;
}


function onClickItem(e){
    
    if (e.target.parentElement.classList.contains("remove-item")){
        removeItem(e.target.parentElement.parentElement);
    }
    
}

// remove items from the list
function removeItem(item){

    if(confirm("Are you sure?")){
        // remove item from DOM
        item.remove();

        // remove item from storage
        removeItemFromStorage(item.textContent);

        checkUI();
    }
   
}
3
// remove the item from localStorage
function removeItemFromStorage(item){
    let itemsFromStorage = getItemsFromStorage();

    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    localStorage.setItem("item", JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage(){
    let itemsFromStorage;

    if(localStorage.getItem("item") === null){
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem("item"));
    }

    return itemsFromStorage;
}

// remove all the items
function clearItems(){
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }

    localStorage.removeItem("item");

    checkUI();
}

// filter list items 
function filterItems(e){
    const items = itemList.querySelectorAll("li");
    const text = e.target.value.toLowerCase();

    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();
        
        if(itemName.indexOf(text) != -1){
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }
    });
}


//  check the UI state
function checkUI(){
    const items = itemList.querySelectorAll("li");

    if(items.length === 0){
        clearBtn.style.display = "none";
        filter.style.display = "none";
    } else {
        clearBtn.style.display = "block";
        filter.style.display = "block";
    }
}

// initialize app
function init(){
    // event listeners
    itemForm.addEventListener("submit", onAddItemSubmit);
    itemList.addEventListener("click", onClickItem);
    clearBtn.addEventListener("click", clearItems);
    filter.addEventListener("input", filterItems);
    document.addEventListener("DOMContentLoaded", displayItems);

    checkUI();

}

init();


