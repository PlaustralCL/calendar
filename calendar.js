document.getElementById("current-date").addEventListener("click", toggleCalendar);

/**
 * Toggles the visibility of the three month calendar
 */
function toggleCalendar() {
  const classes = document.querySelector("#calendars").classList.toggle("hidden");
}

/**
 * Determine if the passed date is today
 * @param date The date to be compared
 * @return True if date is today, false otherwise
 */
function isToday(date) {
  const today = new Date();

  if (today.getFullYear() == date.getFullYear()
    && today.getDate() == date.getDate()
    && today.getMonth() == date.getMonth()) {
    return true;
  }
}

/**
 * Prints a formated version of today's date to the DOM
 */
function printDateHeading() {
  const today = new Date();
  const currentDateElement = document.querySelector("#current-date");
  // Formating information from:
  // https://www.freecodecamp.org/news/how-to-format-dates-in-javascript/
  currentDateElement.textContent = today.toLocaleDateString('en-us',
    { weekday: "long", year: "numeric", month: "short", day: "numeric" });
}

/**
 * Add day name labels to the top of the calendar 
 * @param calendar The Dom element where the calendar is being printed
 */
function createDayHeadings(calendar) {
  const days = ["S", "M", "T", "W", "R", "F", "S"];
  for (i = 0; i <= 6; i++) {
    const div = document.createElement('div');
    div.textContent = days[i];
    calendar.appendChild(div);
  }
}

/**
 * Pad calendar to properly align days of the week
 * @param calendar The Dom element where the calendar is being printed
 * @param curentYear The current year of the calendar being made
 * @param currentMonth the current month of the calendar being made
 */
function padCalendar(calendar, currentYear, currentMonth) {
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  for (i = 0; i < firstDay; i++) {
    const div = document.createElement('div');
    div.textContent = "";
    calendar.appendChild(div);
  }
}

/**
 * Populate the calender with the dates
 * @param calendar The Dom element where the calendar is being printed
 * @param curentYear The current year of the calendar being made
 * @param currentMonth the current month of the calendar being made
 */
function createDates(calendar, currentYear, currentMonth) {
  let lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
  for (i = 1; i <= lastDay; i++) {
    const date = new Date(currentYear, currentMonth, i);
    const div = document.createElement('div');
    div.textContent = date.getDate();
    if (isToday(date)) {
      div.classList.add("today");
    }
    calendar.appendChild(div);
  }
}

/**
 * Add the month name and year to the top of the calendar
 * @param workingYear An integer for the current year of the calendar being made
 * @param workingMonth An integer for the current month of the calendar being made
 * @param index Integer for the heading index of the current calendar
 */
function createMonthHeading(workingYear, workingMonth, index) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const headingName = `#heading${index}`;
  const heading = document.querySelector(headingName);
  heading.textContent = `${months[workingMonth]} ${workingYear}`;
}

/**
 * Create a Date object with today's date
 * @return The Date object
 */
function today() {
  return new Date();
}

/**
 * Generate the four digit year
 * @return An integer for the four digit year
 */
function currentYear() {
  return today().getFullYear();
}

/**
 * Generate an integer for the current month
 * @return An integer for the current month. January is 0, December is 11
 */
function currentMonth() {
  return today().getMonth();
}

/**
 * Create the HTML scaffold required to build the calendar. This reduces duplication
 * of HTML and helps make the code more dry.
 * @param index An integer starting at 0, used to create unique Ids for each
 * calendar.
 */
function createScaffold(index) {
  const calendars = document.querySelector("#calendars");

  const calendarBoxDiv = document.createElement("div");
  calendarBoxDiv.classList.add("flex-item");
  calendars.appendChild(calendarBoxDiv);

  monthHeadingDiv = document.createElement("div");
  monthHeadingDiv.classList.add("month-header");
  monthHeadingDiv.setAttribute("id", `heading${index}`);
  calendarBoxDiv.appendChild(monthHeadingDiv);

  calendarDiv = document.createElement("div");
  calendarDiv.classList.add("calendar");
  calendarDiv.setAttribute("id", `calendar${index}`);
  calendarBoxDiv.appendChild(calendarDiv);
}

/**
 * Create individual calendars that will be printed to the DOM
 */
function createCalendars() {
  const NUMBER_OF_MONTHS = 3;
  for (let i = 0; i < NUMBER_OF_MONTHS; i++) {
    createScaffold(i);

    const calendar = document.querySelector(`#calendar${i}`);

    const workingDate = new Date(currentYear(), currentMonth() + i);
    const workingYear = workingDate.getFullYear();
    const workingMonth = workingDate.getMonth();

    createMonthHeading(workingYear, workingMonth, i);
    createDayHeadings(calendar);
    padCalendar(calendar, workingYear, workingMonth);
    createDates(calendar, workingYear, workingMonth);
  }
}

/**
 * Initiate program and control the flow
 */
function main() {
  printDateHeading();
  createCalendars();
}

main();
