// Navigation - toggles
dailyToggle = document.getElementById("toggle-daily");
weeklyToggle = document.getElementById("toggle-weekly");
monthlyToggle = document.getElementById("toggle-monthly");
// header and track
container = document.getElementById("container");

// Populating the DOM

const appendItem = (item) => {
  // add markup for each item to the DOM

  const section = document.createElement("section");

  // Header
  const header = document.createElement("header");
  // Heading - work, play, etc
  const heading = document.createElement("h2");
  heading.innerHTML = `${item?.title}`;
  //   dots
  const dots = document.createElement("div");
  dots.innerHTML = `...`;
  header.appendChild(heading);
  header.appendChild(dots);

  //   Track
  const track = document.createElement("div");
  // Time frames

  // Daily
  const daily = document.createElement("div");
  daily.setAttribute("id", "daily");
  daily.setAttribute("data-visible", "false");
  daily.innerHTML = `<time datetime="PT${item?.timeframes?.daily?.current}H">${item?.timeframes?.daily?.current}hrs</time>
  <p>Yesterday  - <time datetime="PT${item?.timeframes?.daily?.previous}H">${item?.timeframes?.daily?.previous}hrs</time></p>`;
  track.appendChild(daily);

  // Weekly
  const weekly = document.createElement("div");
  weekly.setAttribute("id", "weekly");
  weekly.setAttribute("data-visible", "true");
  weekly.innerHTML = `<time datetime="PT${item?.timeframes?.weekly?.current}H">${item?.timeframes?.weekly?.current}hrs</time>
  <p>Last Week  - <time datetime="PT${item?.timeframes?.weekly?.previous}H">${item?.timeframes?.weekly?.previous}hrs</time></p>`;
  track.appendChild(weekly);

  // Monthly
  const monthly = document.createElement("div");
  monthly.setAttribute("id", "monthly");
  monthly.setAttribute("data-visible", "false");
  monthly.innerHTML = `<time datetime="PT${item?.timeframes?.monthly?.current}H">${item?.timeframes?.monthly?.current}hrs</time>
  <p>Last Month  - <time datetime="PT${item?.timeframes?.monthly?.previous}H">${item?.timeframes?.monthly?.previous}hrs</time></p>`;
  track.appendChild(monthly);

  section.appendChild(header);
  section.appendChild(track);
  container.appendChild(section);
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

// Handling Toggle
const handleToggle = (e) => {
  const dailyView = document.querySelectorAll("#daily");
  const weeklyView = document.querySelectorAll("#weekly");
  const monthlyView = document.querySelectorAll("#monthly");

  if (e.target == dailyToggle) {
    // checking the visibily - the first section is visible
    let visiblity = daily.dataset.visible;
    // updating the `data-visible` attribute
    if (visiblity == "false") {
      dailyView.forEach((d) => {
        d.dataset.visible = "true";
      });

      weeklyView.forEach((w) => {
        w.dataset.visible = "false";
      });

      monthlyView.forEach((m) => {
        m.dataset.visible = "false";
      });
    }
  } else if (e.target == weeklyToggle) {
    let visiblity = weekly.dataset.visible;
    if (visiblity == "false") {
      dailyView.forEach((d) => {
        d.dataset.visible = "false";
      });

      weeklyView.forEach((w) => {
        w.dataset.visible = "true";
      });

      monthlyView.forEach((m) => {
        m.dataset.visible = "false";
      });
    }
  } else {
    // let displayMonthly = e.target
    let visiblity = monthly.dataset.visible;
    if (visiblity == "false") {
      dailyView.forEach((d) => {
        d.dataset.visible = "false";
      });

      weeklyView.forEach((w) => {
        w.dataset.visible = "false";
      });

      monthlyView.forEach((m) => {
        m.dataset.visible = "true";
      });
    }
  }
};
