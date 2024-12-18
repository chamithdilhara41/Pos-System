import itemModel from '../models/itemModel.js';
import {customers, items} from "../db/database.js";

//items array
let selected_item_index;

$("#items-nav").on("click",function () {
    loadItemsTable();
});

const loadItemsTable = () =>{
    $("#itemTbody").empty();

    console.log("item "+items);

    items.map((item,index) =>{
        console.log(item);
        let data = `<tr><td>${item.itemCode}</td><td>${item.itemName}</td><td>${item.unitPrice}</td><td>${item.qty}</td><td>${item.description}</td></tr>`;
        $("#itemTbody").append(data);
    });
}

const validateUnitPrice = (unit_price) => {
    const unitPriceRegex = /^[0-9]+(\.[0-9]{1,2})?$/;
    return unitPriceRegex.test(unit_price);
}
const validateQTY = (qty) => {
    const sriLankanQTYRegex = /^[0-9]+$/;
    return sriLankanQTYRegex.test(qty);
}

$("#item-add-btn").on("click", function() {
    console.log("clicked add item button");

    let item_name = $('#itemName').val();
    let unit_price = $('#unitPrice').val();
    let qty = $('#itemQTY').val();
    let description = $('#description').val();

    if (item_name.length===0) {
        alert("fill item name ");
    }else if (!validateUnitPrice(unit_price)) {
        alert("not valid Price ");
    }else if (!validateQTY(qty)) {
        alert("not valid Quantity ");
    }else if (description.length===0) {
        alert("fill description ");
    }else {
        console.log(item_name, unit_price, qty, description);

        let item = new itemModel(items.length+1,item_name, unit_price, qty,description);

        items.push(item);

        console.log(items);

        loadItemsTable();

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Item has been saved",
            showConfirmButton: false,
            timer: 1500
        });
    }

});


$('#item-update-btn').on("click", function() {
    let index = selected_item_index;

    let item_name = $('#itemName').val();
    let unit_price = $('#unitPrice').val();
    let qty = $('#itemQTY').val();
    let description = $('#description').val();

    console.log(item_name, unit_price, qty, description);

    let item = new itemModel(index+1,item_name, unit_price, qty,description);

    items[index]=(item);

    loadItemsTable();

    Swal.fire({
        position: "center",
        icon: "success",
        title: "Item has been updated",
        showConfirmButton: false,
        timer: 1500
    });
});


$("#item-search-btn").on("click", function() {
    let searchName = $('#itemNameSearch').val().toLowerCase().trim();
    let searchId = $('#itemCode').val().trim();

    // Check if both search inputs are empty
    if (!searchName && !searchId) {
        alert("Please enter a item name or item code to search.");
        return;
    }

    let matchedItems = [];

    // Search by ID if an ID is entered
    if (searchId) {
        matchedItems = items.filter(item => item.itemCode.toString() === searchId);
    }
    // Otherwise, search by name if a name is entered
    else if (searchName) {
        matchedItems = items.filter(item =>
            item.itemName.toLowerCase().includes(searchName)
        );
    }

    // Check if any customers match the search term
    if (matchedItems.length === 0) {
        alert("No item found with that name or Code.");
        return;
    }

    // If only one customer is found, populate the form fields with their details
    if (matchedItems.length === 1) {
        let item = matchedItems[0];
        $("#itemCode").val(item.itemCode);
        $("#itemName").val(item.itemName);
        $("#itemNameSearch").val(item.itemName);
        $("#unitPrice").val(item.unitPrice);
        $("#itemQTY").val(item.qty);
        $("#description").val(item.description);
        alert("item found");
    } else {
        // If multiple customers are found, display them in the table
        $("#itemTbody").empty();
        matchedItems.forEach(item => {
            let data = `<tr><td>${item.itemCode}</td><td>${item.itemName}</td><td>${item.unitPrice}</td><td>${item.qty}</td><td>${item.description}</td></tr>`;
            $("#itemTbody").append(data);
        });
    }
});

$("#item-delete-btn").on("click", function() {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            items.splice(selected_item_index,1); //delete Item
            cleanForm();

            loadItemsTable();
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
            });
        }
    });

})

$("#itemTbody").on("click", "tr",function() {
    let index = $(this).index();
    selected_item_index = index;

    let item = items[index];
    console.log(item);
    $("#itemCode").val(index+1);
    $("#itemNameSearch").val(item.itemName);
    $("#itemName").val(item.itemName);
    $("#unitPrice").val(item.unitPrice);
    $("#itemQTY").val(item.qty);
    $("#description").val(item.description);

});

$("#item-clear-btn").on("click", function() {
    cleanForm();
});

const cleanForm = () => {
    $("#itemName").val("");
    $("#unitPrice").val("");
    $("#itemNameSearch").val("");
    $("#itemCode").val("");
    $("#description").val("");
    $("#itemQTY").val("");
};