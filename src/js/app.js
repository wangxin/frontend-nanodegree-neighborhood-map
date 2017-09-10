$("#closeBtn").click(function() {
  $("#leftPanel").addClass("hide");
});

$("#menuBtn").click(function() {
  $("#leftPanel").removeClass("hide");
});

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
  ]

var markers = [];
var map;

function initMap() {
  var locationSeattle = {lat: 47.610984, lng: -122.337031};
  map = new google.maps.Map(document.getElementById('mapContainer'), {
    zoom: 13,
    center: locationSeattle
  });

  setMarkers(map);
}

function setMarkers(map) {
  museums.forEach(function(museum) {
    var marker = new google.maps.Marker({
      position: {lat: museum.lat, lng: museum.lng},
      map: map,
      title: museum.name,
      animation: google.maps.Animation.DROP
    });

    marker.addListener('click', function() {
      self = this;
      this.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function() {
        self.setAnimation(null);
      }, 700);
    });

    markers.push(marker);
  });
}

var ViewModel = function () {
  this.museumList = ko.observableArray(museums);
};

ko.applyBindings(new ViewModel());
