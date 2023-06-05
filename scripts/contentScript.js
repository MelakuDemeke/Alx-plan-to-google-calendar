// Get all h1 tags on the page
const h1Tags = document.getElementsByTagName('h1');

// Iterate through each h1 tag and change the text
for (let i = 0; i < h1Tags.length; i++) {
  const h1Tag = h1Tags[i];
  chrome.runtime.sendMessage({ data: h1Tag.innerText });
  h1Tag.innerText = 'Modified H1';
}

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

// Create the paragraph element with some text
const paragraph = document.createElement('p');
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
    width: 150px
  }
  
`;

// Append the style element to the document head
document.head.appendChild(styleElement);

// END OF MODAL
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close");
span.onclick = function () {
  modal.style.display = "none";
  alert(span);
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    var hideheeader = document.getElementsByClassName("dhx_cal_navline");
    var daylist = document.getElementsByClassName("dhx_cal_header");

    for (var i = 0; i < hideheeader.length; i++) {
      hideheeader[i].style.display = "block";
      daylist[i].style.display = "block"

    }
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

  plans.forEach((plan) => {
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

    // Create the button element
    const button = document.createElement('button');
    button.textContent = 'Add to Google Calender';

    // Add a click event listener to the button
    button.addEventListener('click', () => {
      alert(date.innerText);
    });

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


const divwithidpro = document.querySelectorAll('div[event_id^="project-"]');

// Iterate through each h1 tag and change the text
for (let i = 0; i < divwithidpro.length; i++) {
  // console.log(divwithidpro[i].getAttribute('aria-label'))
  chrome.runtime.sendMessage({ data: divwithidpro[i].getAttribute('aria-label') });
}