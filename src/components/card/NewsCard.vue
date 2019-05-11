<template lang="html">
<v-layout>
  <v-flex class='px-3'>

    <v-layout row wrap >

            <v-flex class='pa-3 my-1 newsBlock text-xs-left'
            style='border-radius:5px;'
            v-for='item in news'
            :key='item.image'
            >
                <p style='font-size:1.2rem'>{{item.headline}}</p>
                <p style='font-size:1rem'>{{item.summary}}</p>
                <div style=' font-size:.8rem'>source: {{item.source}}</div>
                <div style='font-size:.8rem' v-if='item.datetime'>{{ item.datetime.split('T')[0] }}</div>

            </v-flex>

    </v-layout>

  </v-flex>
</v-layout>
</template>

<script>
export default {
  props: ['news']
}
</script>

<style lang="css" scoped>

</style>
