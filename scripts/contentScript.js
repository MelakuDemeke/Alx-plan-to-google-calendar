// CREATE A MODAL

// Create the main div element with id "myModal" and class "modal"
const mainDiv = document.createElement('div');
mainDiv.id = 'myModal';
mainDiv.className = 'schedulemodal';

// Create the modal content div element with class "modal-content"
const modalContentDiv = document.createElement('div');
modalContentDiv.className = 'modal-content';

// Create the close span element with class "close"
const closeSpan = document.createElement('span');
closeSpan.className = 'close';
closeSpan.textContent = '×'; // This represents the close symbol (times sign)
closeSpan.addEventListener('click', function () {
  closeModal()
})

// Create the paragraph element with some text
const paragraph = document.createElement('h1');
paragraph.textContent = 'This month schedules of Alx';


const schedules = document.createElement('ul');
schedules.className = 'schedules';
schedules.id = "schedules"



// Append the close span and paragraph as children of the modal content div
modalContentDiv.appendChild(closeSpan);
modalContentDiv.appendChild(paragraph);
modalContentDiv.appendChild(schedules);

// Append the modal content div as a child of the main div
mainDiv.appendChild(modalContentDiv);

// Append the main div to the document body (or any desired parent element)
document.body.appendChild(mainDiv);

// Add the CSS styles
const styleElement = document.createElement('style');
styleElement.textContent = `
  .schedulemodal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
  }
  
  .modal-content {
    background-color: #fefefe;
    margin: 5% 30%;
    padding: 20px;
    border: 1px solid #888;
    width: 50%;
  }
  
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  h3, p, button {
    margin: 5px 0;
  }

  button {
    display: inline-block;
    width: fit-content;
    height: 30px;
  }
  
`;

// Append the style element to the document head
document.head.appendChild(styleElement);
// END OF MODAL

// When the user clicks anywhere outside of the modal, close it
var modal = document.getElementById("myModal");
window.onclick = function (event) {
  if (event.target == modal) {
    closeModal();
  }
}



// add button to export to google calender

// Select the parent div element
const parentDiv = document.querySelector('.dhx_cal_navline');

// Create the new div element
const newDiv = document.createElement('div');
newDiv.className = '';
newDiv.setAttribute('aria-label', 'Today');
newDiv.setAttribute('role', 'button');
newDiv.textContent = 'export to google calender';


newDiv.style.padding = '10px 20px';
newDiv.style.display = 'inline-block';
newDiv.style.margin = '0 350px';
newDiv.style.backgroundColor = '#E0003C';
newDiv.style.color = '#fff';
newDiv.style.cursor = 'pointer';
newDiv.style.border = 'none';
newDiv.style.borderRadius = '4px';

