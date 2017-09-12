$("#closeBtn").click(function() {
  $("#leftPanel").addClass("hide");
});

$("#menuBtn").click(function() {
  $("#leftPanel").removeClass("hide");
});

var myFoursquareKey = {
  client_id: "03RWDJQSNB2KCMEFBANXP05OBFIEGOSCXQS1EA2UPIVMKTKE",
  client_secret: "RFFC3DOC2HY2ABIFMR03WGWZR31J3E0IYTIM1JROUEVZHMKH"
};

var fourSquareUrl = "https://api.foursquare.com/v2/venues/search?intent=match&query=Seattle Art Museum&ll=47.607309,-122.338133&v=20170911&client_id=03RWDJQSNB2KCMEFBANXP05OBFIEGOSCXQS1EA2UPIVMKTKE&client_secret=RFFC3DOC2HY2ABIFMR03WGWZR31J3E0IYTIM1JROUEVZHMKH"

var museums = [
    {
      name: "Asian Art Museum",
      lat: 47.630281,
      lng: -122.314244
    },
    // {
    //   name: "Aviation Pavilion, Museum of Flight",
    //   lat: 47.519019,
    //   lng: -122.298178
    // },
    // {
    //   name: "Bellevue Arts Museum",
    //   lat: 47.615222,
    //   lng: -122.201380
    // },
    // {
    //   name: "Burke Museum of Natural History and Culture",
    //   lat: 47.660664,
    //   lng: -122.310538
    // },
    {
      name: "Coast Guard Museum Northwest",
      lat: 47.590632,
      lng: -122.337680
    },
    {
      name: "Dialysis Museum - Northwest Kidney Centers",
      lat: 47.608244,
      lng: -122.320326
    },
    {
      name: "Frye Art Museum",
      lat: 47.606933,
      lng: -122.324059
    },
    // {
    //   name: "KidsQuest Children's Museum",
    //   lat: 47.620864,
    //   lng: -122.195904
    // },
    // {
    //   name: "Museum of Communications",
    //   lat: 47.540867,
    //   lng: -122.323192
    // },
    {
      name: "Museum of History & Industry",
      lat: 47.627618,
      lng: -122.336559
    },
    {
      name: "Museum of Pop Clulture",
      lat: 47.621468,
      lng: -122.348124
    },
    {
      name: "Northwest African American Museum",
      lat: 47.589149,
      lng: -122.301940
    },
    {
      name: "Seattle Art Museum",
      lat: 47.607309,
      lng: -122.338133
    },
    {
      name: "Seattle Children's Museum",
      lat: 47.621394,
      lng: -122.350884
    },
    {
      name: "Seattle Metropolitan Police Museum",
      lat: 47.599661,
      lng: -122.330597
    },
    {
      name: "Seattle Museum of the Mysteries",
      lat: 47.595123,
      lng: -122.327058
    },
    {
      name: "Seattle Pinball Museum",
      lat: 47.598029,
      lng: -122.324956
    },
    // {
    //   name: "Seattle's Official Bad Art Museum of Art",
    //   lat: 47.671452,
    //   lng: -122.317132
    // },
    // {
    //   name: "The Unity Museum",
    //   lat: 47.661007,
    //   lng: -122.313479
    // }
  ];

var markers = [];
var map;
var infoWindow;

function initMap() {
  var locationSeattle = {lat: 47.610984, lng: -122.337031};
  map = new google.maps.Map(document.getElementById('mapContainer'), {
    zoom: 13,
    center: locationSeattle
  });
  infoWindow = new google.maps.InfoWindow();


  createMarkers();
}

function createMarkers() {
  museums.forEach(function(museum) {
    var marker = new google.maps.Marker({
      position: {lat: museum.lat, lng: museum.lng},
      map: map,
      title: museum.name,
      animation: google.maps.Animation.DROP
    });

    marker.addListener('click', function() {
      self = this;

      // Bounce the marker when it is clicked
      this.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function() {
        self.setAnimation(null);
      }, 700);
      ShowInfoWindow(marker);
    });
    markers.push(marker);
  });
}

function ShowInfoWindow(clickedMarker) {
  // Make ajax request to Foursquare API to get information of clicked marker or location
  var foursquareApiUrl = "https://api.foursquare.com/v2/venues/search";
  foursquareApiUrl += "?" + $.param({
    client_id: myFoursquareKey.client_id,
    client_secret: myFoursquareKey.client_secret,
    v: "20170910",
    intent: "match",
    query: clickedMarker.getTitle(),
    ll: clickedMarker.getPosition().lat().toString() + "," + clickedMarker.getPosition().lng().toString()
  });
  $.ajax({
    url: foursquareApiUrl,
    method: "GET"
  }).done(function(result) {
    var content = ""
    try {
      content += "<div><h6>" + clickedMarker.title + "</h6>"
      if (result.response.venues[0].location.formattedAddress) {
        content += "<p><b>Address: </b>" + result.response.venues[0].location.formattedAddress + "</p>"
      }
      if (result.response.venues[0].contact.formattedPhone) {
        content += "<p><b>Phone: </b>" + result.response.venues[0].contact.formattedPhone + "</p>"
      }
      if (result.response.venues[0].url) {
        content += "<p><b>URL: </b><a href=\"" + result.response.venues[0].url + "\">"
        content += result.response.venues[0].url + "</a></p>"
      }
      content += "<p>Info source: <a href=\"https://api.foursquare.com\">Foursquare</a></p></div>"
    }
    catch (err) {
      content = "Failed to get information of location from foursquare.com";
    }
    infoWindow.setContent(content);
    infoWindow.open(map, clickedMarker);
  }).fail(function(err) {
    content = "Failed to get information of location from foursquare.com";
    infoWindow.setContent(content);
    infoWindow.open(map, clickedMarker);
  });
}

var ViewModel = function () {
  self = this;

  this.displayedMuseums = ko.observableArray(museums.slice());

  this.museumClicked = function(museum) {
    markers.forEach(function(marker) {
      if (marker.title === museum.name) {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
          marker.setAnimation(null);
        }, 700);
        ShowInfoWindow(marker);
      }
    });
  };

  this.filterText = ko.observable("");

  this.filterTextChanged = function() {
    var latestFilterText = this.filterText().trim().toLowerCase();

    this.displayedMuseums.removeAll();
    if (latestFilterText === "") {
      for (i = 0; i < museums.length; i++) {
        this.displayedMuseums.push(museums[i]);
      }

      markers.forEach(function(marker) {
        marker.setMap(map);
      });
    } else {
      for (i=0; i < museums.length; i++) {
        if (museums[i].name.toLowerCase().includes(latestFilterText)) {
          this.displayedMuseums.push(museums[i])
        }
      }

      markers.forEach(function(marker) {
        if (marker.title.toLowerCase().includes(latestFilterText)) {
          marker.setMap(map);
        } else {
          marker.setMap(null);
        }
      });
    }
  }
};

ko.applyBindings(new ViewModel());
