<template>
  <div class="upload-container">
    <div class="header">
      <h1>Upload Sightings</h1>
    </div>
    <Tabs>
      <Tab title="Manual Upload">
        <div id="manual-upload">
          <form class="manual-form">
            <div class="input">
              <label>Date Sighted*</label>
              <input type="datetime-local" @change="formatDateForAPI" required>
            </div>
            <div class="input">
              <label>Latitude*</label>
              <input type="text" v-model="sighting.latitude" required>
            </div>
            <div class="input">
              <label>Longitude*</label>
              <input type="text" v-model="sighting.longitude" required>
            </div>

            <div class="input">
              <label>Species*</label>
              <select v-model="sighting.type" required>
                <option value="" disabled>Select a species</option>
                <option v-for="species in speciesList" :key="species" :value="species.species">
                  {{ species.species }}
                </option>
              </select>
            </div>
            <div class="input">
              <label>Pod</label>
              <input type="text" v-model="sighting.pod">
            </div>
            <div class="input">
              <label>Number Sighted*</label>
              <input type="number" v-model="sighting.no_sighted" required>
            </div>
            <div class="input">
              <label>Additional notes</label>
              <textarea v-model="sighting.data_source_comments"></textarea>
            </div>
            <div class="input">
              <input type="submit" id="submit-btn" value="Upload sighting" @click.prevent="uploadSighting">
            </div>
          </form>
        </div>

      </Tab>

      <Tab title="File Upload">
        <div class="file-upload">
          <div class="file-msg">
            <p>Import your data as a csv file.</p>
            <p>Use the template to format your data before uploading.</p>
          </div>

          <label class="file-upload-button">
            Select File
            <input type="file" id="fileInput" @change="onFileChange">
          </label>

          <button class="btn btn-primary" id="upload-btn" type="submit" @click="submitFile" :disabled="!fileReady">
            <span>Upload File</span>
            <img src="@/assets/white-upload.svg" alt="Upload Icon" class="upload-icon" />
          </button>
          <a class="btn btn-primary" @click="downloadTemplate" data-mdb-ripple-init role="button" id="download-btn">
            <span>Download Template</span>
            <img src="@/assets/download-blue.svg" alt="Download Icon" class="download-icon" />
          </a>
          <div class="download-btn"></div>
        </div>
      </Tab>
    </Tabs>


    <div class="links">

      <h2>Want to do more? Check out these links!</h2>
      <div class="row">
        <a class="a" data-mdb-ripple-init href="/integrate" role="button" id="btns">
          <img src="@/assets/htc-icon.svg" alt="Hand Icon" class="cont-icon" />
          How to Contribute
          <img src="@/assets/right-icon.svg" alt="Right Icon" class="righticon" />
          <span>New to uploading data? Click here to learn how you can provide data.</span>
        </a>
        <a class="btn btn-primary" data-mdb-ripple-init href="https://github.com/salish-sea/acartia" target="_blank"
          role="button" id="btns">
          <img src="@/assets/git-icon.svg" alt="GitHub Icon" class="cont-icon" />
          Github
          <img src="@/assets/right-icon.svg" alt="Right Icon" class="righticon" />
          <span>Integrate your application with Acartia.</span>
        </a>
        <a class="btn btn-primary" data-mdb-ripple-init href="/contact-us" role="button" id="btns">
          <img src="@/assets/right-icon.svg" alt="Right Icon" class="righticon" />
          <img src="@/assets/mail-icon.svg" alt="Mail Icon" class="cont-icon" />
          Contact us
          <span>Get in touch with Acartia.</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Tabs from './UploadPageComponents/Tabs.vue'
import Tab from './UploadPageComponents/Tab.vue'
import axios from 'axios'

