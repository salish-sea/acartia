<template>
    <div id="about-container">
        <div class="partner-desc">
            <h2>Our Partners</h2>
            <div id="left">
                <span>Our partners provide the essential data showcased on our platform, offering a</span> 
                <span>comprehensive resource for marine enthusiasts, researchers, and conservationists globally.</span>
            </div>
            <div id="middle">
                Click on each partners icon to see more information about the company
            </div>
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
            <mdb-row>
                <mdb-col col="12">
                    <div class="page-links">
                        <a href="https://github.com" class="link2">See our partners data contributions<img src="@/assets/right-arrow.svg" alt="Right Arrow" class="rightarrow"/></a>
                    </div>
                </mdb-col>
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Mukta:wght@200;300;400;500;600;700;800&display=swap');

.partner-desc {
    text-align: center;
    position: relative;
    width: 743px;
    height: auto;
    margin: auto;
    top: 54px;
    padding-bottom: 108px;
}

#container{
    width: auto;
    justify-content: center;
    align-items: center;
    align-content: center;
    margin-left: 25%;
}

.partner-desc h2 {
    font-family: 'Mukta';
    font-size: 44px !important;
    font-weight: 600 !important;
    line-height: 44px !important;
    text-align: center !important;
    color: rgba(61, 57, 81, 1);
}

#left {
    text-align: left;
    font-family: 'Montserrat';
    font-weight: 400;
    font-size: 16px;
    line-height: 22.4px;
    margin-top: 24px;
}

#left span {
    display: block;
}

#middle {
    text-align: center;
    font-family: 'Montserrat';
    font-weight: 400;
    font-size: 16px;
    line-height: 22.4px;
    margin-top: 24px;
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
    text-align: center;
}

.icon2 {
    margin-top: 37%;
    text-align: center;
}

.icon3 {
    margin-top: 50%;
    text-align: center;
}

.icon4 {
    margin-top: 50%;
    margin-bottom: 10%;
    text-align: center;
}

.icon5 {
    margin-top: 30%;
    font-weight: 500;
    text-align: center;
}

.icon6 {
    margin-top: 15%;
    font-weight: 500;
    text-align: center;
}

.sm {
    font-weight: 500;
    font-family: 'Montserrat';
    font-size: 16px;

}

.rounded-xl {
    border-radius: 16px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
    border-style: hidden !important;
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

.page-links {
    padding: 10px 12px 10px 12px;
    margin-bottom: 54px;
}

.link2 {
    font-weight: 500;
    font-family: 'Montserrat';
    font-size: 16px;
    line-height: 22.4px;
    display: inline-block;
    margin-left: 42%;
}

.rightarrow {
    position: relative;
    display: inline-block;
    margin-left: 8px;
    padding-bottom: 2px;
}
</style>
