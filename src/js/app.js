
$("#closeBtn").click(function() {
  $("#leftPanel").addClass("hide");
});

$("#menuBtn").click(function() {
  $("#leftPanel").removeClass("hide");
});

function initMap() {
  var seattle = {lat: 47.610984, lng: -122.337031};
  var map = new google.maps.Map(document.getElementById('mapContainer'), {
    zoom: 13,
    center: seattle
  });
}
