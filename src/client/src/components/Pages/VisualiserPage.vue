<template>
    <div>
        <Info/>
        <Map />
    </div>
</template>

<script>
import Map from '../MapComponent'
import Info from '../InfoPopUpComponent'

export default {
    name: 'Visualiser',
    components: {
        Map,
        Info
    },
}
</script>