export default {
  components: {
    Tabs,
    Tab
  },

  data() {
    return {
      fileReady: false,
      file: null,
      tokens: [],
      alert: {
        show: false,
        message: null,
        type: null,
      },
      sighting: {
        data_source_witness: this.$store.state.userDetails.user.name,
        data_source_comments: "",
        data_source_entity: "",
        data_source_name: "Spotter-API",
        no_sighted: "",
        latitude: "",
        longitude: "",
        trusted: 0,
        type: '',
        created: "",
      },
      speciesList: [
        { species: 'Orca' },
        { species: 'Humpback' },
        { species: 'Gray Whale' },
        { species: 'Harbor Porpoise' },
        { species: 'Minke Whale' },
        { species: 'Fin Whale' },
        { species: "Dall's Porpoise" },
        { species: 'Blue Whale' },
        { species: 'Other (Write in Comments)' }
      ]
    };
  },
  methods: {
    formatDateForAPI(event) {
      let [date, time] = event.target.value.split("T")
      this.sighting.created = [date, [time, ":00"].join("")].join(" ")
    },
    async uploadSighting() {
      if (this.tokens.length === 0) {
        this.$store.commit("addToast", { message : "You Must First Generate an API Token Before Uploading", status : "error"} )
        return
      } else if (!this.validateForm()) {
        this.$store.commit("addToast", { message : "Please Fill Out All The Fields Before Submitting", status : "error"} )
        return
      }

      let requestAuth = {
        headers: {
          'Authorization': 'Bearer ' + this.tokens[0].token,
          'Content-Type': 'application/json'
        }
      }

      try {
        await axios.post(`${process.env.VUE_APP_WEB_SERVER_URL}/v1/sightings`, this.sighting, requestAuth)
        this.clearForm()
        this.$store.commit("addToast", { message : "Successfully Uploaded Sighting", status : "success"} )
      } catch (error) {
        this.$store.commit("addToast", { message : "Error Uploading Sighting", status : "error"} )
      }
    },
    downloadTemplate() {
      event.preventDefault()
      const request = {
        headers: {
          'Authorization': 'Bearer ' + this.tokens[0].token,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }

      axios.get(`${process.env.VUE_APP_WEB_SERVER_URL}/v1/sightings/import/getTemplate`, request)
        .then(res => {
          const fileUrl = window.URL.createObjectURL(new Blob([res.data]))
          const fileLink = document.createElement('a')
          fileLink.href = fileUrl
          fileLink.setAttribute('download', 'acartia-import-template.csv')
          document.body.appendChild(fileLink)
          fileLink.click()
        })
    },
    getUserTokens() {
      this.$store.dispatch("get_user_tokens")
        .then(res => {
          let getList = JSON.parse(JSON.stringify(res.data))
          this.tokens = [];
          for (let i = 0; i < getList.length; i++) {
            let tokenMap = {
              name: getList[i].name,
              token: getList[i].token,
            }
            this.tokens.push(tokenMap)
          }
        })
    },
    clearForm() {
      this.sighting = {
        data_source_witness: "",
        data_source_comments: "",

        //Private user - not an organisation
        data_source_entity: "",
        data_source_name: "Spotter-API",
        no_sighted: "",
        latitude: "",
        longitude: "",
        trusted: 0,
        type: "",
        created: "",
        photo_url: "",
      }
    },
    validateForm() {
      if (
        !this.sighting.created ||
        !this.sighting.latitude ||
        !this.sighting.longitude ||
        !this.sighting.type ||
        !this.sighting.no_sighted
      ) { return false } else { return true }
    },
    submitFile() {
      // Check for event error to prevent propagation
      event.preventDefault()
      const request = {
        headers: {
          'Authorization': 'Bearer ' + this.tokens[0].token,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }

      let formData = new FormData()
      formData.append('file', this.file)

      axios.post(`${process.env.VUE_APP_WEB_SERVER_URL}/v1/sightings/import`, formData, request)
        .then(impRes => {
          console.log(`Imported ${impRes.data}`)
          this.$store.commit("addToast", { message : "Your records have been successfully imported", status : "success"} )
        })
        // Check for request errors
        .catch((err) => {
          console.log(err)
        this.$store.commit("addToast", { message : "There was an error importing your records. Please check your file and try again", status : "error"} )
        })
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      let ext = files[0].name.split('.').pop()
      if (ext === 'csv') {
        this.file = files[0]
        this.fileReady = true
      } else {
        this.file = null
      }
    },
  },
  mounted() {
    if (sessionStorage.userToken) {
      this.userToken = sessionStorage.userToken
    }
    this.getUserTokens()
  }
}
</script>

<style scoped>
.file-upload-button {
  margin-left: 8rem;
  margin-bottom: 1rem;
}
.IP {
  padding-top: 12px;
}

.input button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 24px 10px 24px;
  width: 327px;
  height: 48px;
  background: rgba(238, 241, 244, 1);
  border-radius: 10px;
  color: rgba(61, 57, 81, 1);
  font-family: 'Montserrat';
  font-size: 16px;
  font-weight: 600;
  margin-top: 12px;
}

.upload-container {
  font-family: 'Montserrat';
  color: rgba(61, 57, 81, 1);
}

.header h1 {
  font-family: 'Mukta';
  font-size: 32px;
  font-weight: 600;
  line-height: 32px;
  text-align: center;
  display: block;
  width: 375px;
  height: auto;
  margin: auto;
  padding-top: 96px;
  padding-bottom: 24px;
  color: rgba(61, 57, 81, 1);
}

h2 {
  font-family: 'Mukta';
  font-size: 28px !important;
  font-weight: 600 !important;
  line-height: 29.4px;
  text-align: center;
}

.manual-upload {
  width: 1120px;
  height: auto;
  padding: 0px 160px 0px 160px;
  padding-top: 24px;
  padding-bottom: 24px;
  margin: auto;
}

.input {
  width: 327px;
  height: auto;
  display: flex;
  flex-direction: column;
  margin: auto;
  padding-bottom: 24px;
  padding-top: 24px;
}

.input label {
  font-family: 'Montserrat';
  font-weight: 500;
  font-size: 12px;
  color: rgba(61, 57, 81, 1);
  margin-bottom: 0px;
  padding: 0px 4px 4px 4px;
}

.input input {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #3d3951;
  border-radius: 4px;
  font-family: 'Montserrat';
  font-weight: 500;
  font-size: 16px;
  color: rgba(61, 57, 81, 1);
}

.input select {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #3d3951;
  border-radius: 4px;
  font-family: 'Montserrat';
  font-weight: 500;
  font-size: 16px;
  color: rgba(61, 57, 81, 1);
}

.input textarea {
  width: 327px;
  height: 204px;
  color: rgba(61, 57, 81, 1);
  border-radius: 6px;
  font-family: 'Montserrat';
  font-size: 16px;
  font-weight: 500;
  padding: 12px;
}

#submit-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 24px 10px 24px;
  width: 327px;
  height: 48px;
  background: #00AFBA;
  border-radius: 10px;
  color: rgba(255, 255, 255, 1);
  font-family: 'Montserrat';
  font-size: 16px;
  font-weight: 500;
}

