// Determine if the calucated date is today
function sameDay(date) {
  const today = new Date();

  if (today.getFullYear() == date.getFullYear()
      && today.getDate() == date.getDate()
      && today.getMonth() == date.getMonth()) {
    return true;
  }
}

function dateHeading() {
  const today = new Date();
  const currentDate = document.querySelector("#current-date");
  currentDate.textContent = today.toDateString();
}

// add day name labels to the top of the calendar
function createDayHeadings(calendar) {
  const days = ["S","M", "T", "W", "R", "F", "S"];
  for (i = 0; i <= 6; i++) {
    const div = document.createElement('div');
    div.textContent = days[i];
    calendar.appendChild(div);
  }
}

// pad calendar to properly align days of the week
function padCalendar(calendar, currentYear, currentMonth) {
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  for (i = 0; i < firstDay; i++) {
    const div = document.createElement('div');
    div.textContent = "";
    calendar.appendChild(div);
  }
}

// Populate the calender with the dates
function createDates(calendar, currentYear, currentMonth) {
  let lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
  for (i = 1; i <= lastDay; i++) {
    const date = new Date(currentYear, currentMonth, i);
    const div = document.createElement('div');
    div.textContent = date.getDate();
    if (sameDay(date)) {
      div.classList.add("red");
    }
    calendar.appendChild(div);
  }
}

function createMonthHeading(workingYear, workingMonth, index) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const headingName = `#heading${index}`;
  const heading = document.querySelector(headingName);
  heading.textContent = `${months[workingMonth]} ${workingYear}`;
}

function today() {
  return new Date();
}

function currentYear() {
  return today().getFullYear();
}

function currentMonth() {
  return today().getMonth();
}

dateHeading();

for (let i = 0; i <= 2; i++) {
  const calendar = document.querySelector(`#calendar${i}`);

  const workingDate = new Date(currentYear(), currentMonth() + i);
  const workingYear = workingDate.getFullYear();
  const workingMonth = workingDate.getMonth();

  createMonthHeading(workingYear, workingMonth, i);
  createDayHeadings(calendar);
  padCalendar(calendar, workingYear, workingMonth);
  createDates(calendar, workingYear, workingMonth);
}