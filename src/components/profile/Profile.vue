<template lang="html">
  <v-container>
    <v-layout row wrap >

      <app-portfoliotable/>

    </v-layout>

  </v-container>
</template>

<script>
import {pathMethod} from '../../methods/PathMethod'

export default {
  data () {
    return {
      
    }
  },
  components: {
        appPortfoliotable: () => import('../card/PortfolioTable'),
  },
  methods:{
    pathMethod
  },
  created() {
    this.pathMethod({pageFrom:"profile"})
  }
}
</script>

<style lang="css" scoped>
</style>
