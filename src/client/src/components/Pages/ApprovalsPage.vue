<template>
  <div>
    <div class="table-heading">
      <h1 class="request-table-title">Manage Users</h1>
    </div>
    <div>
      <h2>Pending Approval</h2>
    </div>
    <div class="user-table">
      <mdb-tbl v-if="(userReqTable.rows.length > 0)" btn responsive :pagination="(userReqTable.rows > 10)">
        <mdb-tbl-head>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </mdb-tbl-head>
        <mdb-tbl-body>
          <tr v-for="item in userReqTable.rows" :key="item.reference">
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.createdAt }}</td>
            <td><mdb-btn size="sm" to="/" @click="approveUserMethod(item)" class="btn">Approve</mdb-btn>
              <mdb-btn size="sm" to="/" @click="deleteUserMethod(item)" class="btn btn-right">Deny</mdb-btn>
            </td>
          </tr>
        </mdb-tbl-body>
      </mdb-tbl>
      <div v-else>
        There are no users waiting to be approved.
      </div>
    </div>
    <div>
      <h2 class="subheading">Permissions</h2>
    </div>
    <div class="user-table">
      <mdb-tbl btn responsive :pagination="(userTable.rows > 10)">
        <mdb-tbl-head>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Created</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </mdb-tbl-head>
        <mdb-tbl-body>
          <tr v-for="item in userTable.rows" :key="item.reference">
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.createdAt }}</td>
            <td>{{ item.type }}</td>
            <td class="center-text"><mdb-btn size="sm" to="/" @click="switchUserRoleMethod(item)" class="btn center">{{
              (item.type === 'user' ? 'Make Admin' : 'Revoke Admin') }}</mdb-btn>
              <mdb-btn size="sm" to="/" @click="deleteUserMethod(item)" class="btn btn-right"><mdb-icon
                  icon="times-circle" /> Delete</mdb-btn>
            </td>
          </tr>
        </mdb-tbl-body>
      </mdb-tbl>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
import { mdbTblHead, mdbTblBody, mdbTbl, mdbIcon, mdbBtn } from 'mdbvue'

export default {
  name: 'DatatablePage',
  components: {
    mdbTbl,
    mdbTblHead,
    mdbTblBody,
    mdbIcon,
    mdbBtn
  },
  data() {
    return {
      selected: null,
      userReqTable: {
        columns: [
          {
            label: 'Name',
            field: 'name',
            sort: 'asc'
          },
          {
            label: 'Email',
            field: 'email',
            sort: 'asc'
          },
          {
            label: 'Requested At',
            field: 'createdAt',
            sort: 'asc'
          }
        ],
        rows: []
      },
      userTable: {
        columns: [
          {
            label: 'Name',
            field: 'name',
            sort: 'asc'
          },
          {
            label: 'Email',
            field: 'email',
            sort: 'asc'
          },
          {
            label: 'Created At',
            field: 'createdAt',
            sort: 'asc'
          },
          {
            label: 'Type',
            field: 'type',
            sort: 'asc'
          }
        ],
        rows: []
      }
    }
  },
  mounted() {
    this.loadUserRequest()
    this.loadUsers()
  },
  methods: {
    approveUserMethod(item) {
      // Check for event error to prevent propagation
      event.preventDefault()
      const regUserRequst = {
        'isApproved': true,
        'name': item.name,
        'access_token': this.$store.getters.getUserToken
      }

      //Header post method to pass user details by passing created user details
      axios.put(`${process.env.VUE_APP_WEB_SERVER_URL}/v1/users/${item.id}`, regUserRequst)
        // Redirect to requested page
        .then(regUser => {
          console.log(regUser)
          location.reload()
        })
        // Check for request errors
        .catch(err => {
          console.log(err)
        })
    },
    switchUserRoleMethod(item) {
      // Check for event error to prevent propagation
      event.preventDefault()
      const regUserRequest = {
        'role': (item.type === 'user' ? 'admin' : 'user'),
        'isApproved': true,
        'name': item.name,
        'access_token': this.$store.getters.getUserToken
      }
      console.log(regUserRequest)
      //Header post method to pass user details by passing created user details
      axios.put(`${process.env.VUE_APP_WEB_SERVER_URL}/v1/users/${item.id}`, regUserRequest)
        // Redirect to requested page
        .then(regUser => {
          console.log(`Added ${regUser.data}`)
          location.reload()
        })
        // Check for request errors
        .catch(err => {
          console.log(err)
        })
    },
    deleteUserMethod(item) {
      // Check for event error to prevent propagation
      event.preventDefault()
      const requestAuth = {
        headers: {
          'Authorization': 'Bearer ' + this.$store.getters.getUserToken,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }

      //Header post method to pass user details by passing created user details
      axios.delete(`${process.env.VUE_APP_WEB_SERVER_URL}/v1/users/${item.id}`, requestAuth)
        // Redirect to requested page
        .then(regUser => {
          console.log(`Deleted ${regUser.data}`)

          // check to see which function called the delete method
          if (item.type === undefined) {
            this.loadUserRequest()
          } else {
            this.loadUsers()
          }
        })
        // Check for request errors
        .catch(err => {
          console.log(err)
        })
    },
    loadUserRequest() {
      this.$store.dispatch("get_user_requests")
        .then(res => {
          let getList = JSON.parse(JSON.stringify(res.data))
          this.userReqTable.rows = [];
          for (let i = 0; i < getList.length; i++) {
            let userMap = {
              reference: i + 1,
              name: getList[i].name,
              email: getList[i].email,
              createdAt: dayjs(getList[i].createdAt).format('DD-MMM-YYYY'),
              id: getList[i]._id
            }
            this.userReqTable.rows.push(userMap)
          }
        })
    },
    loadUsers() {
      this.$store.dispatch("get_users")
        .then(res => {
          let getList = JSON.parse(JSON.stringify(res.data))
          this.userTable.rows = [];
          for (let i = 0; i < getList.length; i++) {
            let userMap = {
              reference: i + 1,
              name: getList[i].name,
              email: getList[i].email,
              createdAt: dayjs(getList[i].createdAt).format('DD-MMM-YYYY'),
              type: getList[i].role,
              id: getList[i].id
            }
            this.userTable.rows.push(userMap)
          }
        })
    }
  }
}
</script>

<style scoped>
.user-table {
  width: 50%;
  padding: 10px;
  margin: auto;
  position: relative;
}

.subheading {
  padding-top: 5%;
}

.table-heading {
  padding: 5%;
}

.request-table-title {
  float: left;
}

.btn-right {
  float: right;
}
</style>
