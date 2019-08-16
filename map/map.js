    var isDataLoaded = false;
    var isStyleLoaded = false;
    var markers;

    mapboxgl.accessToken = 'pk.eyJ1IjoibGFpbiIsImEiOiJjaWhzbHBpMXMwMHNldGdtMWgxbGp4aWRoIn0.BE_Fxskfnqumxa_5FLBWcA';

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [0,0],
        zoom: .7,
        hash: true,
    });

    var loadMap = function () {
       // Add marker data as a new GeoJSON source.
       map.addSource("markers", {
          "type": "geojson",
          "data": markers
       });

        // Load image for pin
        map.loadImage('/img/marker.png', function(error, image) {
            if (error) throw error;
            map.addImage('pin', image);
            // Add a layer showing the markers.
            map.addLayer({
                "id": "markers",
                "interactive": true,
                "type": "symbol",
                "source": "markers",
                "layout": {
                    "icon-image": "pin",
                    "icon-size": .6,
                    "icon-allow-overlap": true,
                }
            });
        });

       // When a click event occurs near a marker icon, open a popup at the location of
       // the feature, with description HTML from its properties.
       map.on('click', function (e) {
           var bboxSize = 25;
           var bbox = [[e.point.x - bboxSize, e.point.y - bboxSize], [e.point.x + bboxSize, e.point.y + bboxSize]];
           var features = map.queryRenderedFeatures(bbox, { layers: ['markers'] });

           if (!features.length) {
               return;
           }

           var feature = features[0];

           // Populate the popup and set its coordinates
           // based on the feature found.
           var popup = new mapboxgl.Popup()
              .setLngLat(feature.geometry.coordinates)
              // Should look like:
              // <h4>Church Name</h4>
              // Address (links to Google Maps to open maps externally)
              // Website (links to the appropriate url)
              // Note
              .setHTML('<h4>'+feature.properties.name+'</h4>'  + '<div id="address"><a href="https://www.google.com/maps/search/?api=1&query=' + feature.properties.address + '">' + feature.properties.address + '</a></div>' + '<div id="website"><a href="'+feature.properties.website+'">'+feature.properties.website+'</a></div>' + '<p>' + feature.properties.note + '</p>')
              .addTo(map);

           // Pan to clicked marker
           if (features.length) {
              // Get coordinates from the symbol and center the map on those coordinates
              map.flyTo({
                 center: features[0].geometry.coordinates,
                 speed: 0.3
              });
           }
       });

       // Use the same approach as above to indicate that the symbols are clickable
       // by changing the cursor style to 'pointer'.
       map.on('mousemove', function (e) {
          var features = map.queryRenderedFeatures(e.point, { layers: ['markers'] });
          map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
       });

    // disable map rotation using right click + drag
    map.dragRotate.disable();

    // disable map rotation using touch rotation gesture
    map.touchZoomRotate.disableRotation();

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl, 'top-left');

    function forwardGeocoder(query) {
        var matchingFeatures = [];
        for (var i = 0; i < markers.features.length; i++) {
            var feature = markers.features[i];
            // handle queries with different capitalization than the source data by calling toLowerCase()
            if (feature.properties.name.toLowerCase().search(query.toLowerCase()) !== -1) {
                // add a church emoji as a prefix for custom data results
                feature['text'] = '⛪ ' + feature.properties.name;
                feature['center'] = feature.geometry.coordinates;
                feature['place_name'] = feature.properties.address;
                //feature['place_type'] = feature.properties.region;
                matchingFeatures.push(feature);
            }
        }
        return matchingFeatures;
    }

    // Add geocoder
    map.addControl(new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        localGeocoder: forwardGeocoder,
        placeholder: "Search",
        limit: 5,
        collapsed: true,
        marker: false,
        render: function(item) {
            return '<div class="mapboxgl-ctrl-geocoder--suggestion"><div class="mapboxgl-ctrl-geocoder--suggestion-title">' + item.text + '</div><div class="mapboxgl-ctrl-geocoder--suggestion-address">' + item.place_name + '</div></div>';
        },
        //mapboxgl: mapboxgl
    }));

    // Add geolocate control
    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        fitBoundsOptions: {
            maxZoom:8
        },
        trackUserLocation: true
    }), 'top-left');

    }

    // Load GeoJSON data

    var shouldLoadMap = function () {
       return isDataLoaded && isStyleLoaded
    }

    jQuery.getJSON("data.json", function(json) {
          markers = json;
          isDataLoaded = true;
          if (shouldLoadMap()) {
             loadMap()
          }
    })

    map.on('style.load', function () {
       isStyleLoaded = true;
       if (shouldLoadMap()) {
          loadMap()
       }
    });
