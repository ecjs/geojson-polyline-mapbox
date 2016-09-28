const axios = require('axios')
const express = require('express')
const app = express()
const polyline = require('polyline')
const jsonfile = require('jsonfile')
const geojson = require('geojson')

const start = '48.75676, -122.48376'
const end = '48.75674, -122.48374'
const waypoints = [[48.75725, -122.48453], [48.75872, -122.48676], [48.75981, -122.48844], [48.7618, -122.48542], [48.7593, -122.48152], [48.75785, -122.47927], [48.75583, -122.48225]]

const encodedPolyline = polyline.encode(waypoints)

app.use('/json', express.static(__dirname + '/json'))
app.use('/js', express.static(__dirname + '/js'))

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`)
})

axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${end}&waypoints=enc:${encodedPolyline}:`)
  .then((response) => {
    const pointsArray = []
    //decode the encoded polyline from Google
    const points = polyline.decode(response.data.routes[0].overview_polyline.points)
    // rearrange the points so that the longitude is first [longitude, latitude]
    for (let point of points) {
      pointsArray.push([point[1], point[0]])
    }
    const lineObject = [{line: pointsArray}]
    const geoData = geojson.parse(lineObject, {LineString: 'line'})
    jsonfile.writeFile('./json/line.geojson', geoData, (err) => {
      if (err) return console.log(err)

      app.listen(8000, () => {
        console.log('Listenting on 8000')
      })

    })
  }).catch(err => console.log('err:', err))

