// Navigation - toggles
daily = document.getElementById("toggle-daily");
weekly = document.getElementById("toggle-weekly");
monthly = document.getElementById("toggle-monthly");
// header and track
container = document.getElementById("container");

// Populating the DOM

const appendItem = (item) => {
  // add markup for each item to the DOM

  // Header
  const header = document.createElement("section");
  // Heading - work, play, etc
  const heading = document.createElement("h2");
  heading.innerHTML = `${item?.title}`;
  //   dots
  const dots = document.createElement("div");
  dots.innerHTML = `...`;
  header.appendChild(heading);
  header.appendChild(dots);

  //   Track
  const track = document.createElement("section");
  // Time frames

  // Daily
  const daily = document.createElement("div");
  daily.innerHTML = `<time datetime="PT${item?.timeframes?.daily?.current}H">${item?.timeframes?.daily?.current}hrs</time>
  <p>Yesterday  - <time datetime="PT${item?.timeframes?.daily?.previous}H">${item?.timeframes?.daily?.previous}hrs</time></p>`;
  track.appendChild(daily);

  // Weekly
  const weekly = document.createElement("div");
  weekly.innerHTML = `<time datetime="PT${item?.timeframes?.weekly?.current}H">${item?.timeframes?.weekly?.current}hrs</time>
  <p>Yesterday  - <time datetime="PT${item?.timeframes?.weekly?.previous}H">${item?.timeframes?.weekly?.previous}hrs</time></p>`;
  track.appendChild(weekly);

  // Monthly
  const monthly = document.createElement("div");
  monthly.innerHTML = `<time datetime="PT${item?.timeframes?.monthly?.current}H">${item?.timeframes?.monthly?.current}hrs</time>
  <p>Yesterday  - <time datetime="PT${item?.timeframes?.monthly?.previous}H">${item?.timeframes?.monthly?.previous}hrs</time></p>`;
  track.appendChild(monthly);

  container.appendChild(header);
  container.appendChild(track);
};

// Append data to DOMwhat
const populateDOM = (data) => {
  // with a forEach loop
  data.forEach((item) => {
    appendItem(item);
  });

  // This can also be written as -> data.forEach(appendItem)
};

// Fetching the data

fetch("/data.json")
  .then((response) => {
    if (!response.ok) return console.log("Oops! Something went wrong.");
    return response.json();
  })
  .then((data) => {
    populateDOM(data);
  });
