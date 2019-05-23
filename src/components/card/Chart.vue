<template lang="html">
  <v-flex class='text-xs-left'>
    <div>
      <h5>Quote</h5>
    </div>

    <!-- chart -->
    <GChart
      type="LineChart"
      :data="chartData"
      :options="chartOptions"
    />
    <v-expansion-panel style='box-shadow: none;'>
     <v-expansion-panel-content
      style='background-color: #81C784'
      v-for="(item,i) in 1"
      :key="i"
     >
       <template v-slot:header>
         <div>Daily average price, $</div>
       </template>

       <!-- table -->
       <v-flex >

           <v-data-table

             class="white--text mytable pa-1"
             hide-actions
             search
             :headers="headers"
             :items="companyTable"
           >
             <template v-slot:items="props" >
               <td class="text-xs-left">{{ props.item[0] }}</td>
               <td class="text-xs-left">{{ props.item[1] }}</td>
             </template>
           </v-data-table>

       </v-flex>


     </v-expansion-panel-content>
   </v-expansion-panel>
  </v-flex>
</template>

<script>
export default {
  props: ['chartData', 'companyTable'],
  data () {
    return {
      chartOptions: {
        backgroundColor: {
        gradient: {
          // Start color for gradient.
          color1: '#81C784',
          // Finish color for gradient.
          color2: '#fbf6a7',
          // Where on the boundary to start and
          // end the color1/color2 gradient,
          // relative to the upper left corner
          // of the boundary.
          x1: '0%', y1: '100%',
          x2: '100%', y2: '0%',
          // If true, the boundary for x1,
          // y1, x2, and y2 is the box. If
          // false, it's the entire chart.
          useObjectBoundingBoxUnits: true
        },
            // stroke: '#E4E4E4',
            // strokeWidth: 2
      },
        chart: {
          title: "Company chart",
          subtitle: "Stock price",
          hAxis: {
              direction: -1,
              slantedText: true,
              slantedTextAngle: 90 // here you can even use 180
          }
        }
      },
      headers: [
        { text: 'Date', value: 'date', align: 'left', sortable: false, },
        { text: 'Price, $', value: 'price', sortable: false, },
      ],
    }
  }
}
</script>

<style lang="css" scoped>
.mytable table td {
  background-color: #F5F5F5;
}
</style>
