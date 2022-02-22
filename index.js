console.log("This javascript file ran.")
btnAdd = document.getElementById('btn-add');
console.log(btnAdd);
function UpdateList(){

    console.log("Event listener applied on button");
    tit = document.getElementById('tit').value;
    console.log("tit: ", tit);
    desc = document.getElementById('desc').value;
    console.log("desc: ", desc);
    if (localStorage.getItem('ItemsJson') == null) {
        // declaring array to store entered information
        itemsJsonArray = [];
        // inputing the elements to the array i.e title and desription
        itemsJsonArray.push([tit], [desc]);
        // converting objects of array to string
        localStorage.setItem('ItemsJson', JSON.stringify(itemsJsonArray));
    }
    else {
        itemsJsonArrayStr = localStorage.getItem('ItemsJson');
        itemsJsonArray = JSON.parse(itemsJsonArrayStr);
        itemsJsonArray.push([tit, desc]);
        console.log(itemsJsonArray);
        localStorage.setItem('ItemsJson', JSON.stringify(itemsJsonArray));

    }
    update();
}
function update() {
    if (localStorage.getItem('ItemsJson') == null) {
        // declaring array to store entered information
        itemsJsonArray = [];
        // converting objects of array to string
        localStorage.setItem('ItemsJson', JSON.stringify(itemsJsonArray));
    }
    else {
        itemsJsonArrayStr = localStorage.getItem('ItemsJson');
        itemsJsonArray = JSON.parse(itemsJsonArrayStr);
    }

    // updtaing the table
    let tableBody = document.getElementById('tableBody');
    let str = "";
    itemsJsonArray.forEach((element, index) => {
        str += `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td><button class="btn btn-primary" onclick=deleted(${index})>Delete</button></td>
          </tr>`
    });
    tableBody.innerHTML = str;
}
btnAdd.addEventListener("click", UpdateList);
function deleted(item){
    // fetching elements
    itemsJsonArrayStr = localStorage.getItem('ItemsJson');
    itemsJsonArray = JSON.parse(itemsJsonArrayStr);
    // deleting items from an array
    itemsJsonArray.splice(item,1);
    localStorage.setItem('ItemsJson', JSON.stringify(itemsJsonArray));
    update();
}
// for clearing the whole list
function clearStorage(){
    console.log("Clearing the storage");
    localStorage.clear();
    update();
}