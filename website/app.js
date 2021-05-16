/* Global Variables */
// my personal API Key for OpenWeatherMap API
const myApiKey = '19bd93eb76b3c1ba69df2803f84f6357';
// the base url of API calls
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

/* Event listener to add function to existing HTML DOM element */
// select the DOM element
const generateButton = document.getElementById('generate');
// The Event listener
generateButton.addEventListener('click', executeAction);
/* Function called by event listener */
function executeAction(e) {
    const zipCode = document.getElementById('zip').value;
    const theFeel = document.getElementById('feelings').value;
    if (zipCode == '') {
        alert('Please, enter a zip code!');
    } else {
        getWeatherInfo(baseURL, zipCode, myApiKey)
        .then(function(data) {
            // Add data to POST request
            postData('/add', {temperature: data.main.temp, date: newDate, userFeel: theFeel});
            // call the updateUI async function
            updateUI();
        })
    }
}



/* Function to GET Web API Data*/
const getWeatherInfo = async (baseURL, zipCode, myApiKey)=>{
    const response = await fetch(baseURL + zipCode + '&appid=' + myApiKey + '&units=metric');
    try {
        const tempData = response.json();
        console.log(tempData);
        // Data returned from the external API.
        return tempData;
    } catch (error) {
        console.log('error', error);
        // handle error if found
    }
};

/* Function to POST data */
const postData = async (url = '', data = {})=> {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

/* Function to GET Project Data */
const updateUI = async ()=>{
    const request = await fetch('/all');

    try {
        const allInfo = await request.json();
        // update DOM elements | Set the properties of existing HTML elements from the DOM
        document.getElementById('temp').innerHTML = 'Temp: ' + allInfo.temperature + ' C';
        document.getElementById('date').innerHTML = 'Date: ' + allInfo.date;
        document.getElementById('content').innerHTML = 'Feeling: ' + allInfo.userFeel;
    } catch (error) {
        console.log('error', error);
    }
};