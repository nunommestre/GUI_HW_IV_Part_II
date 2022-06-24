// File: index.js
// GUI Assignment: Adding Sliders and Tabs (HW4-Pt2)
// Nuno Mestre, UMass Lowell Computer Science, nuno_mestre@student.uml.edu
// June 23, 2022
// Description: Javascript that helps enable and manage the two way binded sliders and tabs

// Ready function executes when the DOM is ready
// Used this for guidance https://jqueryvalidation.org/

// https://jqueryui.com/slider/#range was  used to guid me especially the example
// with a range (two values on each slider)
$(function () {
  $("#slider-x").slider({
    range: true,
    min: -50,
    max: 52,
    values: [-20, 20],
    slide: function (event, ui) {
      $("#x1").val(ui.values[0]);
      $("#x2").val(ui.values[1]);
      $("#input_form").submit();
    },
  });
  $("#slider-y").slider({
    range: true,
    min: -50,
    max: 50,
    values: [-20, 20],
    slide: function (event, ui) {
      $("#y1").val(ui.values[0]);
      $("#y2").val(ui.values[1]);
      $("#input_form").submit();
    },
  });

  // If x2 < x1 it'll prompt an error
  $.validator.addMethod(
    "xBounds",
    function (value, element) {
      var x2 = Number(value);
      var x1 = Number($("#x1").val());
      if (x1 <= x2) {
        return true;
      }
      return false;
    },
    // Custom error message
    "Least X value cannot exceed the greatest value!"
  );
  // If y2 < y1 it'll prompt an error
  $.validator.addMethod(
    "yBounds",
    function (value, element) {
      var y2 = Number(value);
      var y1 = Number($("#y1").val());
      if (y1 <= y2) {
        return true;
      }
      return false;
    },
    // Custom error message
    "Least Y value cannot exceed the greatest value!"
  );
  // Sets the rules for validation
  $("#input_form").validate({
    rules: {
      x1: {
        required: true,
        number: true,
        range: [-50, 50],
      },
      x2: {
        required: true,
        number: true,
        range: [-50, 50],
        xBounds: true,
      },
      y1: {
        required: true,
        number: true,
        range: [-50, 50],
      },
      y2: {
        required: true,
        number: true,
        range: [-50, 50],
        yBounds: true,
      },
    },
    // Error messages if they fail to meet requirements (Notice X and Y bounds one isnt here its taken care of when creating a custom requirement)
    messages: {
      x1: {
        required: "You must enter a value in every field!",
        number: "Try entering a number instead",
        range: "This number is out of range!",
      },
      x2: {
        required: "You must enter a value in every field!",
        number: "Try entering a number instead",
        range: "This number is out of range!",
      },
      y1: {
        required: "You must enter a value in every field!",
        number: "Try entering a number instead",
        range: "This number is out of range!",
      },
      y2: {
        required: "You must enter a value in every field!",
        number: "Try entering a number instead",
        range: "This number is out of range!",
      },
    },
  });
});
// The keyup event listens for input text and it sets the appropriate slider value in addition to changing the variables value
// This is known as a two way binding between the input and slider
document.getElementById("input_form").addEventListener("keyup", function () {
  document.getElementById("x1").addEventListener("keyup", function () {
    new_val = Number($("#x1").val());
    if (Number.isNaN(new_val)) {
      new_val = 0;
    }

    // This changes the value at index 0 of slider X (aka the x1 or first value slider)
    $("#slider-x").slider("values", 0, new_val);
  });
  document.getElementById("x2").addEventListener("keyup", function () {
    new_val = Number($("#x2").val());
    if (Number.isNaN(new_val)) {
      new_val = 0;
    }
    $("#slider-x").slider("values", 1, new_val);
  });
  document.getElementById("y1").addEventListener("keyup", function () {
    new_val = Number($("#y1").val());
    if (Number.isNaN(new_val)) {
      new_val = 0;
    }
    $("#slider-y").slider("values", 0, new_val);
  });
  document.getElementById("y2").addEventListener("keyup", function () {
    new_val = Number($("#y2").val());
    if (Number.isNaN(new_val)) {
      new_val = 0;
    }
    $("#slider-y").slider("values", 1, new_val);
  });
  $("#input_form").submit();
});
// Function that creates the dynamic table
function createTable(x1, x2, y1, y2) {
  var table = document.getElementById("m_table");
  var tbody = document.createElement("tbody");
  // set number of rows
  for (let i = 0; i <= y2 - y1 + 1; ++i) {
    let row = document.createElement("tr");
    // set number of columns
    for (let j = 0; j <= x2 - x1 + 1; ++j) {
      let data = document.createElement("td");
      // Top left block empty
      if (i === 0 && j === 0) {
        data.innerHTML = "";
      }
      // sets up top row
      else if (i === 0) {
        data.innerHTML = x1 + j - 1;
      }
      // sets first column
      else if (j === 0) {
        data.innerHTML = y1 + i - 1;
      }
      // Multiplication preformed the get the table numbers
      else {
        data.innerHTML = (x1 + j - 1) * (y1 + i - 1);
      }
      // appends the data to eachg row and individual data cell in that row and appends it to our currently empty html table
      row.appendChild(data);
    }
    tbody.appendChild(row);
  }
  table.appendChild(tbody);
}

