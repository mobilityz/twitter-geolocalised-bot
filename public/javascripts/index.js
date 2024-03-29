$( document ).ready(function() {
  $(".post").hide();
  var socket = io();
  L.mapbox.accessToken = 'pk.eyJ1IjoiYmVuamFtaW5kaWdlb25lY290YWNvIiwiYSI6Im1pdV9yUjQifQ.M3A5WTfYy4tCAXOcZ60hig';
  var map = L.mapbox.map('map-one', 'examples.map-i86l3621').setView([50.80, 2.944336], 8);

  socket.on('tweet', function(response){
    $(".post").fadeOut(1000, function() {
        $(".post .post-photo > img").attr('src', '');
        $(".post .post-photo > img").attr('src', response.user_image);
        $(".post .post-text").html(response.message);
        $(".post .post-trigger").html(response.user_name);
        $(".post .post-location").html(response.place);
        $(".post").fadeIn(1000);
        if (response.geoJSON != null) {
            var point = L.mapbox.featureLayer().addTo(map).bindPopup("<div class='post-popup'><div class='post-photo'><img src='" + response.user_image + "' /><div class='post-trigger'>" + response.user_name + "</div><div class='post-location'>" + response.place + "</div></div><div class='post-text'>" + response.message + "</div></div>");
            point.setGeoJSON(response.geoJSON);
            map.setView([response.geoJSON.coordinates[1], response.geoJSON.coordinates[0]], 9);
        }
      });
  });
});
