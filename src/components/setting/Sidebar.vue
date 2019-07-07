<template>
  <div>
    <h1>Liste d'actualites</h1>
    <ul class="list-group list-group-flush text-left">
      <li v-for="(content, i )  in contents  " v-if="i <= 17 " class="list-group-item">
        <router-link v-bind:to=" '/news/' + i " class="nav-link">{{ content.title }}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "sidebar",

  data() {
    return {};
  },
  props: ["contents"], //声明一个自定义的属性

  methods: {
    getObj(obj) {
      this.contents = obj.items;
    }
  },
  watch: {
     
  }
};
</script>

<style scoped>
a {
  color: rgba(49, 48, 48, 0.897);
}
</style>