// music_play controls when the music can be played to prevent overlap
var music_play = false;
function submitForm() {
  var audio = new Audio("Music/AmongUS_Drip.mp3");
  if (!music_play) {
    audio.play();
    music_play = true;
  }
  // Get all of needed elements from the form using getElementById
  document.getElementById("m_table").innerHTML = "";
  var form = document.getElementById("input_form");
  var multiplier_bottom = document.getElementById("x1").value;
  var multiplier_top = document.getElementById("x2").value;
  var multiplicand_bottom = document.getElementById("y1").value;
  var multiplicand_top = document.getElementById("y2").value;
  var values = [x1, x2, y1, y2];
  var range = [];
  // Loop through and look for empty inputs and set them to NaN
  for (var i = 0; i < values.length; ++i) {
    if (values[i] == "") {
      values[i] = NaN;
    }
    // Creates a new array of the text numbers becoming real names to JavaScript
    range[i] = Number(values[i].value);
  }
  // Check to see if form passes validation
  if ($("#input_form").valid()) {
    createTable(
      Number(multiplier_bottom),
      Number(multiplier_top),
      Number(multiplicand_bottom),
      Number(multiplicand_top)
    );
  }
  document.getElementById("m_table").style.visibility = "visible";

  return false;
}
// Creates a tab section
var tabs = $("#tabs").tabs();
// executes when the save button is pressed
$("#create").click(function () {
  var x1 = Number($("#x1").val());
  var x2 = Number($("#x2").val());
  var y1 = Number($("#y1").val());
  var y2 = Number($("#y2").val());
  const tab_length = $("div#tabs ul li").length + 1;
  // Creates the label for each table being saved I also added a checkbox to allow for multiple tab deletions or single (you pick)
  $("div#tabs ul").append(
    '<li class="tab-class"><input id="checkbox-' +
      tab_length +
      '" type="checkbox"><a href="#tab-' +
      tab_length +
      '">' +
      x1 +
      "x" +
      x2 +
      " & " +
      y1 +
      "x" +
      y2 +
      "</a></li>"
  );
  // Adds id's to each tag so they can be easily managed and appended
  $("div#tabs").append('<div id="tab-' + tab_length + '"></div>');
  $("#tabs").tabs("refresh");
  $("#tab-" + tab_length).append($("body > div.table_div").html());
  document.getElementById("tabs").style.visibility = "visible";
});

// This function listens for the delete button and deletes all of the checked off tabs
// Took inspiration from https://jqueryui.com/tabs/#manipulation
$("#delete").on("click", function () {
  var tabtotal = $("#tabs li").length;
  // If one li index is removed the all shift so this variable accounts for that shift
  var previous = 0;
  for (i = 0; i <= tabtotal; ++i) {
    // Path checks each individual checkbox and deletes the tab if checked
    // previous accounts for shifts in index due to prior deletions
    if (
      $(".ui-tabs-nav li:eq(" + (i - previous) + ")")
        .find('input[type="checkbox"]')
        .prop("checked")
    ) {
      var tabId = $("#tabs")
        .find(".ui-tabs-nav li:eq(" + (i - previous) + ")")
        .remove()
        .attr("aria-controls");
      $("#" + tabId).remove();
      previous++;
      $("tabs").tabs("refresh");
    }
  }
  // Hides again if theres no tabs
  tabtotal = $("#tabs li").length;
  if (tabtotal == 0) {
    document.getElementById("tabs").style.visibility = "hidden";
  }
});
