<template lang="html">

  <!-- <v-navigation-drawer fixed
    v-bind:drawer="drawer"
    v-on:change="$emit('drawerMutate', $event.target.value)"

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
      @click='drawerLink(item.title)'
      >
      <v-list-tile-action>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>

    <v-list-tile
    @click='drawerLink(reqInfo.path)'
    >
    <v-list-tile-action>
      <v-icon left >{{reqInfo.icon }}</v-icon>
    </v-list-tile-action>
    <v-list-tile-title>{{reqInfo.title }}</v-list-tile-title>
  </v-list-tile>
</v-list>
</v-navigation-drawer> -->

</template>

<script>
export default {
  data () {
    return {
      drawerValue: () => {this.drawer},
    }
  },
  props: ['leftItems', 'drawerLink', 'reqInfo', 'drawer' ],


}
</script>

<style lang="css" scoped>
</style>
