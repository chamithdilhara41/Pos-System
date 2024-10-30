import customerModel from "../models/customerModel.js";

//Customers array
let customers =[];

const loadCustomersTable = () =>{
    $("#customerTbody").empty();

    console.log(customers);

    customers.map((item,index) =>{
        console.log(item);
        let data = `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.mobile}</td><td>${item.email}</td><td>${item.address}</td></tr>`;
        $("#customerTbody").append(data);
    });
}

$("#customer-add-btn").on("click", function() {
    console.log("clicked add customer button");

    let name = $('#name').val();
    let mobile = $('#mobileNumber').val();
    let email = $('#email').val();
    let address = $('#cus-address').val();

    console.log(name, mobile, address, mobile);

    let customer = new customerModel(customers.length+1,name, mobile, email,address);

    customers.push(customer);

    cleanForm();

    Swal.fire({
        position: "center",
        icon: "success",
        title: "Customer has been saved",
        showConfirmButton: false,
        timer: 1500
    });

    loadCustomersTable();

});

$("#viewCustomers").on("click", function() {
    loadCustomersTable();
});

let selected_customer_index;

/*get customer data to console*/
$("#customerTbody").on("click", "tr",function() {
    let index = $(this).index();
    selected_customer_index = index;
    let customer = customers[index];
    console.log(customers);

    $("#name").val(customer.name);
    $("#email").val(customer.email);
    $("#mobileNumber").val(customer.mobile);
    $("#cus-address").val(customer.address);

});

const cleanForm = () => {
    $("#firstName").val("");
    $("#lastName").val("");
    $("#email").val("");
    $("#mobile").val("");
    $("#address").val("");
};