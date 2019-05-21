<template lang="html">
  <div>
    <v-navigation-drawer
      fixed
      v-model='drawer'
      >
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              Menu
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider></v-divider>

      <v-list dense class="pt-0">
        <v-list-tile
        v-for="item in leftItems"
        :key="item.title"
        @click='drawerLink({pageTo: item.path, pageFrom: item.path })'
        >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <!-- <v-list-tile
      @click='drawerLink(reqInfo.path)'
      >
      <v-list-tile-action>
        <v-icon left >{{reqInfo.icon }}</v-icon>
      </v-list-tile-action>
      <v-list-tile-title>{{reqInfo.title }}</v-list-tile-title>
    </v-list-tile> -->
  </v-list>
  </v-navigation-drawer>

<!-- <app-navdrawer

:leftItems='leftItems'
:drawerLink='drawerLink'
:reqInfo='reqInfo'
:drawer='drawer'
@drawerMutate='drawer = $emit'
></app-navdrawer> -->

  <!-- Toolbar -->
  <v-toolbar class='primary' >
    <!-- left menu hamburger -->
    <v-toolbar-side-icon
    @click.stop="drawer = !drawer"
    class="hidden-md-and-up"></v-toolbar-side-icon>

    <!-- Header -->
    <v-toolbar-title
    style='cursor:pointer'
    >
    <span
    @click='pathMethod({pageTo: "home", pageFrom: "home"})'
    class="tertiary--text font-weight-light"
    >Trade Sandbox
    </span>
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <!-- Menu buttons -->
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn
        :key="item.title"
        v-for="item in leftItems"
        flat
        @click='pathMethod({pageTo: item.path, pageFrom: item.path})'
        class="tertiary--text font-weight-light"
        >
        <v-icon left small>{{item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>

      <!-- <v-btn flat
        :to='{name: reqInfo.path}'
        class="tertiary--text font-weight-light"
        >
        <v-icon left small>{{reqInfo.icon }}</v-icon>
        {{ reqInfo.title }}
      </v-btn> -->
    </v-toolbar-items>


</v-toolbar>

  </div>

</template>

<script>
import * as types from '../../store/types'
import {pathMethod} from '../../methods/PathMethod'
export default {
  data () {
    return {
      leftItems: [
        {title: 'portfolio', icon: 'account_balance', path:'portfolio'},
        {title: 'favorite', icon: 'bookmark', path:'favorite' },
        {title: 'stocks', icon: 'add_circle', path:'stocks' },
        {title: 'profile', icon: 'person', path:'profile' }
      ],
      home:'home',
      drawer: false,
      // reqInfo: '',
      // userInfo:{auth: true}

    }
  },
  methods: {
    drawerLink (path) {
      this.drawer = !this.drawer
      this.pathMethod(path)
    },
    pathMethod
  },
  components: {
    // appNavdrawer: () => import('./NavDrawer')
  },
  created () {
    this.$store.dispatch(types.ACTION_GET_FAVORITE_COMPANIES)
  }
}
</script>

<style lang="css" scoped>
a:hover {
  text-decoration: none;
}
</style>
