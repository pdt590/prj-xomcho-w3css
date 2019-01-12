import Vue from 'vue'
/*
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
*/
const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12"
];

const dateFilter = value => {
    return formatDate(value);
};

function formatDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const formattedDate = day + ". " + months[month] + ". " + year;
    return formattedDate;
}

Vue.filter('date', dateFilter)