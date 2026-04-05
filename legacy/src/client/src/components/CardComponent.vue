<template>
<section>
    <mdb-row>
        <mdb-col lg="6" class="mb-4">
          <mdb-card>
            <mdb-card-header v-if="withHeader">{{componentHeader}}</mdb-card-header>
            <mdb-card-body>
                <slot></slot>
            </mdb-card-body>
          </mdb-card>
        </mdb-col>
    </mdb-row>
</section>
</template>

<script>
import { mdbRow, mdbCol, mdbCard, mdbCardBody, mdbCardHeader } from 'mdbvue'

export default {
    name: 'CardAnalytic',
    components: {
        mdbRow,
        mdbCol,
        mdbCard,
        mdbCardBody,
        mdbCardHeader
    },
    props: {
        componentHeader: String,
        withHeader: Boolean
    }
    
}
</script>