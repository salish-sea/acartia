<template>
  <div>

    <div>
      <div class="contrib-heading">
        <h1 class="table-title">Contributor Profile</h1>
      </div>
      <div class="contrib-parent mx-auto">
        <mdb-card class="contributor-card mx-auto">
          <mdb-card-body>
            <form>
              <div>
                <avatar class="mx-auto" :username="profile.name" :src="profile.logoFile" :size="200" alt="Your logo" />
                <mdb-input label="Your name" group type="text" v-model="profile.name" validate error="wrong"
                  success="right" />
                <mdb-input label="Your website" group type="url" v-model="profile.website" validate error="wrong"
                  success="right" />
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroupFileAddon01">Add logo</span>
                  </div>
                  <div class="custom-file">
                    <input type="file" class="custom-file-input" @change="onFileChange" id="inputGroupFile01"
                      aria-describedby="inputGroupFileAddon01">
                    <label class="custom-file-label" for="inputGroupFile01">Choose file ...</label>
                  </div>
                </div>
              </div>
              <div class="text-center mt-3">
                <mdb-btn type="submit" @click="submitForm()">{{ (profile.name !== '' ? 'Update' : 'Save') }}</mdb-btn>
              </div>
            </form>
          </mdb-card-body>
        </mdb-card>
      </div>
    </div>
    <div>
      <div class="table-heading">
        <h1 class="table-title">Your Active Tokens</h1>
        <mdb-btn outline="black" id="token-table-btn-new" class="btn-right" @click.native="modal = true">Create
          Token</mdb-btn>
      </div>
      <mdb-modal :show="modal" @close="modal = false" centered>
        <mdb-modal-header>
          <mdb-modal-title>Create Token</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body class="grey-text">
          <mdb-input label="Add a name for your token" group type="text" validate error="wrong" success="right"
            v-model="tokenName" />
        </mdb-modal-body>
        <mdb-modal-footer>
          <mdb-btn color="secondary" @click.native="modal = false">Cancel</mdb-btn>
          <mdb-btn color="primary" :disabled="tokenName === ''" @click="createToken()">Create Token</mdb-btn>
        </mdb-modal-footer>
      </mdb-modal>
      <div class="token-table-container">
        <mdb-tbl responsive>
          <mdb-tbl-head>
            <tr>
              <th>Name</th>
              <th>Token</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </mdb-tbl-head>
          <mdb-tbl-body>
            <tr v-for="item in userTokenTable.rows" :key="item.reference">
              <td>{{ item.name }}</td>
              <td>{{ item.token }}</td>
              <td>{{ item.createdAt }}</td>
              <td><mdb-btn size="sm" to="/" v-clipboard="() => copyToken(item)" class="btn">Copy</mdb-btn>
                <mdb-btn size="sm" to="/" @click="deleteToken(item)" class="btn">Delete</mdb-btn>
              </td>
            </tr>
          </mdb-tbl-body>
        </mdb-tbl>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mdbTbl, mdbTblHead, mdbTblBody, mdbBtn, mdbModal, mdbInput,
  mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbCard, mdbCardBody
} from 'mdbvue'
import axios from 'axios'
import dayjs from 'dayjs'
import Avatar from 'vue-avatar'

export default {
  name: "Dashboard",
  components: {
    mdbTbl,
    mdbTblHead,
    mdbTblBody,
    mdbBtn,
    mdbModal,
    mdbInput,
    mdbModalBody,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalFooter,
    mdbCard,
    mdbCardBody,
    Avatar
  },
  computed: {
    getProfile: function () {
      if (this.$store.state.profile) {
        return this.$store.state.profile
      } else {
        const { name, website, logo: logoFile } = this.$store.state.userDetails.user
        return { name, website, logoFile }
      }
    }
  },
  data() {
    return {
      userToken: '',
      modal: false,
      tokenName: '',
      profile: {
        website: '',
        name: '',
        logoUrl: '',
        fileName: '',
        logoFile: null,
      },
      userTokenTable: {
        columns: [
          {
            label: 'Name',
            field: 'name',
            sort: 'asc'
          },
          {
            label: 'Token',
            field: 'token',
            sort: 'asc'
          },
          {
            label: 'Created At',
            field: 'createdAt',
            sort: 'asc'
          }
        ],
        rows: []
      },
    }
  },
  methods: {
    /*
      The following code block was based on the answer at https://stackoverflow.com/a/41803227
     */
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      // const image = new Image();
      const reader = new FileReader();
      const vm = this;
      vm.profile.fileName = file.name
      reader.onload = (e) => {
        vm.profile.logoFile = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeImage: function () {
      this.profile.file = '';
    },
    // End code block
    copyToken(item) {
      try {
        alert('Token copied!')
        return item.token
      } catch (error) {
        alert('Sorry, unable to copy your token :(')
      }
    },
    loadUserTokens() {
      this.$store.dispatch("get_user_tokens")
        .then(res => {
          let getList = JSON.parse(JSON.stringify(res.data))
          this.userTokenTable.rows = [];
          for (let i = 0; i < getList.length; i++) {
            let userMap = {
              reference: i + 1,
              name: getList[i].name,
              token: getList[i].token,
              createdAt: dayjs(getList[i].createdAt).format('DD-MMM-YYYY'),
              id: getList[i]._id
            }
            this.userTokenTable.rows.push(userMap)
          }
        })
    },
    createToken() {
      // Hide login message before clicking on submit login details
      this.modal = false

      this.$store.dispatch('create_token', this.tokenName)
        .then(() => {
          this.loadUserTokens()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    deleteToken(item) {
      // Check for event error to prevent propagation
      event.preventDefault()
      const requestAuth = {
        headers: {
          'Authorization': 'Bearer ' + this.$store.getters.getUserToken,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }

      //Header post method to pass user details by passing created user details
      axios.delete(`${process.env.VUE_APP_WEB_SERVER_URL}/v1/users/tokens/${item.id}`, requestAuth)
        // Redirect to requested page
        .then(regUser => {
          console.log(regUser)
          this.loadUserTokens()
        })
        // Check for request errors
        .catch(err => {
          console.log(err)
        })
    },
    submitForm() {
      event.preventDefault()
      this.$store.dispatch('update_profile', this.profile)
    }
  },
  mounted() {
    this.loadUserTokens()
    if (sessionStorage.userToken) {
      this.userToken = sessionStorage.userToken
    }
    const existingProfile = this.getProfile
    this.profile.name = existingProfile.name
    this.profile.website = existingProfile.website
    this.profile.logoFile = existingProfile.logoFile

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

.contrib-heading {
  display: flex;
  padding: 5% 5% 0;
}

.table-title {
  float: left;
}

.btn-right {
  float: right;
}

.contributor-card {
  max-width: 500px;
}

.contrib-parent {
  text-align: center;
}

#token-table-btn-new {
  float: right;
}
</style>
