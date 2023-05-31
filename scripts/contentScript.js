// Get all h1 tags on the page
const h1Tags = document.getElementsByTagName('h1');

// Iterate through each h1 tag and change the text
for (let i = 0; i < h1Tags.length; i++) {
  const h1Tag = h1Tags[i];
  h1Tag.innerText = 'Modified H1';
}
