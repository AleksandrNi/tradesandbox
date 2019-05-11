<template>
  <v-app>
    <app-toolbar dark></app-toolbar>
    <v-container xs12 text-xs-center >
      <v-layout row wrap>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
        <!-- <app-maincard></app-maincard>
        <app-stocks></app-stocks>
        <app-portfolio></app-portfolio> -->
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>


export default {
  data () {
    return {
      selectedTab: 'Main'
    }
  },
  methods: {

  },
  components: {
    // appMain: () => import('./components/MainCard'),
    // appPortfolio: () => import('./components/Portfolio'),
    // appFavorite: () => import('./components/Favorite'),
    // appStocks: () => import('./components/Stocks'),
    appToolbar: () => import('./components/toolbar/Toolbar')
  },

}
</script>
<style scoped>
</style>
