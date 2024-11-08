<template>
  <div class="cont">
    <h1>Export Data</h1>
        <div class="export-page">
            <div id="export-msg">
                <span>Export all the data points as a CSV file.</span>
            </div>
            <button @click="getExport" type="button" id="export-btn">Export data<img src="@/assets/export-white.svg" alt="Export Icon" class="export-icon" /></button>
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
                <a class="btn btn-primary" data-mdb-ripple-init href="https://github.com/salish-sea/acartia" target="_blank" role="button" id="btns">
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
import {} from 'mdbvue'

export default {
  name: 'About',
  components: {
  },
  methods: {
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
  }
}
</script>

<style scoped>
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

.export-page {
    width: 1120px;
    height: 418px;
    padding: 0px 160px 0px 160px;
    padding-bottom: 24px;
    margin: auto;
}

#export-msg {
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

#export-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 24px 10px 24px;
    width: 327px;
    height: 48px;
    background: #00AFBA;
    border: 0px;
    border-radius: 10px;
    color: rgba(255, 255, 255, 1);
    font-family: 'Montserrat';
    font-size: 16px;
    font-weight: 500;
    margin: auto;
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
