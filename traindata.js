
$(document).ready(function() {
  
// 1. Initialize Firebase
var config = {

	apiKey: "AIzaSyCpAJrk2NVPWh-tAzmtPMVN-Q44Y16j0aw",
    authDomain: "trainscheduler-cc79d.firebaseapp.com",
    databaseURL: "https://trainscheduler-cc79d.firebaseio.com",
    storageBucket: "trainscheduler-cc79d.appspot.com",
    messagingSenderId: "543977881902"
	};

firebase.initializeApp(config);

var database = firebase.database();
//this captures the input from the administrator
$("#add-train-btn").on("click", function(event){
	event.preventDefault();
	//input from the administrator
	var trainName = $("#trainName-input").val().trim();
	var destination = $("#destination-input").val().trim();
	var firstTrain = $("#firstTrain-input").val().trim();
	var frequency = $("#frequency-input").val().trim();          




      

//push data 

	
database.ref().push({
	trainName: trainName,
	destination: destination,
	firstTrain: firstTrain,
	frequency: frequency
  
	});

// Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#trainName-input").val("");
  $("#destination-input").val("");
  $("#firstTrain-input").val("");
  $("#frequency-input").val("");

  // Prevents moving to new page
 return false;
});



// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    //Create Firebase event for adding trains to the database and a row in the html when a user adds an entry

database.ref().on("child_added", function(childSnapshot) {
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;

    //This use moment to format time
   //using moment to determine arival time and how many min to arrival
      // First Time (pushed back 1 year to make sure it comes before current time)  
  

    var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
      console.log(firstTimeConverted);

     // Current Time
    var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

      // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);

      // Time apart (remainder)
    var tRemainder = diffTime % frequency;
      console.log(tRemainder);

      // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

      // Next Train 

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    nextTrain = moment(nextTrain).format("hh:mm");
      console.log (nextTrain);
    
    
      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().trainName);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().firstTrain);
      console.log(childSnapshot.val().frequency);
      

      // Add each train's data into the table
      $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
      frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td><td>");
     

});

});
