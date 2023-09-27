# leaflet-challenge: data visualization of earthquake data from USGS

![USGS logo](https://github.com/dspataru/leaflet-challenge/blob/main/Images/1-Logo.png)


## Table of Contents
* [Background]()
* [Obtaining the Dataset]()
* [Importing and Visualizing the Data]()

## Background
Data visualization using leaflet to help USGS better educate the public and other government organizations on issues facing our planet including natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change.


#### Key Words
HTML, Javascript, CSS, Leaflet, data visualization, GeoJSON, datasets, webpage, JSON, earthquake data visualization, data markers, geojson API, D3

## Obtaining the Dataset

The USGS provdes earthquake data in a number of different formats that are updated every five minutes. The dataset was taken from the [USGS webpage](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) which also contains information about what the JSON output file looks like. An example is seen below:

![GeoJSON](https://github.com/dspataru/leaflet-challenge/blob/main/Images/4-JSON.png)

## Importing and Visualizing the Data

Three functions were created to visualize the data:
1. getColour(d): Function to assign the colour to the markers based on earthquake depth values using HEX codes, where the d arguement is the depth taken from the third element in the coorindates array from the JSON file.
2. createMarkers(response): Function to create the circles on the map that mark the location of each earthquake for the past 7 days. The size and colour of the marker changes based on the magnitude and depth of the earthquake, respectively.
3. createMap(earthquakes): Function that creates the map.

The following CSS code was added to customize the legend elements:

```javascript

.legend { /* style for the legend */
  line-height: 18px;
  color: #555;
  background-color: white;
  border-radius: 5px;
}

.legend i { /* style for the squares */
  width: 18px;
  height: 18px;
  float: left;
  opacity: 1;
  background-color: white;
  margin-right: 15px;
  margin-left: 10px;
}

```

