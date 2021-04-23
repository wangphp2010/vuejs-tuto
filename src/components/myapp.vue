<template>
  <div class="container">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
//import...
export default {
  name: "myapp",
  data() {
    return {
      msg: "  myapp.vue"
    };
  }
};
</script>

<!-- add 'scoped' attribute to limit css to this component only -->
<style scoped >
h1 {
  font-weight: normal;
  color: red;
}
</style>

