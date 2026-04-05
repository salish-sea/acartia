<template>
  <div>
    <h1 class="request-table-title">Manage Users</h1>
    <div>
      <h2 class="subheading">Pending Approval</h2>
    </div>
    <div class="user-table">
      <Table v-if="(userReqTable.rows.length > 0)" :rows="userReqTable.rows" :pagination="(userReqTable.rows.length > 10)">
        <template v-slot:head>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </template>
        <template v-slot="{ item }">
          <tr>
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.createdAt }}</td>
            <td class="button-cell">
              <button @click="approveUserMethod(item)">Approve</button>
              <button @click="deleteUserMethod(item)">Deny</button>
            </td>
          </tr>
        </template>
      </Table>
      <div v-else>
        There are no users waiting to be approved.
      </div>
    </div>
    <div>
      <h2 class="subheading">Permissions</h2>
    </div>
    <div class="user-table">
      <Table :rows="userTable.rows" :pagination="(userReqTable.rows.length > 10)">
        <template v-slot:head>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Created</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </template>
        <template v-slot="{ item }">
          <tr>
            <td>{{  item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.createdAt }}</td>
            <td>{{ item.type }}</td>
            <td>
              <button @click="switchUserRoleMethod(item)">{{ (item.type === 'user' ? 'Make Admin' : 'Revoke Admin') }}</button>
              <button @click="deleteUserMethod(item)">Delete</button>
            </td>
          </tr>
        </template>
      </Table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
import Table from '../Table.vue';

export default {
  name: 'DatatablePage',
  components: {
    Table,
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
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;
  max-width: 1000px;
}

.subheading {
  text-align: center;
  margin-top: 50px;
}

.request-table-title {
  text-align: center;
  margin-top: 100px;
}

</style>
