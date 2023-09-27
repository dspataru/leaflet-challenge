# leaflet-challenge: data visualization of earthquake data from USGS

![USGS logo](https://github.com/dspataru/leaflet-challenge/blob/main/Images/1-Logo.png)


## Table of Contents
* [Background](https://github.com/dspataru/leaflet-challenge/blob/main/README.md#background)
* [Obtaining the Dataset](https://github.com/dspataru/leaflet-challenge/blob/main/README.md#obtaining-the-dataset)
* [Importing and Visualizing the Data](https://github.com/dspataru/leaflet-challenge/blob/main/README.md#importing-and-visualizing-the-data)

## Background
The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this repository, a map using leaflet is developed to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

#### Key Words
HTML, Javascript, CSS, Leaflet, data visualization, GeoJSON, webpage, JSON, earthquake data visualization, data markers, geojson API, D3

## Obtaining the Dataset

The USGS provdes earthquake data in a number of different formats that are updated every five minutes. The dataset was taken from the [USGS webpage](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) which also contains information about what the JSON output file looks like. An example is seen below:

![GeoJSON](https://github.com/dspataru/leaflet-challenge/blob/main/Images/4-JSON.png)

For this project, the dataset containing all of the earthquake data in the past 7 days was used: [All Earthquakes](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson). This API endpoint was stored as a variable and an API call was made to the earthquake data to get the information using `d3.json(url)`.

## Importing and Visualizing the Data

Using Leaflet, a map was created that plots all the earthquakes from the selected dataset based on the longitude and latitude of the area where the earthquake was detected. The data markers reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes appear larger, and earthquakes with greater depth appear darker in color.

Three functions were created to visualize the data:
1. getColour(d): Function to assign the colour to the markers based on earthquake depth values using HEX codes, where the d arguement is the depth taken from the third element in the coorindates array from the JSON file.
2. createMarkers(response): Function to create the circles on the map that mark the location of each earthquake for the past 7 days. The size and colour of the marker changes based on the magnitude and depth of the earthquake, respectively.
3. createMap(earthquakes): Function that creates the map and the legend.

The following CSS code was added to customize the legend elements:

```CSS

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
Below is a screenshot of what the program outputs.

![final output](https://github.com/dspataru/leaflet-challenge/blob/main/Images/2-BasicMap.png)
