import customerModel from "../models/customerModel.js";
import itemModel from "../models/itemModel.js";
import orderModel from "../models/orderModel.js";

import { customers, items , orders} from "../db/database.js";

console.log(customers);
console.log(items);

$("#orders-nav").on("click", function(){
    populateCustomerDropdown();
    populateItemDropdown();
    populateMobileDropdown();
    generateOrderId();
    setDate();
});
function setDate() {
    const today = new Date().toISOString().split("T")[0];
    $("#date").val(today);
}

function generateOrderId() {
    $("#orderId").val(orders.length+1);
}

function populateCustomerDropdown() {
    // Clear existing options and add the default option
    $("#customerIdOrder").empty().append('<option value="">Select Customer ID</option>');

    // Loop through each customer and create an option element
    customers.forEach(customer => {
        $("#customerIdOrder").append(
            $('<option>', {value: customer.id, text: customer.id})
        );
    });
}

function populateItemDropdown() {
    // Clear existing options and add the default option
    $("#itemCodeOrder").empty().append('<option value="">Select Item Code</option>');

    // Loop through each customer and create an option element
    items.forEach(item => {
        $("#itemCodeOrder").append(
            $('<option>', {value: item.itemCode,text: item.itemCode})
        );
    });
}

function populateMobileDropdown() {
    // Clear existing options and add the default option
    $("#mobileNumberOrder").empty().append('<option value="">Select Mobile No,</option>');

    // Loop through each customer and create an option element
    customers.forEach(item => {
        $("#mobileNumberOrder").append(
            $('<option>', {value: item.mobile,text: item.mobile})
        );
    });
}


$("#customerIdOrder").on("change", function () {
    const selectedId = $(this).val();
    console.log("Selected ID:", selectedId);

    const customer = customers.find(item => item.id?.toString() === selectedId);

    if (customer) {
        $("#customerNameOrder").val(customer.name);
        $("#mobileNumberOrder").val(customer.mobile);
        $("#emailOrder").val(customer.email);
        $("#addressOrder").val(customer.address);
    } else {
        $("#customerNameOrder").val("");
        $("#mobileNumberOrder").val("");
        $("#emailOrder").val("");
        $("#addressOrder").val("");
    }
});

$("#mobileNumberOrder").on("change", function () {
    const selectedMobile = $(this).val();
    console.log("selected Mobile:", selectedMobile);

    const customer = customers.find(item => item._mobile?.toString() === selectedMobile);

    if (customer) {
        $("#customerIdOrder").val(customer.id);
        $("#customerNameOrder").val(customer.name);
        $("#emailOrder").val(customer.email);
        $("#addressOrder").val(customer.address);
    } else {
        $("#customerIdOrder").val("");
        $("#customerNameOrder").val("");
        $("#emailOrder").val("");
        $("#addressOrder").val("");
    }
});

$("#itemCodeOrder").on("change", function () {
    const selectedCode = $(this).val();
    console.log("selected Mobile:", selectedCode);

    const item = items.find(item => item.itemCode?.toString() === selectedCode);

    if (item) {
        $("#itemNameOrder").val(item.itemName);
        $("#price").val(item.unitPrice);
        $("#qty").val(item.qty);
    } else {
        $("#itemNameOrder").val("");
        $("#price").val("");
        $("#qty").val("");
        $("#orderQty").val("");
    }
});

let cart = [];

$("#addItemCart").on("click", function() {

    // Get input values
    let orderId = $("#orderId").val();
    let orderItemName = $("#itemNameOrder").val();
    let orderQTY = $("#orderQty").val();
    let orderUnitPrice = $("#price").val();
    let orderTotal = orderUnitPrice * orderQTY;
    let date = $("#date").val();
    let cusName = $("#customerNameOrder").val();
    let cusContact = $("#mobileNumberOrder").val();

    // Validation (example for quantity)
    if (orderQTY.length === 0 || isNaN(orderQTY)) {
        alert("Please enter a valid order quantity.");
        return;
    }
    if (orderQTY.length===0){
        alert("fill Order Quantity");
        return;
    }

    if (parseInt(orderQTY) >= parseInt($("#qty").val())) {
        alert("Please enter a valid order quantity.");
        return;
    }

    let itemIndex = items.findIndex(item => item.itemName === orderItemName);
    if (itemIndex !== -1) {

        let oldQty = parseInt(items[itemIndex].qty);
        items[itemIndex].qty= oldQty-orderQTY;

    } else {
        console.log("Item not found.");
    }

    const cartObj = {
        orderId: orderId,
        orderItemName: orderItemName,
        orderQTY: orderQTY,
        orderUnitPrice: orderUnitPrice,
        orderTotal: orderTotal,
        date: date,
        cusName: cusName,
        cusContact: cusContact
    };

    cart.push(cartObj);

    // Create a row with the input values
    let newRow = `
        <tr>
            <td>${orderId}</td>
            <td>${orderItemName}</td>
            <td>${orderQTY}</td>
            <td>${orderUnitPrice}</td>
            <td>${orderTotal}</td>
        </tr>
    `;

    // Append the new row to the table body
    $("#orderCartTbody").append(newRow);

    // Calculate and display the net total
    let netTotal = cart.reduce((sum, item) => sum + item.orderTotal, 0);
    $("#lblTotal").text(netTotal.toFixed(2));

});

document.getElementById("discount").addEventListener('input', function (event) {
    let total = parseFloat($('#lblTotal').text()) || 0;
    let discountPercentage = parseFloat(event.target.value) || 0;

    // Calculate subtotal after discount
    let subTotal = total - (total * discountPercentage / 100);
    $('#lblSubTotal').text(subTotal.toFixed(2));
});

document.getElementById("cash").addEventListener('input', function (event) {
    let total = parseFloat($('#lblSubTotal').text()) || 0;
    let cashAmount = parseFloat(event.target.value) || 0;

    // Calculate balance
    let balance = cashAmount - total;
    $('#balance').val(balance.toFixed(2));
});

function clear() {
    // Clear all input fields
    $("#orderId").val("");
    $("#itemNameOrder").val("");
    $("#orderQty").val("");
    $("#price").val("");
    $("#qty").val("");
    $("#customerIdOrder").val("");
    $("#customerNameOrder").val("");
    $("#mobileNumberOrder").val("");
    $("#emailOrder").val("");
    $("#addressOrder").val("");

    // Reset dropdowns to their default option
    $("#customerIdOrder").prop("selectedIndex", 0);
    $("#itemCodeOrder").prop("selectedIndex", 0);
    $("#mobileNumberOrder").prop("selectedIndex", 0);

    // Clear the order cart table body
    $("#orderCartTbody").empty();

    // Reset the net total, subtotal, and balance
    $("#lblTotal").text("0.00");
    $("#lblSubTotal").text("0.00");
    $("#balance").val("");

    // Clear the discount and cash input fields
    $("#discount").val("");
    $("#cash").val("");

    // Clear the cart array
    cart = [];
}


$("#purchase").on("click", function () {

    if (cart.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Empty Cart',
            text: 'Please add items to the cart before purchasing.',
        });
        return;
    }else {
        Swal.fire({
            icon: 'success',
            title: 'Order Placed!',
            text: 'Your order has been successfully placed.',
            showConfirmButton: true,
            confirmButtonText: 'OK',
        });
        orders.push(cart);
        clear();
        generateOrderId();
    }
    console.log(cart);
    console.log(orders)
})