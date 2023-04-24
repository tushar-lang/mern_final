const { param } = require("express/lib/application");
const req = require("express/lib/request");
const fs = require("fs");

function generateRandomId() {
  return Math.floor(Math.random() * 10000);
}

/**
 * Gets all cars
 * @param None
 */
function getData()  {
    let url = "http://localhost:7000/getcars"

    fetch(url)
        .then(response => {
            if (response.ok)    {
                console.log("Great Success")
            } else {
                console.log("There was a problem fetching the data", "alert-warning")
            }
            return response.json()
        })
        // .then(response=> response.json())
        .then(data => printUsers(data))
        .catch(err => updateAlert("An Error has occurred: " + err, "alert-danger"))
}