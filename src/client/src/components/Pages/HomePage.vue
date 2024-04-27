<template>
    <div>
        <Map id="home-map"></Map>
        <card-component id="home-about-card" :withHeader="false">
            <h1>Acartia</h1>
          <div class="text-left">
            <p>
              A decentralized data cooperative for sharing marine animal locations within the Salish Sea and across coastal Cascadia.
              Let’s work together to monitor and map marine wildlife -- from plankton to orcas!
            </p>
            <p>
              This page shows all species located in the last 7 days
            </p>
          </div>
            <mdb-btn outline="black" tag="a" href="/about">Learn More</mdb-btn>
        </card-component>
    </div>
</template>

<script>
import Map from '../MapComponent'
import CardComponent from '../CardComponent.vue'
import { mdbBtn } from 'mdbvue'

export default {
    name: 'Home',
    components: {
        Map,
        CardComponent,
        mdbBtn
    },
}
</script>

<style scoped>

#home-about-card {
    width: 40%;
    top: 6vh;
    right: -30vh;
    margin: 10px;
    background-color: transparent;
    position: fixed;
    display: inline-block;
}
</style>
