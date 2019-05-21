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
              class="white--text mytable pa-1"
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
import {mapActions} from 'vuex'

// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
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
      sendCommentAction: types.ACTION_COMMENT_SEND_COMMENT
    }),
    async sendMessage() {
      this.sendCommentAction({
        comment: this.comment,
        ticker: this.ticker,
      });
      this.comment = '';
      // refresh data
      this.comments = await this.getComments()
      return true
    },
    async getComments() {
      if(this.ticker) {
        await this.$store.dispatch(types.ACTION_COMMENTS_GET_COMMENTS_BY_TICKER, this.ticker);
        return this.$store.getters[types.GET_COMMENTS_GET_COMMENTS_BY_TICKER](this.ticker)
      }
    },
  },
  computed: {
      ticker () {
        return  this.$route.params.ticker ? this.$route.params.ticker.toLowerCase() : ''
      },
    },
  async created () {
    this.comments = await this.getComments()

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
.text-xs-left {
  margin-left: 0px;
  font-size: .9rem;
}
tr td {
  margin-left: 0px;
}
</style>
