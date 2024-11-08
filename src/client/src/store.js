import { createStore } from 'vuex'
import axios from 'axios'
import IPFS from 'ipfs'
import OrbitDB from 'orbit-db'
import { filterSightingData, filterTableData, sortApiDataChronologically, getSpeciesAndContributors, transformApiDataToMappableData } from './mapUtils'
import { generateInitFilterState } from "./constants"

const store = createStore(
  {
    state: {
      //User state
      isAuthenticated: false,
      token: null,
      userDetails: [],
      isAdmin: false,
      userRequestList: [],

      //Data state
      sightings: [],
      filteredSightings: [],
      lastSighting: undefined,
      loading: false,
      error: null,

      //Map state
      mapFilters: generateInitFilterState(7, 1),
      mapOptions: {
        contributors: [],
        species: [],
      },
      map: null,
      activeMapLayer: "ssemi-map-layer",

      // Hydrophones
      hydrophones: [],
      hydrophonesVisibility: 'none',

      // Table view state
      tableFilters: generateInitFilterState(1, 1),
      tableSightings: [],

      // Notifications
      toasts: [],
    },
    mutations: {
      //App state
      setLoading(state, isLoading) {
        state.loading = isLoading;
      },
      setError(state, error) {
        state.error = error;
      },

      //User state
      setAuthentication(state, status) {
        state.isAuthenticated = status
      },
      setUserToken(state, token) {
        state.token = token
      },
      setUserDetails(state, userData) {
        state.userDetails = userData
      },
      setIsAdmin(state, status) {
        state.isAdmin = status
      },
      setUserRequestList(state, list) {
        state.userRequestList = list
      },
      setUserList(state, list) {
        state.userList = list
      },
      setTokenList(state, list) {
        state.tokenList = list
      },
      setProfile(state, profile) {
        state.profile = profile
      },

      //Sightings state
      setSightings(state, sightings) {
        state.sightings = sightings
        state.filteredSightings = sightings
      },
      setFilteredSightings(state, sightings) {
        state.filteredSightings = sightings
      },
      emptySightings(state) {
        state.sightings = []
        state.filteredSightings = []
      },
      setLastSighting(state, sighting) {
        //Not required to set when refetching data on auth status change
        //as it will be the same last sighting
        if (!state.lastSighting) {
          state.lastSighting = sighting
        }
      },

      //Map state
      setMap(state, map) {
        state.map = map
      },
      setMapOptions(state, options) {
        state.mapOptions = options
      },
      setActiveMapLayer(state, layer) {
        state.activeMapLayer = layer
      },
      setFilterVerifiedOnly(state, verifiedStatus) {
        state.mapFilters.verifiedOnly = verifiedStatus
      },
      setFilterSpecies(state, newSpecies) {
        state.mapFilters.species = newSpecies
      },
      setFilterContributor(state, contributor) {
        state.mapFilters.contributor = contributor
      },
      setFilterDateBegin(state, dateBegin) {
        state.mapFilters.dateBegin = dateBegin
      },
      setFilterDateEnd(state, dateEnd) {
        state.mapFilters.dateEnd = dateEnd
      },
      applyMapFilters(state) {
        let filteredData = filterSightingData(state.sightings, state.mapFilters)
        state.filteredSightings = filteredData

        //Rerender map
        if (state.map && state.map.getSource(state.activeMapLayer)) {
          state.map.getSource(state.activeMapLayer).setData({
            "type": "FeatureCollection",
            "features": state.filteredSightings
          })
        }
      },
      resetMapFilters(state) {
        state.mapFilters = generateInitFilterState(7, 1)
        state.filteredSightings = filterSightingData(state.sightings, state.mapFilters)

        //Rerender map
        if (state.map && state.map.getSource(state.activeMapLayer)) {
          state.map.getSource(state.activeMapLayer).setData({
            "type": "FeatureCollection",
            "features": state.filteredSightings
          })
        }
      },

      //Reports table state
      setTableFilterSpecies(state, species) {
        state.tableFilters.species = species
      },
      setTableFilterContributor(state, contributor) {
        state.tableFilters.contributor = contributor
      },
      setTableFilterDate(state, date) {
        state.tableFilters.dateBegin = date
        state.tableFilters.dateEnd = date
      },
      applyTableFilters(state) {
        state.tableSightings = filterTableData(state.sightings, state.tableFilters)
      },
      setHydrophones(state, hydrophones) {
        state.hydrophones = hydrophones;
      },
      setHydrophonesVisibility(state, visibility) {
        state.hydrophonesVisibility = visibility;
      },
      addToast(state, toast) {
        state.toasts.push(toast);

        const duration = 2000;

        setTimeout(() => {
          state.toasts = state.toasts.filter((t) => t.id !== toast.id);
        }, duration)
      }
    },
    getters: {
      getTableSightings: state => {
        return state.tableSightings
      },
      getUserAuthStatus: state => {
        return state.isAuthenticated
      },
      getUserToken: state => {
        return state.token
      },
      getProfile: state => {
        return state.profile
      },
      getUserDetails: state => {
        return state.userDetails.user
      },
      getUserRequestList: state => {
        return state.userRequestList
      },
      getFilteredSightings: state => {
        return state.filteredSightings
      },
      getSightings: state => {
        return state.sightings
      },
      getLastSighting: state => {
        return state.lastSighting
      },
      getFilteredSightingsLength: state => {
        if (!state.filteredSightings) {
          return 0
        }
        return state.filteredSightings.length
      },
      getMapFilters: state => {
        return state.mapFilters
      },
      getMapOptions: state => {
        return state.mapOptions
      },
      getSpeciesLegendOptions: state => {
        let visibleSpecies = new Set()
        state.filteredSightings.map(sighting => {
          visibleSpecies.add(sighting.properties.type)
        })
        return [...visibleSpecies]
      },
      getHydrophones: state => {
        return state.hydrophones;
      },
      getHydrophonesVisibility: state => {
        return state.hydrophonesVisibility;
      }
    },
    actions: {
      async fill_store({ commit }) {
        commit('setLoading', true);

        try {
          let requestAuth = {}
          let endpoint
          // Check if user has access token
          if (store.state.userDetails.token) {
            endpoint = '/v1/sightings'
            // Format the token into header for requesting sightings requests
            requestAuth.headers = {
              'Authorization': 'Bearer ' + process.env.VUE_APP_MASTER_KEY,
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          } else {
            endpoint = '/v1/sightings/current'
            requestAuth.headers = {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }

          // Pass headers of admin to retreive user requests
          let sightings = await axios.get(`${process.env.VUE_APP_WEB_SERVER_URL}${endpoint}`, requestAuth)

          //sort data first then grab reference to the most recent sighting for the reports page
          let dataPoints = sortApiDataChronologically(sightings.data)

          let lastSighting = Object.assign({}, dataPoints[dataPoints.length - 2])
          commit("setLastSighting", lastSighting)

          dataPoints = transformApiDataToMappableData(dataPoints)
          let { speciesList, contributorList } = getSpeciesAndContributors(dataPoints)

          //Commit filter options to store
          commit("setMapOptions", {
            contributors: contributorList,
            species: speciesList
          })

          //Commit sightings to store
          commit("setSightings", dataPoints)

          //Apply default filters on first render.
          //Reduces initial page load by only mapping previous 7 days of data.
          commit("applyMapFilters")

        } catch (error) {
          commit('setError', error);
        } finally {
          commit('setLoading', false);
        }
      },
      // Check session data upon creation or refresh
      init_store({ commit }) {
        const userToken = sessionStorage.getItem('userToken')
        if (userToken) {
          commit('setAuthentication', true)
          commit('setUserToken', userToken)
        }
      },
      // Login request
      auth_request({ commit }, data) {
        return new Promise((resolve, reject) => {
          const requestOpts = {
            'access_token': process.env.VUE_APP_MASTER_KEY
          }
          //Header post method to authenticate login by passing login details
          axios.post(`${process.env.VUE_APP_WEB_SERVER_URL}/v1/auth/`, requestOpts, {
            auth: {
              username: data.email,
              password: data.password
            }
          })
            // Retreive token and redirect to requested page
            .then(user => {
              //TODO: fix  this hacky way to trigger rerender on auth status change
              commit('emptySightings')
              // Route protection to the next page
              commit('setAuthentication', true)
              // Save retreived token to state and session storage
              commit('setUserToken', user.data.token)
              // Set user data
              commit('setUserDetails', user.data)
              // Check role
              if (user.data.user.role != 'admin') {
                commit('setIsAdmin', false)
              } else {
                commit('setIsAdmin', true)
              }
              sessionStorage.setItem('userToken', user.data.token)

              // TODO: should we be using session or local storage??
              sessionStorage.setItem('userDetails', JSON.stringify(user.data));

              // Login success

              resolve("Login successful!")
            })
            // Check for request errors
            .catch(err => {
              // Initialise error message if server is having problems
              let errMsg = "Something went wrong! Please try again shortly."

              // Clear authentication
              commit('setUserToken', null)
              commit('setAuthentication', false)

              // Clear token
              sessionStorage.removeItem('userToken')

              sessionStorage.removeItem('userDetails');

              // Check network and set error message if network is inactive
              if (!err.response) {
                errMsg = "There is a network error, Please try again shortly."
              } else {
                // Set error message if user details do not match
                if (err.response.status == 400) {
                  errMsg = "Your username or password did not match, please try again."
                }
              }

              reject(errMsg)
            })
        })
      },
      // Logout method
      auth_logout({ commit }) {
        return new Promise((resolve) => {
          if (sessionStorage.getItem('userToken') != null) {
            commit('setUserToken', null)
            commit('setUserDetails', {})
            commit('setAuthentication', false)
            commit('setSightings', [])
            commit('setFilteredSightings', [])
            commit('setIsAdmin', false)
            sessionStorage.clear()
          }
          resolve('Logged out')
        })
      },
      get_user_requests({ commit }) { //DEPRECATED
        return new Promise((resolve, reject) => {
          // Check if user has admin priviledges
          if (store.state.isAdmin) {
            // Format the admin level header for requesting user requests
            const requestAuth = {
              headers: {
                'Authorization': 'Bearer ' + store.state.userDetails.token,
                'Content-Type': 'application/json'
              }
            }

            // Pass headers of admin to retreive user requests
            axios.get(`${process.env.VUE_APP_WEB_SERVER_URL}/v1/users/requests`, requestAuth)
              // Add list of users into the store of user requests
              .then(users => {
                commit('setUserRequestList', users.data)
                resolve(users)
              })
              .catch(err => {
                console.error(err)
                reject()
              })
          } else {
            // Show error if access to it fails
            const errMsg = 'Sorry you are not authorised to fetch the data'
            alert(errMsg)
            throw console.error(errMsg)
          }
        })
      },
      get_users({ commit }) {
        return new Promise((resolve, reject) => {
          // Check if user has admin priviledges
          if (store.state.isAdmin) {
            // Format the admin level header for requesting user requests
            const requestAuth = {
              headers: {
                'Authorization': 'Bearer ' + store.state.userDetails.token,
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }

            // Pass headers of admin to rtrieve users
            axios.get(`${process.env.VUE_APP_WEB_SERVER_URL}/v1/users`, requestAuth)
              // Add list of users into the store of users
              .then(users => {
                commit('setUserList', users.data)
                resolve(users)
              })
              .catch(err => {
                console.error(err)
                reject()
              })
          } else {
            // Show error if access to it fails
            const errMsg = 'Sorry you are not authorised to fetch the data'
            alert(errMsg)
            throw console.error(errMsg)
          }
        })
      },
      get_user_tokens({ commit }) {
        return new Promise((resolve, reject) => {

          // Format the admin level header for requesting user requests
          const requestAuth = {
            headers: {
              'Authorization': 'Bearer ' + store.state.userDetails.token,
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }

          // Pass headers of admin to rtrieve users
          axios.get(`${process.env.VUE_APP_WEB_SERVER_URL}/v1/users/${store.state.userDetails.user.id}/tokens`, requestAuth)
            // Add list of users into the store of users
            .then(tokens => {
              commit('setTokenList', tokens.data)
              resolve(tokens)
            })
            .catch(err => {
              console.error(err)
              reject()
            })
        })
      },
      // eslint-disable-next-line no-unused-vars
      create_token({ commit }, tokenName) {
        return new Promise((resolve, reject) => {
          const requestAuth = {
            headers: {
              'Authorization': 'Bearer ' + store.state.userDetails.token,
              //'Content-Type': 'application/x-www-form-urlencoded'
            }
          }

          //Header post method to authenticate login by passing login details
          axios.post(`${process.env.VUE_APP_WEB_SERVER_URL}/v1/users/${store.state.userDetails.user.id}/tokens`,
            {
              name: tokenName
            },
            requestAuth
          )
            .then(token => {
              resolve(token)
            })
            // Check for request errors
            .catch(err => {
              // Initialise error message if server is having problems
              let errMsg = "Something went wrong! Please try again shortly."

              // Check network and set error message if network is inactive
              if (!err.response) {
                errMsg = "There is a network error, Please try again shortly."
              }
              reject(errMsg)
            })
        })
      },
      // eslint-disable-next-line no-unused-vars
      update_profile({ commit }, formData) {
        return new Promise((resolve, reject) => {
          const requestAuth = {
            headers: {
              'Authorization': 'Bearer ' + store.state.userDetails.token,
              //'Content-Type': 'application/x-www-form-urlencoded'
            }
          }

          //Header post method to authenticate login by passing login details
          axios.post(`${process.env.VUE_APP_WEB_SERVER_URL}/v1/users/${store.state.userDetails.user.id}/profile`,
            formData,
            requestAuth
          )
            .then(profile => {
              commit('setProfile', profile.data)
              resolve(profile)
            })
            // Check for request errors
            .catch(err => {
              // Initialise error message if server is having problems
              let errMsg = "Something went wrong! Please try again shortly."

              // Check network and set error message if network is inactive
              if (!err.response) {
                errMsg = "There is a network error, Please try again shortly."
              }
              reject(errMsg)
            })
        })
      },
      async get_ipfs_sightings({ commit }) {
        try {
          // optional settings for the ipfs instance
          const ipfsOptions = {
            repo: './ipfs',
            EXPERIMENTAL: { pubsub: true },
            preload: { enabled: false },
            config: {
              Addresses: {
                Swarm: [
                  '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
                  '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
                  '/dns4/webrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/',
                  '/dns4/libp2p-rdv.vps.revolunet.com/tcp/443/wss/p2p-webrtc-star/'
                ]
              }
            }
          }

          // Create IPFS instance with optional config
          const ipfs = await IPFS.create(ipfsOptions)

          // Create OrbitDB instance
          const orbitdb = await OrbitDB.createInstance(ipfs)

          // Connect to the peer id of the backend orbitdb database (NOTE: this will be an env variable)
          await orbitdb._ipfs.swarm.connect('/ip4/127.0.0.1/tcp/4003/ws/p2p/QmWdwcHK2ih8VzP9jacLPKGBdmxzZf1F3Nvo9pqj5Q4QcN')

          // create database
          const db2 = await orbitdb.docs('/orbitdb/zdpuB2kQmxqdBZvCZDxU5SmzxLt9xnDvyjPQnMSuqrrLuYVrQ/ssemmi-api-ingestor')

          // Emit log message when db has synced with another peer
          db2.events.on('replicated', (address) => {
            console.log(address)
            const getData = db2.get('')
            // Set data from synchronisation into store
            commit('setSightings', getData)
          })

          // Emit a log message upon synchronisation with another peer
          db2.events.on('write', (address, entry) => {
            console.log(`
                ${address} Database to write. \n
                Entry: ${entry}.
              `)
          })

          // Emit a error message upon error handling if something happens during the creation of the IPFS node.
          db2.events.on('error', (error) => {
            console.log(`Database creation error: \n ${error}.`)
          })

          //Load locally persisted db state from memory
          await db2.load()

          console.info(`The location of the database is ${db2.address.toString()}`)

          // Log message upon successful db setup
          console.log("Database setup successful! \n")

        } catch (e) {
          console.log(e)
        }
      },
      get_sightings() {
        return new Promise((resolve, reject) => {
          let requestAuth = {}
          let endpoint
          // Check if user has access token
          if (store.state.userDetails.token) {
            endpoint = '/v1/sightings'
            // Format the token into header for requesting sightings requests
            requestAuth.headers = {
              'Authorization': 'Bearer ' + process.env.VUE_APP_MASTER_KEY,
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          } else {
            endpoint = '/v1/sightings/current'
            requestAuth.headers = {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }

          // Pass headers of admin to retreive user requests
          axios.get(`${process.env.VUE_APP_WEB_SERVER_URL}${endpoint}`, requestAuth)
            // Add list of users into the store of user requests
            .then(sightings => {
              resolve(sightings.data)
            })
            .catch(err => {
              console.error(err)
              reject()
            })
        })
      },
      get_data_export() {
        return new Promise((resolve, reject) => {
          let options = {}
          const endpoint = '/v1/sightings/export'
          // Format the token into header for requesting sightings requests
          options.headers = {
            'Authorization': 'Bearer ' + process.env.VUE_APP_MASTER_KEY,
            'Content-Type': 'application/x-www-form-urlencoded'
          }

          options.responseType = 'blob'

          axios.get(`${process.env.VUE_APP_WEB_SERVER_URL}${endpoint}`, options)
            .then(res => {
              resolve(res)
            })
            .catch(err => {
              console.error(err)
              reject()
            })
        })
      },

      // eslint-disable-next-line no-unused-vars
      forgot_password({ commit }, formData) {
        return new Promise((resolve, reject) => {
          let payload = {
            email: formData.email,
            link: "google.com",
          };

          let options = {
            headers: {
              'Authorization': 'Bearer ' + process.env.VUE_APP_MASTER_KEY,
              'Content-Type': 'application/json',
            },
          };

          axios.post(`${process.env.VUE_APP_WEB_SERVER_URL}/v1/password-resets/`, payload, options)
            .then(res => {
              console.log(res);
              resolve(res);
            })
            .catch(err => {
              console.error(err);
              let errMsg = "Error, please try again later";
              if (err.response.status === 500) {
                errMsg = "Internal Server Error";
              }
              reject(errMsg);
            })
        });
      },

      //eslint-disable-next-line no-unused-vars
      async reset_password({ commit }, password) {
        console.log("DEBUG new password: " + password);
        let payload = {
          password: password
        };

        let options = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await axios.put(`${process.env.VUE_APP_WEB_SERVER_URL}/v1/password-resets/`, payload, options);
        return response;
      },

      async get_hydrophone_data({ commit }) {
        return new Promise((resolve, reject) => {
          let body = {
            query: `{
              feeds {
                id
                name
                latLng {
                  lat
                  lng
                }
              }
            }`
          }

          let options = {
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
          }

          axios.post("https://live.orcasound.net/graphql", body, options)
            .then(res => {
              let hydrophoneGeoJSON = [];

              for (const feed of res.data.data.feeds) {
                const entry = {
                  "type": "Feature",
                  "geometry": {
                    "type": "Point",
                    "coordinates": [feed.latLng.lng, feed.latLng.lat]
                  },
                  "properties": {
                    "name": feed.name,
                  }
                };
                hydrophoneGeoJSON.push(entry);
              }
              commit('setHydrophones', hydrophoneGeoJSON);
              resolve('success');
            })
            .catch(err => {
              console.error(err);
              reject(err);
            })
        });
      },
      restore_user_details({ commit }) {
        // TODO: logout if no user details in session storage
        if (!this.getters.getUserDetails && sessionStorage.getItem('userDetails')) {
          const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
          commit('setUserDetails', userDetails);
        }
      },

      createToast({ commit }, toast) {
        const toastId = Date.now().toString(36) + Math.random().toString(36).slice(2);
        const newToast = {
          id: toastId,
          message: toast.message,
          status: toast.status,
        };

        commit('addToast', newToast);
      },

    },
  }
)

export default store
