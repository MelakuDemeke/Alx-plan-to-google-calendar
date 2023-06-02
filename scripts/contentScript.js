// Get all h1 tags on the page
const h1Tags = document.getElementsByTagName('h1');

// Iterate through each h1 tag and change the text
for (let i = 0; i < h1Tags.length; i++) {
  const h1Tag = h1Tags[i];
  h1Tag.innerText = 'Modified H1';
}

// Find all elements with the class name "dhx_cal_event_line"
const elements = document.querySelectorAll(".dhx_cal_event_line");

// Loop through each element and add "close" to aria-label
elements.forEach(element => {
  const ariaLabel = element.getAttribute("aria-label");
  element.setAttribute("aria-label", `close ${ariaLabel}`);
});


window.onload = function(){
  console.log("page loaded");
}