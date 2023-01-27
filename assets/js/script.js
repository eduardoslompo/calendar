const currentMonthYear = document.querySelector(".currentMonthYear");
const days = document.querySelector(".days");
const icons = document.querySelectorAll(".icons span");

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    currentMonthYear.innerHTML = `${months[month]} ${year}`; // render the date to top of calendar

    let liTag = "";
    let firstDayMonth = new Date(year, month, 1).getDay(); // get the first day of the month
    let lastDateMonth = new Date(year, month + 1, 0).getDate(); // get the last date of the month
    let lastDayMonth = new Date(year, month, lastDateMonth).getDay(); // get the last day of the month
    let lastDateOfLastMonth = new Date(year, month, 0).getDate(); // get the last date of the last month

    for (let i = firstDayMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateMonth; i++) {
        let today = i === date.getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${today}">${i}</li>`;
    }

    for (let i = lastDayMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayMonth + 1}</li>`;
    }

    days.innerHTML = liTag;
}
renderCalendar();

const newCalendar = () => {
    if (month < 0 || month > 11) {
        date = new Date(year, month);
        year = date.getFullYear();
        month = date.getMonth();
    } else {
        date = new Date();
    }
}

icons.forEach(icon => {
    icon.addEventListener('click', () => {
        month = icon.id === "prev" ? month - 1 : month + 1;
        newCalendar();
        renderCalendar();
    });
});

// Render new calendar utilizing arrows in keyboard
document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") {
        month = month - 1;
        newCalendar();
        renderCalendar();
    } else if (e.key === "ArrowRight") {
        month = month + 1;
        newCalendar();
        renderCalendar();
    }
});