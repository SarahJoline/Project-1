// $(document).ready(function() {
//   console.log("works");
// });

// Initialize Search Query
$(".btn").on("click", function (e) {
  e.preventDefault();
  let city = $(".form-control").val();
  let newCity = $(".form-control").val();

  const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=c2e38863824c4fbaa3e29a7d10f11bbf`;
  const queryUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=SeGSW2oWcueAXwOb0zleD2J63hEIWBjY&city=${newCity}`;

  // Weather api
  $.ajax({
    method: "GET",
    url: weatherUrl
  }).then(response => {
    $(".weatherInfo").html(Math.floor((response.data[0].temp * 9) / 5 + 32));
    $(".weatherInfo").append(`<div><span>&#8457;</span></div>`);
  });

  // Ticketmaster api
  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(data => {
    const results = data._embedded.events;
    // console.log(results);

    for (var i = 0; i < results.length; i++) {
      let eventDiv = $("<div>");
      let eventName = results[i].name;
      let eventImg = $("<img>");
      let addBtn = $("<button>Add To Event List</button>");
      let eventDateTime = results[i].dates.start.dateTime;
      let convertedDT = moment(eventDateTime).format("LLLL");
      let eventLocation = results[i]._embedded.venues[0].name;
      addBtn.addClass("addToCalendar");
      eventImg.addClass("eventImage");
      eventDiv.addClass("stylinEvents");
      eventImg.attr("src", results[i].images[4].url);
      eventImg.width("200px");
      eventImg.height("150px");
      eventDiv.append(
        eventImg,
        eventName + "<br>" + eventLocation + "<br>" + convertedDT,
        addBtn
      );
      $(".event-container").append(eventDiv);
      var eventObject = {
        name: eventName,
        where: eventLocation,
        when: convertedDT
      };
      addBtn.attr("data", eventObject.when);
      events.push(eventObject);
    }
  });
});

// Firebase api
var firebaseConfig = {
  apiKey: "AIzaSyCwAF0G8GY_NBThEADQZIBFxqjuQ7XuEeI",
  authDomain: "project-1-ea220.firebaseapp.com",
  databaseURL: "https://project-1-ea220.firebaseio.com",
  projectId: "project-1-ea220",
  storageBucket: "project-1-ea220.appspot.com",
  messagingSenderId: "22912965609",
  appId: "1:22912965609:web:dc40a770ed9225487f4978"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let database = firebase.database()




var events = [];

$(".event-container").on("click", ".addToEventList", function () {
  //Create a var to hold the event name, location, and the time
  console.log('hello');
  


});

$("#searchBtn").on("click", function (e) {
  e.preventDefault();
  //console.log("searchEvents");
  // if the word in the search bar is contained in the name of the event
  // show event.
});

// testing();

// function testing() {
//   var eventDateTime = results[i].dates.start.dateTime;

//   var newTime = moment(eventDateTime).format("LLLL");
// }
