const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const filter = document.getElementById("filter");

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

    // check UI state
    checkUI()

    // clear input field
    newItem.value = "";
    
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

// remove items from the list
function removeItem(e){
    const items = itemList.querySelectorAll("li");

    if (e.target.parentElement.classList.contains("remove-item")){
        if(confirm("Are you sure?")){
            
            e.target.parentElement.parentElement.remove();
            // check UI state
            checkUI()
        } 
    }
}

// remove all the items
function clearItems(e){
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }
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

// event listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);

checkUI();