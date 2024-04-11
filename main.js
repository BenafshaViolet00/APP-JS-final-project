//create list array for storage

let list = [];
let listFromStorage = localStorage.getItem("list"); 
if (listFromStorage) {
    list = JSON.parse(listFromStorage);
    for (let i = 0; i < list.length; i++) {
        let currentItem = list[i];

        let color = "";
        if( currentItem.Dropdown === 'Dry goods') {
            color = 'bg-purple-200';
        }
        else if(currentItem.Dropdown === 'Dairy') {
            color = 'bg-blue-100'
        }
        else if(currentItem.Dropdown === 'Meat') {
            color = 'bg-red-400'
        }

    
        let htmlString = `
        <li class="border-b border-gray-200 border-solid py-2.5">
        <span>➡️</span>
                ${currentItem.name}
                <span class="rounded-full text-md px-3 text-grey-600 py-1 ${color}">${currentItem.Dropdown}</span>
            </li>
        `;

        // Add the htmlstring into the parent
        document.querySelector("#list-items").innerHTML += htmlString;

    }
}

document.querySelector("#form").addEventListener("submit", function(event) {
    event.preventDefault();
    add();
});

document.querySelector("#list-items").addEventListener("click", function(e) {
    if (e.target.tagName === "SPAN") {
        console.log("clicked on emoji");
        let listItem = e.target.parentNode;

        // removing the element from listitem
        let children = listItem.parentNode.children;
        let childrenArray = Array.from(children);
        let index = childrenArray.indexOf(listItem);
        list.splice(index, 1);
        let jsonString = JSON.stringify(list);
        localStorage.setItem("list", jsonString);
        listItem.remove();
    
    }
});
//function for validating input
function isValidated() {
    let isValid = false;
    let item = document.querySelector("#item").value.trim();
    let Dropdown = document.querySelector("#dropdown").value.trim();

    if (item.length <= 0 && Dropdown.length <= 0) {
        document.querySelector("#item").classList.add("border-pink-600");
        document.querySelector("#dropdown").classList.add("border-pink-600");
    } else if (item.length <= 0) {
        document.querySelector("#item").classList.add("border-pink-600");
        document.querySelector("#dropdown").classList.remove("border-pink-600");
    } else if (Dropdown.length <= 0) {
        document.querySelector("#dropdown").classList.add("border-pink-600");
        document.querySelector("#item").classList.remove("border-pink-600");
    } else {
        document.querySelector("#item").classList.remove("border-pink-600");
        document.querySelector("#dropdown").classList.remove("border-pink-600");
        isValid = true;
    }
    return isValid;
}
//create add function
function add() {
    if (isValidated()) {
        let item = document.querySelector("#item").value.trim();
        let Dropdown = document.querySelector("#dropdown").value.trim();
        let color = "";

        if (Dropdown === 'Dry goods') {
            color = 'bg-purple-200';
        } else if (Dropdown === 'Dairy') {
            color = 'bg-blue-100';
        } else if (Dropdown === 'Meat') {
            color = 'bg-red-400';
        }
//declare newitems
        let newItem = {
            name: item,
            Dropdown: Dropdown,
        };
        list.push(newItem);

        let jsonString = JSON.stringify(list);

        localStorage.setItem("list", jsonString);

        let htmlString = `
        <li class="border-b border-gray-200 border-solid py-2.5">
        <span>➡️</span>
            ${item}
            <span class="rounded-full text-md px-3 text-grey-600 py-1 ${color}">${Dropdown}</span>
        </li>
        `;

        document.querySelector("#list-items").innerHTML += htmlString;

        document.querySelector("#item").value = "";
        document.querySelector("#dropdown").value = "";
    } else {
        console.log("Invalid inputs");
    }
}
