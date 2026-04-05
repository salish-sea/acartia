<template>
  <div class="cont">
    <h1>Contact us</h1>
    <div class="contact-page">
      <div id="contact-msg">
        <span>Have a question or feedback for us? Fill out your information here and well reach out to you as soon as we
          can.</span>
      </div>
      <div class="contact-form">
        <div class="input">
          <label>Name*</label>
          <input type="text" v-model="name">
        </div>
        <div class="input">
          <label>Email*</label>
          <input type="text" v-model="email">
        </div>
        <div class="input">
          <label>Organization</label>
          <input type="text" v-model="organization">
        </div>
        <div class="input">
          <label>What can we help you with?*</label>
          <textarea v-model="message">>
          </textarea>
        </div>
        <div class="input">
          <input type="submit" id="submit-btn" @click="sendEmail">
        </div>
      </div>
    </div>
    <div class="links">
      <h2>Want to contribute to Acartia? Check out these links!</h2>
      <div class="row">
        <a class="btn btn-primary" data-mdb-ripple-init href="/integrate" role="button" id="btns">
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
        <a class="btn btn-primary" data-mdb-ripple-init href="/upload" role="button" id="btns">
          <img src="@/assets/upload-icon.svg" alt="Upload Icon" class="cont-icon" />
          Upload Sightings
          <img src="@/assets/right-icon.svg" alt="Right Icon" class="righticon" />
          <span>Upload your sightings here.</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'


export default {
  name: 'About',
  data() {
    return {
      name: '',
      email: '',
      organization: '',
      message: '',
    };
  },
  methods: {
    async sendEmail() {
      if (!this.$store.state.token) {
        return
      }

      const request = {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.token,
          'Content-Type': 'application/json'
        }
      }

      try {

        const response = await axios.post(`http://localhost:9000/v1/email`, {
          body: {
            name: this.name,
            email: this.email,
            organization: this.organization,
            message: this.message,
          }
        }, request);


        if (response.status === 200) {
          this.$store.commit("addToast", { message : "Successfully Sent Email", status : "success"} )
        }

      } catch (error) {
          this.$store.commit("addToast", { message : "Error Sending Feedback", status : "error"} )
      }
    },
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Mukta:wght@200;300;400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Mukta:wght@200;300;400;500;600;700;800&display=swap');

.cont {
  color: rgba(61, 57, 81, 1);
}

.cont h1 {
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
}

.cont h2 {
  font-family: 'Mukta';
  font-size: 28px !important;
  font-weight: 600 !important;
  line-height: 29.4px;
  text-align: center;
}

.contact-page {
  width: 1120px;
  height: auto;
  padding: 0px 160px 0px 160px;
  padding-bottom: 24px;
  margin: auto;
}

#contact-msg {
  font-family: 'Montserrat';
  line-height: 22px;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  position: relative;
  width: 327px;
  height: auto;
  margin: auto;
  padding-bottom: 24px;
}

.input {
  width: 327px;
  height: auto;
  display: flex;
  flex-direction: column;
  margin: auto;
  padding-bottom: 24px;
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
  color: #0c0826;

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

.links {
  font-family: 'Montserrat';
  text-align: left;
  position: relative;
  width: 1120px;
  height: auto;
  margin: auto;
  padding-top: 24px;
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
