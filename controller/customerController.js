import customerModel from "../models/customerModel.js";
import {customers, orders} from "../db/database.js";

//Customers array
let selected_customer_index;

$("#customers-nav").on("click", function () {
    loadCustomersTable();
});

const loadCustomersTable = () =>{
    $("#customerTbody").empty();

    console.log(customers);

    customers.map((item,index) =>{
        console.log(item);
        let data = `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.mobile}</td><td>${item.email}</td><td>${item.address}</td></tr>`;
        $("#customerTbody").append(data);
    });
}

const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}
const validateMobile = (mobile) => {
    const sriLankanMobileRegex = /^(?:\+94|0)?7[0-9]{8}$/;
    return sriLankanMobileRegex.test(mobile);
}

$("#customer-add-btn").on("click", function() {
    console.log("clicked add customer button");

    let name = $('#name').val();
    let mobile = $('#mobileNumber').val();
    let email = $('#email').val();
    let address = $('#cus-address').val();

    if (name.length===0) {
        alert("fill name ");
    }else if (!validateMobile(mobile)) {
        alert("not valid mobile number ");
    }else if (!validateEmail(email)) {
        alert("not valid email ");
    }else if (address.length===0) {
        alert("fill address ");
    }else {
        console.log(name, mobile, address, mobile);

        let customer = new customerModel(customers.length+1,name, mobile, email,address);

        customers.push(customer);

        cleanForm();

        loadCustomersTable();

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Customer has been saved",
            showConfirmButton: false,
            timer: 1500
        });
    }
});

$('#customer-update-btn').on("click", function() {
    let index = selected_customer_index;

    let name = $('#name').val();
    let mobile = $('#mobileNumber').val();
    let email = $('#email').val();
    let address = $('#cus-address').val();

    console.log(index,name, mobile, address, mobile);

    let customer = new customerModel(index+1, name, mobile, email, address);

    customers[index]=(customer);

    cleanForm();

    loadCustomersTable();

    Swal.fire({
        position: "center",
        icon: "success",
        title: "Customer has been updated",
        showConfirmButton: false,
        timer: 1500
    });
});

$("#customer-search-btn").on("click", function() {
    let searchName = $('#customerName').val().toLowerCase().trim();
    let searchId = $('#customerId').val().trim();

    // Check if both search inputs are empty
    if (!searchName && !searchId) {
        alert("Please enter a customer name or ID to search.");
        return;
    }

    let matchedCustomers = [];

    // Search by ID if an ID is entered
    if (searchId) {
        matchedCustomers = customers.filter(customer => customer.id.toString() === searchId);
    }
    // Otherwise, search by name if a name is entered
    else if (searchName) {
        matchedCustomers = customers.filter(customer =>
            customer.name.toLowerCase().includes(searchName)
        );
    }

    // Check if any customers match the search term
    if (matchedCustomers.length === 0) {
        alert("No customer found with that name or ID.");
        return;
    }

    // If only one customer is found, populate the form fields with their details
    if (matchedCustomers.length === 1) {
        let customer = matchedCustomers[0];
        $("#name").val(customer.name);
        $("#customerName").val(customer.name);
        $("#email").val(customer.email);
        $("#mobileNumber").val(customer.mobile);
        $("#cus-address").val(customer.address);
        alert("customer found");
    } else {
        // If multiple customers are found, display them in the table
        $("#customerTbody").empty();
        matchedCustomers.forEach(customer => {
            let data = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.mobile}</td><td>${customer.email}</td><td>${customer.address}</td></tr>`;
            $("#customerTbody").append(data);
        });
    }
});

$("#customer-delete-btn").on("click", function() {

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
            customers.splice(selected_customer_index,1); //delete customer
            cleanForm();

            loadCustomersTable();
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

});

/*get customer data to console*/
$("#customerTbody").on("click", "tr",function() {
    let index = $(this).index();
    selected_customer_index = index;

    let customer = customers[index];
    console.log(customers);
    $("#customerId").val(index+1);
    $("#customerName").val(customer.name);
    $("#name").val(customer.name);
    $("#email").val(customer.email);
    $("#mobileNumber").val(customer.mobile);
    $("#cus-address").val(customer.address);

});

$("#clear-btn").on("click", function() {
    cleanForm();
});

const cleanForm = () => {
    $("#name").val("");
    $("#email").val("");
    $("#mobileNumber").val("");
    $("#cus-address").val("");
    $("#customerId").val("");
    $("#customerName").val("");
};