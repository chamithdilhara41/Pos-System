import { customers, items, orders } from "../db/database.js";

console.log("Orders Data:", orders);

$("#home-nav").on("click", function () {
    loadOrdersTable();
    updatePieChart();
});

const loadOrdersTable = () => {
    $('#orderTbody').empty();  // Clear the table before adding new rows

    // Outer loop for the orders array (assuming orders is an array of arrays)
    for (let i = 0; i < orders.length; i++) {
        // Inner loop for the first element inside orders (i.e., orders[0] if it's an array of arrays)
        for (let j = 0; j < orders[i].length; j++) {
            let order = orders[i][j]; // Accessing individual order from the inner array
            console.log(order); // Log the order for debugging

            // Generate the HTML for each row
            let data =`
                <tr>
                    <td>${order.orderId}</td>
                    <td>${order.orderItemName}</td>
                    <td>${order.orderQTY}</td>
                    <td>${order.orderUnitPrice}</td>
                    <td>${order.orderTotal}</td>
                </tr>`
            ;

            // Append the generated HTML to the table body
            $("#orderTbody").append(data);
        }
    }
};

// Function to dynamically generate colors for the pie chart
const generateColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
        const hue = Math.floor((i / count) * 360); // Distribute hues evenly
        colors.push(`hsl(${hue}, 70%, 60%)`);
    }
    return colors;
};

let itemQuantityChart = null; // Global variable to track the Chart.js instance

const updatePieChart = () => {
    const items_chart = [];

    // Assuming items is an array of objects
    items.forEach(item => {
        items_chart.push({
            name: item.itemName,
            qty: parseFloat(item.qty) // Ensure qty is parsed as a float
        });
    });

    console.log("Items Chart Data:", items_chart);

    // Destroy the existing chart instance if it exists
    if (itemQuantityChart) {
        itemQuantityChart.destroy();
    }

    // Calculate total quantity
    const totalQty = items_chart.reduce((sum, item) => sum + item.qty, 0);

    // Prepare data for the chart
    const chartData = items_chart.map(item => item.qty);
    const colors = generateColors(items_chart.length);

    // Chart.js configuration
    const ctx = document.getElementById('itemQuantityChart').getContext('2d');
    itemQuantityChart = new Chart(ctx, {
        type: 'pie', // Pie chart type
        data: {
            labels: items_chart.map(item => item.name), // Labels for each section
            datasets: [{
                data: chartData, // Data for the chart
                backgroundColor: colors, // Dynamically generated colors
                hoverOffset: 4 // Hover effect on segments
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            const total = tooltipItem.raw;
                            const percentage = ((total / totalQty) * 100).toFixed(2) + '%';
                            return tooltipItem.label + ': ' + total + ' (' + percentage + ')';
                        }
                    }
                }
            }
        }
    });

    // Clear previous list items
    const quantityList = document.getElementById('quantityList');
    quantityList.innerHTML = '';

    // Populate the list with item quantities
    items_chart.forEach((item, index) => {
        const listItem = document.createElement('li');
        const color = colors[index % colors.length]; // Assign colors cyclically
        listItem.innerHTML = `<span style="color: ${color};">&#9632;</span> ${item.qty} (${item.name})`;
        quantityList.appendChild(listItem);
    });
};

// On document ready, load the table and chart
$(document).ready(function () {
    console.log("Items Array:", items); // Log items for debugging
    loadOrdersTable(); // Load the orders into the table
    updatePieChart(); // Render the pie chart
});

document.addEventListener('DOMContentLoaded', () => {
    // On DOM content loaded, update the chart and table
    loadOrdersTable();
    updatePieChart();
});
