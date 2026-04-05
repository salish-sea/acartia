<template>
  <div>
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
          <div class="box">
              <div class="img"><img src="../../assets/orcasound.png" alt="Orcasound" id="orcasound"></div>
              <div class="sm"><a href="https://www.orcasound.net/" target="_blank" class="sm"><img src="@/assets/plus-icon.svg" alt="Plus Icon" class="icon"/>See more</a></div>
          </div>

          <div class="box">
              <div class="img"><img src="../../assets/orcanetwork.png" alt="Orca Network" id="orcanetwork"></div>
              <div class="sm"><a href="https://www.orcanetwork.org/" target="_blank" class="sm"><img src="@/assets/plus-icon.svg" alt="Plus Icon" class="icon"/>See more</a></div>
          </div>

          <div class="box">
              <div class="img"><img src="../../assets/typehuman.png" alt="TypeHuman" id="typehuman"></div>
              <div class="sm"><a href="https://www.typehuman.com/" target="_blank" class="sm"><img src="@/assets/plus-icon.svg" alt="Plus Icon" class="icon"/>See more</a></div>
          </div>


          <div class="box">
              <div class="img"><img src="../../assets/conserveio.png" alt="Conserve.io" id="conserve"></div>
              <div class="sm"><a href="https://conserve.io/" target="_blank" class="sm"><img src="@/assets/plus-icon.svg" alt="Plus Icon" class="icon"/>See more</a></div>
          </div>

          <div class="box">
              <div class="img"><img src="../../assets/resolve.png" alt="Resolve Conservation" id="rc"></div>
              <div class="sm"><a href="https://www.resolveconservation.com/" target="_blank" class="sm"><img src="@/assets/plus-icon.svg" alt="Plus Icon" class="icon"/>See more</a></div>
          </div>

          <div class="box">
              <div class="img"><img src="../../assets/beamreach.png" alt="Beam Reach" id="br"></div>
              <div class="sm"><a href="https://beamreach.blue/" target="_blank" class="sm"><img src="@/assets/plus-icon.svg" alt="Plus Icon" class="icon"/>See more</a></div>
          </div>
        </div>
      <div>
          <div class="page-links">
              <a href="https://github.com/salish-sea/acartia" class="link2">See our partners data contributions<img src="@/assets/right-arrow.svg" alt="Right Arrow" class="rightarrow"/></a>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import {} from 'mdbvue';

  export default {
    components: {
    }
  }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Mukta:wght@200;300;400;500;600;700;800&display=swap');

.partner-desc {
  text-align: center;
  position: relative;
  max-width: 743px;
  height: auto;
  margin: auto;
  top: 54px;
  padding-bottom: 108px;
}

.partners{
    max-width: 1128px;
    height: auto;
    margin: auto;
    justify-content: center;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(343px, 1fr));
    gap: 30px 10px;;
}

.partner-desc h2 {
  font-family: 'Mukta';
  font-size: 44px !important;
  font-weight: 600 !important;
  line-height: 44px !important;
  text-align: center !important;
  color: #3D3951;
}

#left {
  text-align: center;
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

.row {
    display: inline-flex;
    gap: 54px;
    margin-bottom: 54px;
}

.box {
    width: 343px;
    height: 409px;
    font-weight: 500;
    font-family: 'Montserrat';
    font-size: 16px;
    border-radius: 16px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
    border-style: hidden !important;
    display: inline-block;
    margin-left: auto;
    margin-right: auto;
}

.img {
    width: 262.08px;
    height: 343px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
}

a:link {
  color: black;
}

a:visited {
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

.sm {
    width: auto;
    height: auto;
    text-align: center;
    padding: 10px 12px 10px 12px;
    margin: auto;
}

#orcasound {
    width: 110%;
    height: auto;

}

#orcanetwork {
    width: 100%;
    height: auto;

}

#typehuman {
    width: 100%;
    height: auto;
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
    margin-top: 60px;
    margin-bottom: 54px;
    text-align: center;
}

.link2 {
    font-weight: 500;
    font-family: 'Montserrat';
    font-size: 16px;
    line-height: 22.4px;
    display: inline-block;
}

.rightarrow {
  position: relative;
  display: inline-block;
  margin-left: 8px;
  padding-bottom: 2px;
}

@media (max-width: 600px) {
  #middle,
  #left {
    text-align: left;
    margin-left: 15px;
    margin-right: 14px;
  }
}
</style>