.file-upload {
  margin-top: 24px;
  padding-bottom: 114px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}

.file-msg {
  width: 327px;
  height: 88px;
  margin: auto;
  margin-bottom: 4rem;
}

.file-msg p {
  line-height: 22.4px;
}

#upload-btn {
  display: block;
  width: 327px;
  height: 48px;
  background: #00AFBA !important;
  border: none;
  border-radius: 10px;
  color: rgba(255, 255, 255, 1);
  font-family: 'Montserrat';
  font-size: 16px;
  font-weight: 500;
  text-transform: none;
  box-shadow: none;
  margin: auto;
  margin-bottom: 24px;
}

.upload-icon {
  padding-bottom: 2px;
  padding-left: 8px;
}

#download-btn {
  display: block;
  width: 327px;
  height: 48px;
  background: white !important;
  border: 1px solid rgba(31, 85, 134, 1);
  border-radius: 10px;
  color: rgba(31, 85, 134, 1);
  font-family: 'Montserrat';
  font-size: 16px;
  font-weight: 500;
  text-transform: none;
  box-shadow: none;
  margin: auto;
  margin-bottom: 24px;
}


.download-icon {
  padding-bottom: 2px;
  padding-left: 8px;
}

.links {
  font-family: 'Montserrat';
  text-align: left;
  position: relative;
  width: 1120px;
  height: auto;
  margin: auto;
  padding-top: 64px;
}

.cont-icon {
  max-width: 25%;
  max-height: 25%;
  margin-right: 6px;
  margin-bottom: 4px;
}

.righticon {
  float: right;
  padding-top: 2px;
  padding-right: 0px;
}

#btns {
  display: block;
  padding: 24px;
  border: none;
  border-radius: 12px;
  background-color: rgba(240, 251, 251, 1) !important;
  text-decoration: none;
  width: 327px;
  height: 127px;
  box-shadow: none;
  font-family: 'Mukta';
  font-weight: 500;
  font-size: 24px;
  text-align: left;
  line-height: 25.2px;
  color: rgba(61, 57, 81, 1);
  text-transform: none;
  margin: 12px;
}

#btns span {
  font-family: 'Montserrat';
  font-weight: 400;
  font-size: 16px;
  line-height: 22.4px;
  display: inline-block;
  padding-top: 6px;
}

#contact-btn {
  display: block;
  padding: 24px;
  border: none;
  border-radius: 12px;
  background-color: rgba(240, 251, 251, 1) !important;
  text-decoration: none;
  width: 327px;
  height: auto;
  box-shadow: none;
  font-family: 'Mukta';
  font-weight: 500;
  font-size: 24px;
  text-align: left;
  line-height: 25.2px;
  color: rgba(61, 57, 81, 1);
  text-transform: none;
  margin: auto;
}

#contact-btn span {
  font-family: 'Montserrat';
  font-weight: 400;
  font-size: 16px;
  line-height: 22.4px;
  display: inline-block;
  padding-top: 6px;
}

.row {
  margin-top: 24px;
  margin-bottom: 24px;
}
</style>
