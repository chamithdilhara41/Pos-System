let customers_db =[];

const loadCustomerTable = () => {
    $("#customerTableBody").empty();

    customers_db.map((item, index) =>{
        console.log(item);
        let data = `<tr><td>${item.first_name}</td><td>${item.last_name}</td><td>${item.mobile}</td><td>${item.email}</td><td>${item.address}</td></tr>`
        $("#customerTableBody").append(data);
    })
}

$("#customer_add_btn").on("click", function() {
    console.log("clicked add customer button");

    let first_name = $('#firstName').val();
    let last_name = $('#lastName').val();
    let mobile = $('#mobile').val();
    let email = $('#email').val();
    let address = $('#address').val();

    //customer object
    let customer ={
        id:customers_db.length + 1,
        first_name: first_name,
        last_name: last_name,
        mobile: mobile,
        email: email,
        address: address,
    }

    customers_db.push(customer);

    loadCustomerTable();


    console.log(first_name, last_name, mobile, address, mobile);

});