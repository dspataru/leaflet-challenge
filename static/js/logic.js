// // --------------------------------------------------------------------------------------------------------------------------
// // Part 1: Create the Earthquake Visualization
// // USGS webpage: https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php

// // Dataset of interest: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson
// // The above link contains a GeoJSON file of all Earthquakes within the past 7 days, of all magnitudes, updated every minute. 
// // --------------------------------------------------------------------------------------------------------------------------


// Function to assign the colour to the markers based on depth values using HEX codes.
function getColour(d) {
    return d >= 90 ? '#FF0000' :
           d >= 70 ? '#FF7241' :
           d >= 50 ? '#FFA641' :
           d >= 30 ? '#FFDC41' :
           d >= 10 ? '#D4FF00' : '#74FF00';
}


// Create a map that plots all earthquakes from the dataset based on their longitude and latitude.
function createMap(earthquakes) {
    
    // Create the tile layer that will be the background of the earthquake map.
    let streetmap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    let topomap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    // Create a baseMaps object to hold the streetmap layer.
    let baseMaps = {
        "Street Map": streetmap,
    //  "Topographic Map": topomap
    };

    // Create an overlayMaps object to hold the bikeStations layer.
    let overlayMaps = {
        "Earthquakes": earthquakes
    };

    // Create the map object with options.
    let earthquakeMap = L.map('map', {  // the div id that holds the map is 'map'
        center: [40.73, -74.0059],      // coordinates of where to zoom the map into (this is chosen arbitrarily)
        zoom: 2.5,                       
        layers: [streetmap, earthquakes]
    });

    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    // L.control.layers(baseMaps, overlayMaps, {
    //     collapsed: false
    // }).addTo(earthquakeMap);

    // Create a legend that will provide context for your map data.
    let legend = L.control({ position: "bottomright" });

    legend.onAdd = function () {
        let div = L.DomUtil.create("div", "info legend");
        let categories = ["-10-10", "10-30", "30-50", "50-70", "70-90", "90+"]; // categories
        let colors = ['#74FF00', '#D4FF00', '#FFDC41', '#FFA641', '#FF7241', '#FF0000']; // corresponding colors

        for (let i = 0; i < categories.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors[i] + '"></i>' + categories[i] + '&nbsp; &nbsp; <br>';
        }

        return div;
    };
  
    legend.addTo(earthquakeMap);
}


function createMarkers(response) {

    // Pull the "features" property from response.data.
    let earthquakeData = response.features;
  
    // Initialize an array to hold earthquake markers.
    let earthquakeMarkers = [];
  
    // Loop through the earthquake data array.
    for (let i = 0; i < earthquakeData.length; i++) {
        let earthquakeLoc = earthquakeData[i].geometry.coordinates; // grabs the coordinates of each earthquake
        
        // For each earthquake we create a marker and bind a popup with the location, magnitude, and date.
        let date = new Date(earthquakeData[i].properties.time).toLocaleDateString('en-US');
        let location = earthquakeData[i].properties.place;
        let magnitude = earthquakeData[i].properties.mag;
        let depth = earthquakeLoc[2];

        // Add circles to the map.
        let earthquakeMarker = L.circle([earthquakeLoc[1], earthquakeLoc[0]], {
            fillOpacity: 1,
            color: "black",
            weight: 0.75,
            fillColor: getColour(depth), // colour is dependent on the depth of the earthquake.
            radius: magnitude * 5000  // size is dependent on the magnitude of the earthquake.
        }).bindPopup("<h3>Location: " + location + "</h3> <hr> <h3>Magnitude: " + magnitude + "</h3><h3>Date: " + date + "</h3><h3>Depth: " + depth + "</h3>",
            );
            
        // Add the marker to the earthquakeMarkers array.
        earthquakeMarkers.push(earthquakeMarker);
    }
  
    // Create a layer group that's made from the earthquake markers array, and pass it to the createMap function.
    createMap(L.layerGroup(earthquakeMarkers));
}


// Store our API endpoint as url.
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Perform an API call to the Earthquake data to get the information. Call createMarkers when it completes.
d3.json(url).then(createMarkers);