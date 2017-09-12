# Udacity Frontend Nanodegree - Project Neighbourhood Map

This is my work for the Udacity Frontend Nanodegree project Neighborhood Map.

## How to run

This project is a web application. There are two options to run the application:

1. Simply open file src/index.html or dist/index.html using a modern browser.
2. Host the files on HTTP server. Then use a modern browser to open the url of this applicaiton.

## How to use

The application have two panels.

The left panel displays a list of some of the museums in Seattle, WA, USA. The right panel displays markers of the listed museums on a map.

You can click the list items or markers on map to see some detailed information of the museum, for example:
* Address
* Phone number
* Website URL

The detailed information are retrieved from API of foursquare.com.

On top of the left panel, a textbox can be used to filter the museums by name.

Clicking the "x" button on top of the left panel can hide it. Clicking the menu button on top of the right panel can show the left panel.

## How to build an optimized version of this web applicatoin

1. Ensure that Node and npm are installed
```bash
node -v
npm -v
```
2. Install gulp-cli
```bash
npm install --global gulp-cli
```
3. Download the project and install build tools
```bash
git clone https://github.com/wangxin/frontend-nanodegree-neighborhood-map.git
cd frontend-nanodegree-neighborhood-map
npm install
```
4. Run the build tool. Optimized version of the web application will be stored in `dist` subfolder.
```bash
gulp
```

## Libs and APIs used in this project
Below libs and APIs are used in this project:
* [Bootstrap](https://getbootstrap.com/)
* [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/)
* [jQuery](http://jquery.com)
* [Material Icons](https://material.io/icons/)
* [Knockout](http://knockoutjs.com/)
* [Popper.js](https://popper.js.org/)
* [Foursquare](https://developer.foursquare.com/)
