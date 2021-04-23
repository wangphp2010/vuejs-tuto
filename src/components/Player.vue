<template>
  <div class="container">
    <h1>player page</h1>
    <ul>
      <li>Number:{{detail.uid}}</li>
      <li>name:{{detail.name}}</li>
      <li>point:{{detail.point}}</li>
    </ul>

    <router-link :to="profileVar">Profile</router-link><!-- profileVar 是变量 -->
    <router-link :to="statsVar">stats</router-link>

    <router-view></router-view>
  </div>
</template>

<script>
//import...
export default {
  name: "Player",
  data() {
    return {
      detail: {},
      profileVar: "",
      statsVar: "",
    };
  },
  mounted() {
    this.detail = this.getPlayer(this.$route.params.uid);
    this.profileVar = "/player/" + this.$route.params.uid + "/profile";
    this.statsVar = "/player/" + this.$route.params.uid + "/stats";
  },
  //同个页面已经实例化过,因此不会再次实例化,有了这句则 同个页面会根据不同参数更新数据
  // 路由更新前调用的方法
  beforeRouteUpdate(to, from, next) {
   
    // to 要点击的路由,from 来源路由
    // console.log(to)
    this.detail = this.getPlayer(to.params.uid);
    this.profileVar = "/player/" + to. params.uid + "/profile";
    this.statsVar = "/player/" + to. params.uid + "/stats";
    next();
  },
  methods: {
    getPlayer(uid) {
      switch (uid.toString()) {
        case "1":
          return { uid: 1, name: "犀利", point: 26 };
        case "2":
          return { uid: 2, name: "哈登", point: 30 };
        default:
          return { udi: -1 };
      }
    }
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

