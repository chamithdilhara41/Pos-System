//Customers array
let customers =[];

const loadCustomersTable = () =>{
    $("#customerTbody").empty();

    console.log(customers);

    customers.map((item,index) =>{
        console.log(item);
        let data = `<tr><td>${item.id}</td><td>${item.first_name}</td><td>${item.last_name}</td><td>${item.mobile}</td><td>${item.email}</td><td>${item.address}</td></tr>`;
        $("#customerTbody").append(data);
    });
}

$("#add-btn").on("click", function() {
    console.log("clicked add customer button");

    let first_name = $('#firstName').val();
    let last_name = $('#lastName').val();
    let mobile = $('#mobileNumber').val();
    let email = $('#email').val();
    let address = $('#cus-address').val();

    console.log(first_name, last_name, mobile, address, mobile);

    let customer ={
        id:customers.length + 1,
        first_name: first_name,
        last_name: last_name,
        mobile: mobile,
        email: email,
        address: address,
    }

    customers.push(customer);

    loadCustomersTable();

});

$("#viewCustomers").on("click", function() {
    loadCustomersTable();
})