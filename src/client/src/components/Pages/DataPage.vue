<template>
  <div>
    <div>
      <div class="table-heading">
        <h1 class="table-title">Manage Data</h1>
        <mdb-btn outline="black" id="btnExportData" class="btn-right" @click="getExport()">Export Data</mdb-btn>
      </div>
      <div class="token-table-container">
        <h2>Import your external data</h2>
        <p>First, download the example csv file from <a @click="downloadTemplate()">here</a>.</p>
        <form>
          <mdb-alert v-if="alert.show" :color="alert.type" @closeAlert="alert.show === false">{{this.alert.message}}</mdb-alert>
          <div>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroupFileAddon02">Add CSV</span>
              </div>
              <div class="custom-file">
                <input type="file" accept=".csv" class="custom-file-input" @change="onFileChange" id="inputGroupFile02" aria-describedby="inputGroupFileAddon02">
                <label class="custom-file-label" for="inputGroupFile02">{{ (this.fileReady ? this.file.name : "Choose file ..." )}}</label>
              </div>
            </div>
          </div>
          <div class="text-center mt-3">
            <mdb-btn type="submit" @click="submitFile()" :disabled="!this.fileReady">Upload File</mdb-btn>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mdbBtn, mdbAlert } from 'mdbvue'
import axios from 'axios'

export default {
  name: "Dashboard",
  components: {
    mdbBtn,
    mdbAlert
  },
  computed: {
    getProfile: function() {
      if (this.$store.state.profile) {
        return this.$store.state.profile
      } else {
        const { name, website, logo: logoFile } = this.$store.state.userDetails.user
        return {name, website, logoFile }
      }
    }
  },
  data () {
    return {
      fileReady: false,
      file: null,
      tokens: [],
      alert: {
        show: false,
        message: null,
        type: null,
      }
    }
  },
  methods: {
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

    // Download exported csv
    getExport() {
      this.$store.dispatch("get_data_export")
        .then(res => {
          const fileUrl = window.URL.createObjectURL(new Blob([res.data]))
          const fileLink = document.createElement('a')
          fileLink.href = fileUrl
          fileLink.setAttribute('download', 'acartia-export.csv')
          document.body.appendChild(fileLink)
          fileLink.click()
        })
    },
    downloadTemplate() {
      // Check for event error to prevent propagation
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

    getUserTokens () {
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
    submitFile () {
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
        .then(() => {
          this.alert = {
            show: true,
            message: "Your records have been successfully imported",
            type: 'success'
          }
        })
        // Check for request errors
        .catch(err => {
          this.alert = {
            show: true,
            message: "There was an error importing your records. Please check your file and try again",
            type: 'danger'
          }
          console.log(err)
        })
    }
  },
    mounted () {
      if (sessionStorage.userToken) {
        this.userToken = sessionStorage.userToken
      }
      this.getUserTokens()


    }
  }

</script>

<style scoped>
.token-table-container {
  width: 50%;
  padding: 10px;
  margin: auto;
  position: relative;
}

.table-heading {
    padding: 5%;
}

.table-title {
    float: left;
}

.btn-right {
  float: right;
}

</style>
