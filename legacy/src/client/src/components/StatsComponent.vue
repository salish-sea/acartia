<template>
    <mdb-col lg="6" class="mb-4">
        <mdb-card>
        <mdb-card-header>{{componentHeader}}</mdb-card-header>
        <mdb-card-body>
            <slot></slot>
        </mdb-card-body>
        </mdb-card>
    </mdb-col>
</template>

<script>
import { mdbCol, mdbCard, mdbCardBody, mdbCardHeader } from 'mdbvue'

export default {
    name: 'CardAnalytic',
    components: {
        mdbCol,
        mdbCard,
        mdbCardBody,
        mdbCardHeader
    },
    props: {
        componentHeader: String
    }    
}
</script>
