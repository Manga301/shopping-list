const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

// add item function
function addItem(e){
    e.preventDefault();

    let newItem = itemInput.value;

    // validate input - check if there's anything in the input field
    if(newItem === ""){
        alert("Please add an item");
        return;
    }

    // create a list item
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(newItem));
    
    const button = createButton("remove-item btn-link text-red");
    li.appendChild(button);
    
    itemList.appendChild(li);

    // clear input field
    newItem = "";
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

// event listeners
itemForm.addEventListener("submit", addItem);