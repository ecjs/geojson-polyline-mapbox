mapboxgl.accessToken = 'pk.eyJ1Ijoic25hcHRyYW5zaXQtbWFyayIsImEiOiJjaXRtODJlNzQwMHRjMnpsNHFvd2kwbm41In0.JidXaQuSNK1MPA49jqeFMw';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v9',
  center: [-122.48453, 48.75676],
  zoom: 15
})

map.on('load', function () {

  map.addSource('line', {
    'data': '/json/line.geojson',
    'type': 'geojson'
  })

  map.addLayer({
    'id': 'line',
    'type': 'line',
    'source': 'line',
    'layout': {
        'line-join': 'round',
        'line-cap': 'round'
    },
    'paint': {
        'line-color': '#888',
        'line-width': 8
    }
  })
})
