<template>
  <div>
    <div id="about-container">
      <div class="page-desc">
        <h1>How to Contribute</h1>
        <div id="first">
          <span>Firstly, thank you for your interest in contributing data to Acartia!</span>
          <span>To get started, follow these steps below.</span>
        </div>
        <div id="step1">
          <h3>Step 1: Get Authenticated</h3>
          <div id="content1">
            To start accessing sightings in the Acartia Database, first you need to contact Scott to get authenticated.
            You can email him at ...@email.com (we will probably need to update later when we have actual instructions.)
          </div>
        </div>
        <div id="step2">
          <h3>Step 2: Contribute Data</h3>
          <div id="content2">
            Once you are authenticated, there are two main ways to contribute data to Acartia:
          </div>
          <div id="list">
            <ol>
              <li>
                Integrate your application with Acartia by following the steps in the contribution guide on our GitHub
                using the link below.
                <a class="btn btn-primary" data-mdb-ripple-init href="https://github.com" role="button" id="buttons">
                  <img src="@/assets/git-icon.svg" alt="GitHub Icon" class="icon" />
                  Github
                  <img src="@/assets/right-icon.svg" alt="Right Icon" class="righticon" />
                </a>
              </li>
              <li>
                Add you own data by manually inputting a single sighting at a time, or by uploading a csv file using the
                link below.
                <a class="btn btn-primary" data-mdb-ripple-init href="https://github.com" role="button" id="buttons">
                  <img src="@/assets/git-icon.svg" alt="GitHub Icon" class="icon" />
                  Upload Sightings
                  <img src="@/assets/right-icon.svg" alt="Right Icon" class="righticon" />
                </a>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div id="content3">
        <h3>
          Want to download Acartia data? Check out this link!
        </h3>
        <mdb-row class="row">
          <a class="btn btn-primary" data-mdb-ripple-init href="mailto:info@acartia.io" role="button" id="export-btn">
            <img src="@/assets/download-icon.svg" alt="GitHub Icon" class="icon" />
            Export data
            <span>Download Acartia sightings data here.</span>
            <img src="@/assets/right-icon.svg" alt="Right Icon" class="righticon" />
          </a>
          <a class="btn btn-primary" data-mdb-ripple-init href="mailto:info@acartia.io" role="button" id="contact-btn">
            <img src="@/assets/mail-icon.svg" alt="GitHub Icon" class="icon" />
            Contact us
            <span>Get in touch with Acartia.</span>
            <img src="@/assets/right-icon.svg" alt="Right Icon" class="righticon" />
          </a>
        </mdb-row>
      </div>

    </div>
    <div class="page-links">
      <mdb-row>
        <mdb-btn outline="black" class="contact-btn"
          onclick="window.open('mailto:info@acartia.io');">Questions?</mdb-btn>
      </mdb-row>
      <mdb-row>
        <mdb-btn outline="black" class="contact-btn"><a href="https://github.com/Typehuman/SSEMMI">Github <i
              class="fab fa-github"></i></a></mdb-btn>
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
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

.page-desc {
  font-family: 'Inter';
  text-align: left;
  width: 50%;
  padding: 5%;
  margin: auto;
  position: relative;
  margin-left: 5%;
  display: inline-table;
  color: rgba(84, 95, 113, 1);
}

h1 {
  font-family: 'Inter';
  font-weight: 700 !important;
  font-size: 32px !important;
  text-align: center;
  letter-spacing: -0.02em;
  line-height: 36px;
  padding-bottom: 12px;
}

h3 {
  font-weight: 700 !important;
  font-size: 24px !important;
  text-align: left;
  line-height: 30px;
  letter-spacing: -0.02em;
}

#first {
  line-height: 22px;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: -0.02em;
  text-align: center;
}

#first span {
  display: block;
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
  font-family: 'Inter';
  text-align: center;
  width: 678px;
  height: 228px;
  padding: 64px, 0px, 0px, 0px;
  margin: auto;
  margin-left: 5%;
  display: inline-block;
  color: rgba(84, 95, 113, 1);
}

#content3 h3 {
  text-align: center;
}

#list {
  margin-top: 20px;
}

#buttons {
  display: block;
  padding: 24px;
  border: none;
  border-radius: 12px;
  background: #EEF1F4 !important;
  text-decoration: none;
  width: 327px;
  height: 78px;
  box-shadow: none;
  font-family: 'Inter';
  font-weight: 700;
  font-size: 24px;
  text-align: left;
  letter-spacing: -0.02em;
  line-height: 30px;
  color: rgba(84, 95, 113, 1);
  text-transform: none;
  margin: auto;
  margin-top: 24px;
}

.icon {
  max-width: 70%;
  max-height: 70%;
}

.righticon {
  padding-right: 200%;
  display: inline;
}

li {
  margin-bottom: 24px;
}

#export-btn {
  display: block;
  padding: 24px;
  border: none;
  border-radius: 12px;
  background: #EEF1F4 !important;
  text-decoration: none;
  width: 327px;
  height: 110px;
  box-shadow: none;
  font-family: 'Inter';
  font-weight: 700;
  font-size: 24px;
  text-align: left;
  letter-spacing: -0.02em;
  line-height: 30px;
  color: rgba(84, 95, 113, 1);
  text-transform: none;
  margin: auto;
}

#export-btn span {
  font-family: 'Inter';
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.02em;
  display: inline-block;
  padding-top: 6px;
}

#contact-btn {
  display: block;
  padding: 24px;
  border: none;
  border-radius: 12px;
  background: #EEF1F4 !important;
  text-decoration: none;
  width: 327px;
  height: 110px;
  box-shadow: none;
  font-family: 'Inter';
  font-weight: 700;
  font-size: 24px;
  text-align: left;
  letter-spacing: -0.02em;
  line-height: 30px;
  color: rgba(84, 95, 113, 1);
  text-transform: none;
  margin: auto;
}

#contact-btn span {
  font-family: 'Inter';
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.02em;
  display: inline-block;
  padding-top: 6px;
}

.row {
  margin-top: 24px;
}
</style>
