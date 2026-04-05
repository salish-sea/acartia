<template>
  <div class="cont">
    <h1>Acartia Data</h1>
        <div id="data-msg">
            <span>Thank you for contributing to Acartia! The data you provide is invaluable in helping both professionals and hobbyists committed to the conservation of marine wildlife.</span>
        </div>
    <div class="options">
        <div class="row">
            <a class="btn btn-primary" data-mdb-ripple-init href="/integrate" role="button" id="btns">
                <img src="@/assets/right-icon.svg" alt="Right Icon" class="righticon" />
                <img src="@/assets/htc-icon.svg" alt="Hand Icon" class="cont-icon" />
                How to Contribute
                <span>New to uploading data? Click here to learn how you can provide data.</span>
            </a>
            <a class="btn btn-primary" data-mdb-ripple-init href="https://github.com/salish-sea/acartia" role="button" id="btns">
                <img src="@/assets/right-icon.svg" alt="Right Icon" class="righticon" />
                <img src="@/assets/git-icon.svg" alt="GitHub Icon" class="cont-icon" />
                Github
                <span>Integrate your application with Acartia.</span>
            </a>
        </div>
        <div class="row">
            <a class="btn btn-primary" data-mdb-ripple-init href="/upload" role="button" id="btns">
                <img src="@/assets/right-icon.svg" alt="Right Icon" class="righticon" />
                <img src="@/assets/upload-icon.svg" alt="Upload Icon" class="cont-icon" />
                Upload Sightings
                <span>Upload your sightings here.</span>
            </a>
            <a class="btn btn-primary" data-mdb-ripple-init href="/export" role="button" id="btns">
                <img src="@/assets/right-icon.svg" alt="Right Icon" class="righticon" />
                <img src="@/assets/download-icon.svg" alt="Export Icon" class="cont-icon" />
                Export data
                <span>Download Acartia sightings data here.</span>
            </a>
        </div>
        <div class="row">
            <a class="btn btn-primary" data-mdb-ripple-init href="/contact-us" role="button" id="contact-btn">
                <img src="@/assets/right-icon.svg" alt="Right Icon" class="righticon" />
                <img src="@/assets/mail-icon.svg" alt="Mail Icon" class="cont-icon" />
                Contact us
                <span>Get in touch with Acartia.</span>
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
    text-align: left;
}

#data-msg {
    font-family: 'Montserrat';
    line-height: 22px;
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    position: relative;
    width: 1120px;
    height: auto;
    margin: auto;
    padding: 0px 216px 0px 216px;
}

.options {
    font-family: 'Montserrat';
    text-align: left;
    position: relative;
    width: 1120px;
    height: auto;
    margin: auto;
    padding: 0px 216px 0px 216px;
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
    margin: auto;
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
