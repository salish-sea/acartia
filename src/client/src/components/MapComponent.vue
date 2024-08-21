<template>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat)


export default {
    name: 'Map',
    data() {
        return {
            mapboxKey: process.env.VUE_APP_MAPBOX_KEY,
            mapView: null,
            geoJSONSightings: []
        }
    },
    created() {
        // Fetch data from server upon instance creation
        if (this.geoJSONSightings.length === 0) {
          console.log('loading sightings')
          this.loadSightings()
        } else {
          console.log('mapping sightings')
          this.mapSightings()
        }
    },
    mounted() {
        // Mounted to continuously monitor for changes
        //this.mapSightings()
    },
    updated() {
        // Mounted to continuously monitor for changes
        //this.mapSightings()
    },
    methods: {
      mapSightings() {
            // Grab access token for Mapbox
            mapboxgl.accessToken = this.mapboxKey

            // Initialise mapbox container
            const map = new mapboxgl.Map({
                container: 'mapContainer',
                style: 'mapbox://styles/mapbox/light-v10',
                center: [-122.312490, 47.951812],
                zoom: 7.0
            });

            // Add navigation buttons on top right of the map
            const nav = new mapboxgl.NavigationControl()
            map.addControl(nav, "top-right")

            // Cache map
            this.mapView = map
            // Resize map to fit into screen width
            this.mapView.resize()

            // Initialise sightings data into geoJSON format
            let geoData = {
                "type": "FeatureCollection",
                "features": this.geoJSONSightings
            }

            // Initialise months value to match integer date value in sightings from source/db
            const months = [
                '',
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ]

            const currentPage = this.getParent;
            const isHome = (this.$route.path === '/home')
            // On load event
            map.on('load', function() {
              const today = new Date();

                // Initialise default value for year and month
                let selectedYear = today.getFullYear()
                let selectedMonth = today.getMonth() + 1
                let selectedDay = today.getDate()

              // Set the defaults
              // update text in the UI
              if (!isHome) {
                const initText = (currentPage === 'Heatmap' ? months[selectedMonth-2]+ "-" + months[selectedMonth] + " " + selectedYear
                  : "Sightings displayed for " +selectedDay + " "+ months[selectedMonth] + " " + selectedYear)
                document.getElementById('active-date').innerText = initText

                // Initialise current date in slider
                if (currentPage === 'Visualiser') {
                  let daySlider = document.getElementById('day-slider')
                  let daySliderEpoch = today.getTime()

                  // Get current day and last two weeks date
                  let lastFourteenEpoch = new Date(dayjs(today).subtract(14, "day")).getTime()

                  // Set maximun and minimum range of slider as date and 14 days past, respectively.
                  daySlider.max = daySliderEpoch
                  daySlider.min = lastFourteenEpoch
                  daySlider.value = daySliderEpoch
                } else {
                  document.getElementById('year-list').value = selectedYear
                  document.getElementById('month-slider').value = selectedMonth
                }
              }
              if (currentPage === 'Heatmap') {
                map.addLayer({
                    id: 'ssemmi-heat-layer',
                    type: 'heatmap',
                    source: {
                      type: 'geojson',
                      data: geoData
                    },
                    minZoom: 0,
                    paint: {
                      // increase weight as diameter breast height increases
                      'heatmap-weight': [
                        'interpolate',
                        ['linear'],
                        ['get', 'no_sighted'],
                        1,
                        2,
                        3,
                        4
                      ],
                      // Increase the heatmap color weight weight by zoom level
                      // heatmap-intensity is a multiplier on top of heatmap-weight
                      'heatmap-intensity': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        3,
                        1,
                        4,
                        3
                      ],
                      // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
                      // Begin color ramp at 0-stop with a 0-transparancy color
                      // to create a blur-like effect.
                      'heatmap-color': [
                        'interpolate',
                        ['linear'],
                        ['heatmap-density'],
                        0,
                        'rgba(33,102,172,.1)',
                        0.2,
                        'rgb(103,169,207)',
                        0.4,
                        'rgb(209,229,240)',
                        0.6,
                        'rgb(253,219,199)',
                        0.8,
                        'rgb(233,156,119)',
                        1,
                        'rgb(227,67,86)'
                      ],
                      // Adjust the heatmap radius by zoom level
                      'heatmap-radius': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        10,
                        20,
                        30,
                        50
                      ],
                      // Transition from heatmap to circle layer by zoom level
                      'heatmap-opacity': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        6,
                        1,
                        9,
                        1
                      ]
                    },
                    filter: [
                      'all',
                      ['<=', ['to-number', ['get', 'month']], selectedMonth],
                      ['>=', ['to-number', ['get', 'month']], ['-', selectedMonth, 2]],
                      ['==', ['to-number', ['get', 'year']], selectedYear]
                    ]
                  }
                )
                // Listener function to monitor selected option for YEAR
                document.getElementById('year-list').addEventListener('change', (e) => {
                  try {
                    // Grab desired year
                    selectedYear = parseInt(e.target.value)
                    // update the map
                    changeSightingPreference()
                  } catch (error) {
                    console.log(error)
                  }
                })

                // Listener function to monitor selected option for MONTH
                document.getElementById('month-slider').addEventListener('input', (e) => {
                  try {
                    // Grab desired month
                    selectedMonth = parseInt(e.target.value)
                    // update the map
                    changeSightingPreference()
                  } catch (error) {
                    console.log(error)
                  }
                })
              } else {
                // Set layer to display sightings
                console.info('add map layer')
                map.addLayer({
                  id: 'ssemmi-map-layer',
                  type: 'circle',
                  source: {
                    type: 'geojson',
                    data: geoData
                  },
                  //minzoom: 14,
                  paint: {
                    // Set size of circle pinpoint based on how large the sighting is (all made same size for now, was 0 4 5 12)
                    'circle-radius': [
                      'interpolate',
                      ['linear'],
                      ['to-number', ['get', 'no_sighted']],
                      0, 5,
                      5, 5
                    ],
                    // Set colour of circle pinpoint based of number of sightings
                    'circle-color': [
                      'interpolate',
                      ['linear'],
                      ['to-number', ['get', 'days_ago']],
                      0, '#bb0314',
                      1, '#bd2e2e',
                      2, '#e70ca9',
                      3, '#9a0fce',
                      4, '#0f86dc',
                      5, '#1f39a7'
                    ],
                    'circle-opacity': 0.9
                  },
                  filter: [
                    'all',
                    ['==', ['to-number', ['get', 'day']], selectedDay],
                    ['==', ['to-number', ['get', 'month']], selectedMonth],
                    ['==', ['to-number', ['get', 'year']], selectedYear]
                  ]
                })

                if (!isHome) {
                  // Listener function to monitor selected option for DAY
                  document.getElementById('day-slider').addEventListener('input', (e) => {
                    try {
                      // Grab desired date
                      selectedDay = dayjs(parseInt(e.target.value)).date()
                      selectedMonth = dayjs(parseInt(e.target.value)).month() + 1
                      selectedYear = dayjs(parseInt(e.target.value)).year()
                      // update the map
                      changeSightingPreference()
                    } catch (error) {
                      console.log(error)
                    }
                  })
                }


              }
              // Action to change the sightings filter based on preference
                let changeSightingPreference = () => {
                    let preferenceFilter
                    let mapLayer
                    let innerText

                   if (currentPage === 'Heatmap') {
                     preferenceFilter = [
                       'all',
                       ['<=', ['to-number', ['get', 'month']], selectedMonth],
                       ['>=', ['to-number', ['get', 'month']], ['-', selectedMonth, 2]],
                       ['==', ['to-number', ['get', 'year']], selectedYear]
                       ]
                     mapLayer = 'ssemmi-heat-layer'
                     innerText = months[selectedMonth-2]+ "-" + months[selectedMonth] + " " + selectedYear

                   } else {
                     preferenceFilter = [
                       'all'
                     ]

                     mapLayer = 'ssemmi-map-layer'

                     if (!isHome) {
                       preferenceFilter.push(['==', ['to-number', ['get', 'day']], selectedDay])
                       preferenceFilter.push(['==', ['to-number', ['get', 'month']], selectedMonth])
                       preferenceFilter.push(['==', ['to-number', ['get', 'year']], selectedYear])
                       innerText = "Sightings displayed for " +selectedDay+ " " +months[selectedMonth]+ " " +selectedYear
                     }
                   }

                    // update the map
                    map.setFilter(mapLayer, preferenceFilter)

                    // update text in the UI
                    if (!isHome) {
                      document.getElementById('active-date').innerText = innerText
                    }
                }
                if (isHome) {
                  changeSightingPreference()
                }
            })

            // Click listener to display extra information upon clicking on a sightings point
            map.on('click', 'ssemmi-map-layer', function (e) {
                let coordinates = e.features[0].geometry.coordinates.slice();

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(
                            '<div class="container">'
                                +'<h5><b>'+e.features[0].properties.comments+'</b></h5>'
                                +'<p><b>Date: </b>'+e.features[0].properties.created+' (UTC +0)</p>'
                                +'<p><b>Species: </b>'+e.features[0].properties.type+'</p>'
                                +'<p><b>No Sighted: </b>'+e.features[0].properties.no_sighted+'</p>'
                                +'<p><b>Witness: </b>'+e.features[0].properties.witness+'</p>'
                                +'<p><b>Submitter: </b> '+e.features[0].properties.entity+'</p>'
                                +'<p><b>Date Added: </b> '+e.features[0].properties.ssemmi_date_added+'</p>'
                            +'</div>'
                            +'</div>'
                        )
                .addTo(map);
            })
      },
      loadSightings() {
            // Call the method to retreive data
            this.$store.dispatch("get_sightings")
            .then( (currSights) => {
                Object.values(currSights).forEach( (value) => {
                    // Create new array instance of two numbers for mapbox marker coordinate
                    if(value && value.created) {
                        // Check if the fields for the sighting is valid or compatible
                        let filtered_long = (isNaN(value.longitude)) ? 1 : value.longitude
                        let filtered_lat = (isNaN(value.latitude)) ? 1 : value.latitude
                        let filtered_sightings = (isNaN(value.no_sighted)) ? 1 : value.no_sighted
                        let filtered_date = dayjs('2011-01-01 20:00:00')
                        let days_ago = 0
                        let f_day = 1
                        let f_month = 1
                        let f_year = 2011
                        let f_epoch_date = new Date().getTime()

                        if(filtered_date.isValid()) {
                            filtered_date = dayjs(value.created.substr(0, 10).split(' ')[0], ['YYYY-MM-DD', 'MM/DD/YY', 'DD/MM/YY', 'D/M/YY'])
                            f_day = filtered_date.date()
                            f_month = filtered_date.month() + 1
                            f_year = filtered_date.year()
                            days_ago = dayjs().diff(filtered_date, 'day')
                            f_epoch_date = new Date(filtered_date).getTime()

                        }

                        const sightingEntry = {
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [filtered_long, filtered_lat]
                            },
                            "properties": {
                                "entity": value.data_source_entity,
                                "ssemmi_id": value.ssemmi_id,
                                "created": value.created,
                                "type": value.type,
                                "day": f_day,
                                "month": f_month,
                                "year": f_year,
                                "epoch_date": f_epoch_date,
                                "no_sighted": filtered_sightings,
                                "days_ago": days_ago.toString(),
                                "witness": value.data_source_witness,
                                "comments": value.data_source_comments,
                                "ssemmi_date_added": value.ssemmi_date_added,
                            }
                        }

                        this.geoJSONSightings.push(sightingEntry)
                    }
                })
              this.mapSightings()
            })
        }
    },
    computed: {
        isAuth() {
            return this.$store.state.isAuthenticated
        },
        getParent() {
          return this.$parent.$options.name
        }
    }
}
</script>

<style>
#mapContainer {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    position: relative;
}

#active-date {
    font-weight: bold;
}

#widget {
    position: fixed;
    width: 30%;
    top: 6vh;
    left: 1vh;
    margin: 10px;
    padding: 10px 20px;
    background-color: white;
    position: absolute;
}

.slider-class {
  margin-left: 5%;
  font-size: 1rem;
}

.widget-row {
  height: 12px;
  width: 100%;
}

.colors {
  background: linear-gradient(to right, #bb0314, #bd2e2e, #e70ca9, #9a0fce, #0f86dc, #1f39a7);
}

.label {
  width: 15%;
  display: inline-block;
  text-align: center;
}
</style>
