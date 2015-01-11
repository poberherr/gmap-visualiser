function initialize() {
    var latitude = 57.95,
    longitude = 14.65,
    center = new google.maps.LatLng(latitude,longitude),
    bounds = new google.maps.Circle({center: center}).getBounds(),
    mapOptions = {
        center: center,
        zoom: 9,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false
    };

    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    allMarkers = getMarkersFromJsonFile();
    console.log('allMarkers:' + allMarkers);
    addAllMarkers(allMarkers, map);
}

function getMarkersFromJsonFile(){
    var marker = (function () {
        var json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': "route-markers.json",
            'dataType': "json",
            'success': function (data) {
                marker = data;
            }
        });
        console.log('marker' + marker);
        return marker;
    })();
    return marker;
}

function addAllMarkers(markers, map){
    //loop between each of the json elements
    for (var i = 0, length = markers.length; i < length; i++) {
        var data = markers[i],
        latLng = new google.maps.LatLng(data.lat, data.lng);

        // Creating a marker and putting it on the map
        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: data.content
        });
        infoBox(map, marker, data);
    }
}

function infoBox(map, marker, data) {
    var infoWindow = new google.maps.InfoWindow();
    // Attaching a click event to the current marker
    google.maps.event.addListener(marker, "click", function(e) {
        infoWindow.setContent(data.content);
        infoWindow.open(map, marker);
    });

    // Creating a closure to retain the correct data
    // Note how I pass the current data in the loop into the closure (marker, data)
    (function(marker, data) {
        // Attaching a click event to the current marker
        google.maps.event.addListener(marker, "click", function(e) {
            infoWindow.setContent(data.content);
            infoWindow.open(map, marker);
        });
    })(marker, data);
}

google.maps.event.addDomListener(window, 'load', initialize);
