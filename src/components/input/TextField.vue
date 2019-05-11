<template lang="html">

  <v-text-field
  :class='textFieldParams.class'
  :counter='textFieldParams.counter ? textFieldParams.max : false'
  :maxlength='textFieldParams.max'
  :label='textFieldParams.label'

  :rules="[rules.required, rules.min, rules.max, rules.pattern ]"
  :type="rules.show ? textFieldParams.type : 'password'"
  @input='emitCheckedQueryString'
  v-model="inputValue"
  key="search"

  ></v-text-field>

</template>

<script>
export default {
  props: ['textFieldParams'], // 'inputValue', 'counter', 'min', 'max', 'type', 'rules: {min:'String', 'max:'String'}', 'show', 'label', required', 'class'
  data () {
    return {
      inputValue: this.textFieldParams.inputValue,
      rules: {
        show: this.textFieldParams.show,
        required: this.textFieldParams.required,
        min: v => {
          let a = false;
          if (this.textFieldParams.required) {
            v && v.trim().length  >= this.textFieldParams.min ?
             a = true
            : a = this.textFieldParams.rules.min
          }
          return a || true
        },
        max: v => {
          let a = false;
          if (this.textFieldParams.required) {
            v && v.trim().length  <= this.textFieldParams.max ?
             a = true
            : a = this.textFieldParams.rules.max
          }
          return a || true
        },
        pattern: value => {
          // ticker validation
          if (this.textFieldParams.type === 'text') {
            const regexp = `^(([a-zA-Z]{2,5}))$`
            const pattern = new RegExp(regexp);
            return pattern.test(value) || '' // Invalid ticker.

            // email validation
          } else if (this.textFieldParams.type === 'email') {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || '' // Invalid e-mail.

            // paper buy, sell validation
          }  else if (this.textFieldParams.type === 'number') {
            const regexp = `^(([0-9]{1,10}))$`
            const pattern = new RegExp(regexp);
            return pattern.test(value) || ''

            // price validation 4 signs float
          }  else if (this.textFieldParams.type === 'price') {
            const regexp = `^(([0-9]{1,10}))$`
            const pattern = new RegExp(regexp);
            return pattern.test(value*10000) || ''

            // percentage validation (*/- , 2 signs float)
          }  else if (this.textFieldParams.type === 'percentage') {
            const regexp = `^(([-]{0,1}[0-9]{1,5}))$`
            const pattern = new RegExp(regexp);
            return pattern.test(value*100) || ''

          }
          // email validation

        },

      }

    }
  },
  methods: {
    emitCheckedQueryString () {
        if(
        this.rules.min(this.inputValue) === true &&
        this.rules.max(this.inputValue) === true &&
        this.rules.pattern(this.inputValue) === true
        ) {
          this.$emit('update:input', this.inputValue)
          return this.inputValue;
        }
          this.$emit('update:input', '')
          return false;
      }
  }
}
</script>

<style lang="css" scoped>

</style>
