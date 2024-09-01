<template>
  <div id="about-container">
    <div class="page-desc">
      <h1>Contributing to Acartia</h1>
      <p>
        Firstly, thank you for your interest to contribute data to Acartia!
      </p>
      <p>
        There are two main options to contribute data to Acartia.
      <ol>
        <li>Integrate your application with Acartia - <br />to integrate your application with Acartia,
          please follow the steps in the <a href="https://github.com/Typehuman/SSEMMI/blob/main/CONTRIBUTING.md"
            target="_blank">
            Contribution guide</a> on GitHub.</li>
        <li>Add your own data via uploading a CSV file -<br />
          you can upload your own data to our service (or export the existing sightings data) on the <a
            href="/manage-data" target="_blank">Manage data</a> page. </li>
      </ol>

      </p>
      <p>Thank you. </p>

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
import { mdbRow, mdbBtn } from 'mdbvue'

export default {
  name: 'About',
  components: {
    mdbRow,
    mdbBtn
  },
}
</script>

<style scoped>
#about-container {
  /* align-content: ; */
}

.page-desc {
  text-align: left;
  width: 50%;
  padding: 5%;
  margin: auto;
  position: relative;
  margin-left: 5%;
  display: inline-table;
}

.page-links {
  padding: 5%;
  margin-left: 5%;
  display: inline-table;
}

.page-links .row {
  display: grid;
}

.contact-btn a {
  color: black;
}
</style>
