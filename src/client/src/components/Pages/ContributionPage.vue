<template>
  <div class="cont">
    <h1>How to Contribute</h1>
    <div id="first">
      <span>Firstly, thank you for your interest in contributing data to Acartia!</span>
      <span>To get started, follow these steps below.</span>
    </div>
    <div class="cont-desc">
      <div id="step1">
        <h2>Step 1: Get Authenticated</h2>
        <div id="content1">
          To start accessing sightings in the Acartia Database, first you need to contact Scott Viers to get
          authenticated. Email Scott at scott@gmail.com (placeholder)
        </div>
      </div>
      <div id="step2">
        <h2>Step 2: Contribute Data</h2>
        <div id="content2">
          Once you are authenticated, there are two main ways to contribute data to Acartia:
        </div>
        <div id="list">
          <ol>
            <li>
              Integrate your application with Acartia by following the steps in the contribution guide on our GitHub
              using the link below.
              <a class="btn btn-primary" data-mdb-ripple-init href="https://github.com/salish-sea/acartia" role="button"
                id="buttons">
                <img src="@/assets/git-icon.svg" alt="GitHub Icon" class="icon" />
                Github
                <img src="@/assets/right-icon.svg" alt="Right Icon" class="righticon" />
              </a>
            </li>
            <li>
              Add you own data by manually inputting a single sighting at a time, or by uploading a csv file using the
              link below.
              <a class="btn btn-primary" data-mdb-ripple-init @click="linkToGithub" role="button" id="buttons">
                <img src="@/assets/git-icon.svg" alt="Upload Icon" class="icon" />
                Upload Sightings
                <img src="@/assets/right-icon.svg" alt="Right Icon" class="righticon" />
              </a>
            </li>
          </ol>
        </div>
      </div>
    </div>
    <div id="content3">
      <h2>
        Want to download Acartia data? Check out this link!
      </h2>
      <mdb-row class="row">
        <a class="btn btn-primary" data-mdb-ripple-init href="mailto:info@acartia.io" role="button" id="export-btn">
          <img src="@/assets/download-icon.svg" alt="Export Icon" class="icon" />
          Export data
          <span>Download Acartia sightings data here.</span>
        </a>
        <a class="btn btn-primary" data-mdb-ripple-init href="mailto:info@acartia.io" role="button" id="contact-btn">
          <img src="@/assets/mail-icon.svg" alt="Mail Icon" class="icon" />
          Contact us
          <span>Get in touch with Acartia.</span>
        </a>
      </mdb-row>
    </div>
  </div>
</template>

<script>
import { mdbRow } from 'mdbvue'

export default {
  name: 'About',
  components: {
    mdbRow
  },
  methods: {
    linkToGithub() {
      window.open('https://github.com/salish-sea/acartia', '_blank');
    },
  }
}
</script>

<style scoped>
.cont {
  color: rgba(61, 57, 81, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

}

.cont h2 {
  font-family: 'Mukta';
  font-size: 28px !important;
  font-weight: 600 !important;
  line-height: 29.4px;
  text-align: left;
}

#first {
  font-family: 'Montserrat';
  line-height: 22px;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: -0.02em;
  text-align: center;
  position: relative;
  width: 1120px;
  height: auto;
  margin: auto;
  margin-bottom: 2rem;
  padding-top: 24px;
}

#first span {
  display: block;
}

.cont-desc {
  font-family: 'Montserrat';
  text-align: left;
  position: relative;
  width: 1120px;
  height: auto;
  margin: auto;
  padding: 0px 128px 0px 128px;
}

#step1 {
  text-align: left;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.02em;
  margin-top: 20px;
  width: 864px;
}

#step2 {
  text-align: left;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.02em;
  margin-top: 30px;
}

#content1 {
  margin-top: 20px;
}

#content2 {
  margin-top: 20px;
}

#content3 {
  height: auto;
  margin: 0px;
  padding-top: 64px;
}

#content3 h2 {
  text-align: center;
}

#list {
  margin-top: 20px;
}

#list li {
  margin-bottom: 24px;
  list-style-type: decimal;
  border: none;

}

#buttons {
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
  margin-top: 24px;
}

.icon {
  max-width: 70%;
  max-height: 70%;
}

.righticon {
  float: right;
  padding-top: 4px;
}

#export-btn {
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
}

#export-btn span {
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
  height: 127px;
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

.righticon2 {
  position: absolute;
  top: 150px;
  right: 380px;
}

.righticon3 {
  position: absolute;
  top: 150px;
  right: 25px;
}

.row {
  margin-top: 24px;
  margin-bottom: 24px;
}
</style>
