<template>
    <div id="upload-container">
        <div class="header">
            <h1>Upload Sightings</h1>
        </div>
        <div class="tab">
            <!-- Tabs navs -->
            <ul class="nav nav-tabs nav-justified mb-3" id="ex1" role="tablist">
                <li class="nav-item" role="presentation">
                    <a
                    data-mdb-tab-init
                    class="nav-link active"
                    id="ex3-tab-1"
                    href="#ex3-tabs-1"
                    role="tab"
                    aria-controls="ex3-tabs-1"
                    aria-selected="true"
                    >Manual Upload</a
                    >
                </li>
                <li class="nav-item" role="presentation">
                    <a
                    data-mdb-tab-init
                    class="nav-link"
                    id="ex3-tab-2"
                    href="#ex3-tabs-2"
                    role="tab"
                    aria-controls="ex3-tabs-2"
                    aria-selected="false"
                    >File upload</a
                    >
                </li>
            </ul>
            <!-- Tabs navs -->
        </div>
        <div id="manual-upload">
            <form class="manual-form">
                <div class ="input">
                    <label>Date Sighted*</label>
                <input type="date" required="True">
                </div>
                <div class ="input">
                    <label >Species*</label>
                    <select required="True">
                        <option value=""></option>
                        <option value="whale1">Whale 1</option>
                        <option value="whale1">Whale 2</option>
                        <option value="whale1">Whale 3</option>
                        <option value="whale1">Whale 4</option>
                    </select>
                </div>
                <div class ="input">
                    <label>Pod</label>
                    <select>
                        <option value=""></option>
                        <option value="pod1">Pod 1</option>
                        <option value="pod2">Pod 2</option>
                        <option value="pod3">Pod 3</option>
                        <option value="pod4">Pod 4</option>
                    </select>
                </div>
                <div class ="input">
                    <label>Number Sightings*</label>
                <select required="True">
                    <option value=""></option>
                    <option value="no1">Number 1</option>
                    <option value="no2">Number 2</option>
                    <option value="no3">Number 3</option>
                    <option value="no4">Number 4</option>
                </select>
                </div>
                <div class ="input">
                    <label>Observed Behaviours</label>
                    <select>
                        <option value=""></option>
                        <option value="behaviour1">behaviour 1</option>
                        <option value="behaviour2">behaviour 2</option>
                        <option value="behaviour3">behaviour 3</option>
                        <option value="behaviour4">behaviour 4</option>
                    </select>
                </div>
                <div class ="input">
                    <label>Additional notes </label>
                <textarea></textarea>
                </div>
                <div class ="input">
                    <label>Images</label>
                    <img src="@/assets/Image-placeholder.svg" alt="Image placeholder" class="IP" />
                    <img src="@/assets/Image-placeholder.svg" alt="Image placeholder" class="IP" />
                    <button type="button">Edit Images</button>
                </div>
            </form>
        </div>
        <!--<div id="file-upload">
            <div id="file-msg">
                <span>Import your data as a csv file.</span>
                <span>Use the template to format your data before uploading.</span>
            </div>
        </div>-->
        <div class ="input">
            <input type="submit" id="submit-btn" value="Upload sighting">
        </div>

        
        <div class="links">
            <h2>Want to contribute to Acartia? Check out these links!</h2>
            <mdb-row class="row">
                <a class="btn btn-primary" data-mdb-ripple-init href="mailto:info@acartia.io" role="button" id="btns">
                    <img src="@/assets/htc-icon.svg" alt="Hand Icon" class="cont-icon" />
                    How to Contribute
                    <img src="@/assets/right-icon.svg" alt="Right Icon" class="righticon" />
                    <span>New to uploading data? Click here to learn how you can provide data.</span>
                </a>
                <a class="btn btn-primary" data-mdb-ripple-init href="mailto:info@acartia.io" role="button" id="btns">
                    <img src="@/assets/download-icon.svg" alt="Export Icon" class="cont-icon" />
                    Export data
                    <img src="@/assets/right-icon.svg" alt="Right Icon" class="righticon" />
                    <span>Download Acartia sightings data here.</span>
                </a>
                <a class="btn btn-primary" data-mdb-ripple-init href="mailto:info@acartia.io" role="button" id="btns">
                    <img src="@/assets/upload-icon.svg" alt="Upload Icon" class="cont-icon" />
                    Upload Sightings
                    <img src="@/assets/right-icon.svg" alt="Right Icon" class="righticon" />
                    <span>Upload your sightings here.</span>
                </a>
            </mdb-row>
        </div>
    </div>
</template>

<script>

export default {
    name: 'About',
    components: {
    },
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Mukta:wght@200;300;400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Mukta:wght@200;300;400;500;600;700;800&display=swap');

.IP {
    padding-top: 12px;
}

.input button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 24px 10px 24px;
    width: 327px;
    height: 48px;
    background: rgba(238, 241, 244, 1);
    border-radius: 10px;
    color: rgba(61, 57, 81, 1);
    font-family: 'Montserrat';
    font-size: 16px;
    font-weight: 600;
    margin-top: 12px;
}

.upload-container {
    font-family: 'Montserrat';
    color: rgba(61, 57, 81, 1);
}

.header h1 {
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
    color: rgba(61, 57, 81, 1);
}

h2 {
    font-family: 'Mukta';
    font-size: 28px !important;
    font-weight: 600 !important;
    line-height: 29.4px;
    text-align: center;
}

.tab {
    width: 1120px;
    height: auto;
    margin: auto;
    font-family: 'Montserrat';
    font-weight: 600;
    font-size: 16px;
}

#manual-upload {
    width: 1120px;
    height: auto;
    padding: 0px 160px 0px 160px;
    padding-bottom: 24px;
    margin: auto;
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
  color: rgba(61, 57, 81, 1);
}

.input select {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #3d3951;
  border-radius: 4px;
  font-family: 'Montserrat';
  font-weight: 500;
  font-size: 16px;
  color: rgba(61, 57, 81, 1);
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
}
</style>
