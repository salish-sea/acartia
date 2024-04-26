<template>
<div>
  <!-- Title and header on the UI -->
  <div style="padding: 5%">
    <section  class="register--section">
      <!-- UI for passing register details -->
      <div>
        <form class='register--form' @submit="register">
          <h1 id="register-heading">Register</h1>
          <fieldset>
            <mdb-input placeholder="Email:" name="Email" v-model.trim="registerUserData.initEmail" type="email" required/>
          </fieldset>
          <fieldset>
            <mdb-input placeholder="Confirm email:" v-model.trim="registerUserData.email" name="Confirm email" type="email" required/>
          </fieldset>
          <fieldset>
            <mdb-input placeholder="Password:" v-model.trim="registerUserData.initPassword" name="Password" type="password" required/>
          </fieldset>
          <fieldset>
            <mdb-input placeholder="Confirm Password:" v-model.trim="registerUserData.password" name="Confirm Password" type="password" required/>
          </fieldset>
          <fieldset>
            <br>
          </fieldset>
          <!-- Checkbox to enquire purpose of signing up and use of application (pop up after signup submission) -->
          <!-- NEED to implement data type to store in database -->
          <div class='use-ssemmi-form align-items-center'>
            <h5 id="use-ssemmi-heading">How do you intend to use Acartia?</h5>
            <br>
            <fieldset>
              <mdb-input type="checkbox" name="ProvideData" />
              <label for="ProvideData">Provide Data</label>
            </fieldset>
            <br>
            <fieldset>
              <mdb-input type="checkbox" name="UtilizeData" />
              <label for="UtilizeData">Utilize Data</label>
            </fieldset>
            <br>
            <fieldset>
              <mdb-input type="checkbox" name="Other" />
              <label for="Other">Other</label>
            </fieldset>
            <br>
            <fieldset id="btn-signup-submit">
              <mdb-btn type='submit' color="white" style="right: 0%">Sign Up</mdb-btn>
            </fieldset>
          </div>
        </form>
      </div>
    </section>
    <!-- Component for explainer text -->
    <section id="div-explainer">
      <mdb-card>
        <mdb-card-body>
          <mdb-card-title>Community Guidelines</mdb-card-title>
          <mdb-card-text align="left">
            The goal of Acartia is to advance marine conservation and science across the Salish Sea and Cascadia by
            sharing animal locations -- both historical and real-time data. Registration is free, access is open and
            free, and the code underlying the decentralized data cooperative is open source.
            <br />
            <b>Users of this data cooperative agree to these community rules:</b>
            <mdb-card-text align="left">
            <ol>
              <li>Shared data will only include animals observed in marine environments.</li>
              <li>All data provided will align with the <a href="https://github.com/Typehuman/SSEMMI/blob/main/CONTRIBUTING.md">Acartia data scheme and standards</a>.</li>
              <li>Any data use will heed our <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons BY license</a>. Proper attribution includes a link to acartia.io, acknowledgement of each data provider, and preservation of the provenance of each data point.</li>
              <li>All data will be used with the intention of promoting marine conservation and responsible human interaction with marine wildlife, including adherence to U.S. and Canadian laws and the <a href="https://www.bewhalewise.org/">Be Whale Wise guidelines</a>.</li>
              </ol>
            </mdb-card-text>
            <a href="https://creativecommons.org/licenses/by/4.0/"><i class="fab fa-creative-commons" aria-hidden="true"></i></a> Attribution should include a link to acartia.io and listing of providers of the data you use.
          </mdb-card-text>
        </mdb-card-body>
      </mdb-card>
    </section>
  </div>
</div>
</template>

<script>
import { mdbInput, mdbBtn, mdbCard, mdbCardBody, mdbCardTitle, mdbCardText } from 'mdbvue';
import axios from 'axios';

export default {
  name: 'Register',
  components: {
    mdbInput,
    mdbBtn,
    mdbCard,
    mdbCardBody,
    mdbCardTitle,
    mdbCardText
  },
  data() {
    return {
      registerUserData: {},
      errors: [],
      VUE_APP_MASTER_KEY: process.env.VUE_APP_MASTER_KEY
    };
  },
  methods: {
    register(event) {
      if (!this.registerUserData.email) {
        alert('Email required.')
        return false
      }

      if (this.registerUserData.email != this.registerUserData.initEmail) {
        alert('Emails do not match.')
        return false
      }

      if (!this.registerUserData.password) {
        alert('Password required.')
        return false
      }

      if (this.registerUserData.password != this.registerUserData.initPassword) {
        alert('Passwords do not match.')
        return false
      }
      // Check for event error to prevent propagation
      event.preventDefault()

      const regUserRequst = {
        'email': this.registerUserData.email,
        'password': this.registerUserData.password,
        'access_token': this.VUE_APP_MASTER_KEY
      }

      //Header post method to pass user details by passing created user details
      axios.post(`${process.env.VUE_APP_WEB_SERVER_URL}/v1/users/`, regUserRequst)
      // Redirect to requested page
      .then( regUser => {
        console.log(`Successfully added ${regUser.data}`)
        this.$router.push({name: 'Dashboard'})
      })
      // Check for request errors
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
  form {
    float: left;
    padding-left: 8%;
    width: 40%;
    margin: auto;
    position: relative;
  }

  #register-heading {
    text-align: justify;
  }

  #div-explainer {
    width: 40%;
    top: 6vh;
    right: -30vh;
    margin: 10px;
    background-color: transparent;
    display: inline-block;
  }

  #section-on-use {
    width: 40%;
    padding-left: 70px;
    display: block;
  }

  .use-ssemmi-form label {
    float: left;
    clear: left;
  }

  #use-ssemmi-heading {
    text-align: justify;
    font-weight: 300;
  }

  #section-on-use ul {
    /* margin: 0; */
    list-style: none;
    float: left;
  }

  #btn-signup-submit {
    padding-top: 40px;
    padding-bottom: 40px;
  }
</style>
