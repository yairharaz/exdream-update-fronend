
<template>
  <div class="block">
    <el-date-picker
      v-model="value"
      type="date"
      placeholder="Add date">
    </el-date-picker>
  </div>
</template>

<script>
  export default {
    props: ['date'],
    data() {
      return {
        value: this.date,
      }
    },
    created(){
      this.checkDate()
    },
    methods:{
      checkDate(){
        if (this.date !== null) {
          this.$emit('setDay' , this.value)
        }
      }
    },
  watch: {
    value(){
        this.$emit('setDay' , this.value.getTime())
     }
  },
}
</script>