<template>
    <div id="about-container">
        <div class="page-desc">
            <h2>Our Partners</h2>
            <p id="left">
                Our partners provide the essential data showcased on our platform, offering a comprehensive resource for marine enthusiasts, researchers, and conservationists globally.
            </p>
            <p id="middle">
                Click on each partners icon to see more information about the company
            </p>
        </div>
        
        <div class="partners">
            <mdb-container id="container">
                <mdb-row>
                    <div class="col-3 border mb-5 mr-5 rounded-xl" id="borders">
                        <mdb-col col="sm"><img src="../../assets/orcasound.png" alt="Orcasound" id="orcasound"></mdb-col>
                        <div class="icon1"><a href="https://www.orcasound.net/" class="sm"><img src="@/assets/plus-icon.svg" alt="Plus Icon" class="icon"/>See more</a></div>
                    </div>
                    <div class="col-3 border mb-5 mr-5 rounded-xl">
                        <mdb-col col="sm"><img src="../../assets/orcanetwork.png" alt="Orca Network" id="orcanetwork"></mdb-col>
                        <div class="icon2"><a href="https://www.orcanetwork.org/" class="sm"><img src="@/assets/plus-icon.svg" alt="Plus Icon" class="icon"/>See more</a></div>
                    </div>
                    <div class="col-3 border mb-5 mr-5 rounded-xl">
                        <mdb-col col="sm"><img src="../../assets/typehuman.png" alt="TypeHuman" id="typehuman"></mdb-col>
                        <div class="icon3"><a href="https://www.typehuman.com/" class="sm"><img src="@/assets/plus-icon.svg" alt="Plus Icon" class="icon"/>See more</a></div>
                    </div>
                </mdb-row>
                <mdb-row>
                    <div class="col-3 border mb-5 mr-5 rounded-xl">
                        <mdb-col col="sm"><img src="../../assets/conserveio.png" alt="Conserve.io" id="conserve"></mdb-col>
                        <div class="icon4"><a href="https://conserve.io/" class="sm"><img src="@/assets/plus-icon.svg" alt="Plus Icon" class="icon"/>See more</a></div>
                    </div>
                    <div class="col-3 border mb-5 mr-5 rounded-xl">
                        <mdb-col col="sm"><img src="../../assets/resolve.png" alt="Resolve Conservation" id="rc"></mdb-col>
                        <div class="icon5"><a href="https://www.resolveconservation.com/" class="sm"><img src="@/assets/plus-icon.svg" alt="Plus Icon" class="icon"/>See more</a></div>
                    </div>
                    <div class="col-3 border mb-5 mr-5 rounded-xl">
                        <mdb-col col="sm"><img src="../../assets/beamreach.png" alt="Beam Reach" id="br"></mdb-col>
                        <div class="icon6"><a href="https://beamreach.blue/" class="sm"><img src="@/assets/plus-icon.svg" alt="Plus Icon" class="icon"/>See more</a></div>
                    </div>
                </mdb-row>
            </mdb-container>
        </div>

        <div class="page-links">
            <mdb-row>
                <a href="/dashboard" class="link2">See our partners data contrbution</a>
            </mdb-row>
        </div>
    </div>
</template>

<script>
import {mdbContainer, mdbRow, mdbCol} from 'mdbvue';

  export default {
    components: {
      mdbContainer,
      mdbRow,
      mdbCol
    }
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Mukta:wght@200;300;400;500;600;700;800&display=swap');

.page-desc {
    text-align: center;
    width: 50%;
    padding: 5%;
    margin: auto;
    position: relative;
    margin-left: 5%;
    display: inline-table;
}

#container{
    width: auto;
    justify-content: center;
    align-items: center;
    align-content: center;
    margin-left: 25%;
}

h2 {
    font-family: 'Mukta';
    font-size: 44px !important;
    font-weight: 600 !important;
    line-height: 44px;
}

#left {
    text-align: left;
    font-family: 'Montserrat';
    font-weight: 400;
    font-size: 16px;
}

#middle {
    text-align: center;
    font-family: 'Montserrat';
    font-weight: 400;
    font-size: 16px;
}

a:link {
    color: black;
}

a:visited{
    color: black;
}

a:hover {
    color: black;
}

a:active {
  color: black;
}

.icon {
    width: 24px;
    height: 24px;
    margin-right: 5px;
    margin-bottom: 3px;
}

.icon1 {
    margin-top: 20%;
    margin-bottom: 10%;
}

.icon2 {
    margin-top: 37%;
}

.icon3 {
    margin-top: 50%;
}

.icon4 {
    margin-top: 50%;
    margin-bottom: 10%;
}

.icon5 {
    margin-top: 30%;
    font-weight: 500;
}

.icon6 {
    margin-top: 15%;
    font-weight: 500;
}

.sm {
    font-weight: 500;
    font-family: 'Montserrat';
    font-size: 16px;

}

.rounded-xl {
    border-radius: 16px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
}

#orcasound {
    width: 110%;
    height: auto;
    padding-top: 10%;
    padding-right: 10%;
}

#orcanetwork {
    width: 100%;
    height: auto;
    padding-top: 30%;
}

#typehuman {
    width: 100%;
    height: auto;
    padding-top: 50%;
}

#conserve {
    width: 100%;
    height: auto;
    padding-top: 50%;
}

#rc {
    width: 100%;
    height: auto;
    padding-top: 20%;
}

#br {
    width: 100%;
    height: auto;
    padding-top: 15%;
}

.link2 {
    font-weight: 500;
    font-family: 'Montserrat';
    font-size: 16px;
    line-height: 22.4px;
    display: inline-block;
    text-align: center;
    margin-left: 45%;
}

.righticon {
    position: relative;
    top: -20px;
    right: -290px;
    display: inline-block;
    line-height: 22.4px;
}
</style>
