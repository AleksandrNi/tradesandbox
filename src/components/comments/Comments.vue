<template lang="html">
  <!-- comments -->
  <v-flex class='text-xs-left'>
    <div>
      <h5>Comments</h5>
    </div>
    <!-- <div>
      <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
    </div> -->
    <v-textarea
      key='textarea'
      class='newsBlock px-3'
      name="input-7-4"
      height='120px'

      rows="6"
      label=" Let's leave your comment about the company"
      v-model='comment'
     ></v-textarea>
     <v-btn @click.stop='sendMessage'
      class='search'
      block
     >Submit</v-btn>
     <v-expansion-panel style='box-shadow: none; '>
      <v-expansion-panel-content
       style='background-color: #81C784'
       v-for="(item,i) in 1"
       :key="i"
      >
        <template v-slot:header>
          <div>Comments</div>
        </template>

        <!-- table -->
        <v-flex >

            <v-data-table
              class="white--text mytable"
              hide-actions
              search
              :headers="headers"
              :items="comments"
            >
              <template v-slot:items="props" expand>
                <td class="text-xs-left">{{ props.item[0]['date'] }}</td>
                <td class="text-xs-left">{{ props.item[0]['comment'] }}</td>
              </template>
            </v-data-table>

        </v-flex>


      </v-expansion-panel-content>
    </v-expansion-panel>

  </v-flex>
</template>

<script>
import * as types from '../../store/types'
import {mapActions, mapGetters} from 'vuex'

// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
  props: {
    ticker: String
  },
  data () {
    return {
      comment: '',
      comments: [[{date:'', comment: ''}]],
      companyComments: [['title', 'comment'],['title1', 'comment1']],
      headers: [
        { text: 'Date', value: 'date', align: 'left', sortable: false, },
        { text: 'Comment', value: 'comment', sortable: false, },
      ],
      // editor: ClassicEditor,
      // editorData: '<p>Rich-text editor content.</p>',
      // editorConfig: {
      //     // The configuration of the rich-text editor.
      // },
    }
  },
  methods: {
    ...mapActions({
      sendMessageAction: types.ACTION_COMMENT_SEND_COMMENT
    }),
    ...mapGetters({
      getCommentsByTicker_ID: types.GET_COMMENTS_BY_TICKER_ID
    }),

    sendMessage() {

      let currentDate = new Date()
      currentDate = currentDate.toLocaleString()

      this.sendMessageAction({
        comment: {
          date: currentDate,
          comment: this.comment
        },
        ticker: this.ticker,
      });
      this.comment = '';
      this.getCommentsByTicker_ID()
      return true
    },
  },
  created () {
    this.comments = this.getCommentsByTicker_ID()
  }

}
</script>

<style lang="css" scoped>
.mytable table td {
  background-color: #F5F5F5;
}
.v-messages {
  margin:0px;
  padding:0px;
}
</style>