newDiv.addEventListener('click', function () {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";

  var hideheeader = document.getElementsByClassName("dhx_cal_navline");
  var daylist = document.getElementsByClassName("dhx_cal_header");

  for (var i = 0; i < hideheeader.length; i++) {
    hideheeader[i].style.display = "none";
    daylist[i].style.display = "none"

  }
  var hideheeader = document.getElementsByClassName("dhx_cal_navline");
  var daylist = document.getElementsByClassName("dhx_cal_header");

  for (var i = 0; i < hideheeader.length; i++) {
    hideheeader[i].style.display = "none";
    daylist[i].style.display = "none"

  }
  var ul = document.getElementById("schedules");
  const divwithidpro = document.querySelectorAll('div[event_id^="project-"]');
  const plans = []
  for (let i = 0; i < divwithidpro.length; i++) {
    const planText = divwithidpro[i].getAttribute('aria-label')
    if (planText === "") {
      continue
    } else {
      plans.push(planText)
    }
  }

  cleanPlan = doubleClener(plans);

  cleanPlan.forEach((plan) => {
    // Create the list item element
    const li = document.createElement('li');
    const text = plan;

    // Extract the title
    const titleStartIndex = 0;
    const titleEndIndex = text.indexOf(' From :');
    const title = text.substring(titleStartIndex, titleEndIndex).trim();

    // Extract the date range
    let dateRange;
    const openIndex = text.indexOf(' >');
    if (openIndex !== -1) {
      dateRange = text.substring(titleEndIndex, openIndex).trim();
    } else {
      dateRange = text.substring(titleEndIndex).trim();
    }

    // Create the title element
    const headeTitle = document.createElement('h3');
    headeTitle.textContent = title;

    // Create the date element
    const date = document.createElement('p');
    date.textContent = dateRange;

    var dateString = dateRange;

    // Extract the "from date"
    var fromIndex = dateString.indexOf(":") + 1;
    var toIndex = dateString.indexOf("To");
    var fromDate = dateString.substring(fromIndex, toIndex).trim();

    // Extract the "to date"
    fromIndex = dateString.lastIndexOf(":") + 1;
    var toDate = dateString.substring(fromIndex).trim();

    // Create the button element
    const button = document.createElement('button');
    button.textContent = 'Add to Google Calender';
    button.addEventListener('click', () => {
      var startDate = new Date(fromDate);
      var endDate = new Date(toDate);
      var eventTitle = title;
      var eventDescription = 'Event Description';
      var eventLocation = 'Event Location';

      var googleCalendarUrl = 'https://www.google.com/calendar/render?action=TEMPLATE' +
        '&text=' + encodeURIComponent(eventTitle) +
        '&dates=' + formatGoogleCalendarDate(startDate) + '/' + formatGoogleCalendarDate(endDate) +
        '&details=' + encodeURIComponent(eventDescription) +
        '&location=' + encodeURIComponent(eventLocation);

      window.open(googleCalendarUrl, '_blank');
    });

    function formatGoogleCalendarDate(date) {
      var year = date.getFullYear();
      var month = (date.getMonth() + 1).toString().padStart(2, '0');
      var day = date.getDate().toString().padStart(2, '0');

      return year + month + day;
    }

    // Append the title, date, and button to the list item
    li.appendChild(headeTitle);
    li.appendChild(date);
    li.appendChild(button);

    // Append the list item to the unordered list
    ul.appendChild(li);
  });

});

// Append the new div as a child of the parent div
parentDiv.appendChild(newDiv);


function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
  var hideheeader = document.getElementsByClassName("dhx_cal_navline");
  var daylist = document.getElementsByClassName("dhx_cal_header");

  for (var i = 0; i < hideheeader.length; i++) {
    hideheeader[i].style.display = "block";
    daylist[i].style.display = "block"

  }
}

function doubleClener(inputData) {

  var combinedEntries = {};

  // Loop through each element in the input data array
  for (var i = 0; i < inputData.length; i++) {
    var element = inputData[i].trim();

    // Skip empty elements or elements without the "From" keyword
    if (element === '' || !element.includes('From')) {
      continue;
    }

    // Extract the project name, start date, and end date
    var projectName = element.substring(0, element.indexOf(' From'));
    var startDate = element.match(/From : (\d{4}-\d{2}-\d{2})/)[1];
    var endDate = element.match(/To : (\d{4}-\d{2}-\d{2})/)[1];

    // Check if the project name already exists in the combined entries
    if (combinedEntries.hasOwnProperty(projectName)) {
      // Update the end date if the current element has a later end date
      if (endDate > combinedEntries[projectName].endDate) {
        combinedEntries[projectName].endDate = endDate;
      }
    } else {
      // Add a new entry to the combined entries
      combinedEntries[projectName] = {
        startDate: startDate,
        endDate: endDate
      };
    }
  }

  // Generate the combined output as an array
  var combinedOutput = [];
  for (var projectName in combinedEntries) {
    if (combinedEntries.hasOwnProperty(projectName)) {
      var entry = combinedEntries[projectName];
      var output = projectName + ' From : ' + entry.startDate + ' To : ' + entry.endDate;
      combinedOutput.push(output);
    }
  }

  return combinedOutput;

}