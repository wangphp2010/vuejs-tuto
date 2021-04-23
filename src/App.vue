<template>
  <div id="app">
    <div class="container-fluid">
      <router-view v-bind:headerTag="headerTag" name="myHeader"></router-view>
 
      
     

    <transition  :name="transitionName" mode="out-in"  > 
          <router-view name="Home" v-bind:contents="contents" ></router-view>
          <router-view name="News" v-bind:contents="contents" ></router-view>
          <router-view name="About" v-bind:contents="contents"></router-view>
          <router-view name="People"></router-view>
          <router-view name="Contact"></router-view>
          <router-view name="Page404"></router-view>
    </transition>
      <!--  <router-view v-bind:contents="contents" /> -->

      <div class="jumbotron container-fluid footer mt-4">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur eveniet repellat saepe optio, maiores ratione beatae tempore voluptatibus quidem, a debitis fugit excepturi consequuntur, aliquam iure eaque! Laborum, sit ipsam.
        <br />Design by
        <a class="badge badge-secondary" href="http://php2010.free.fr">PHP STUDIO</a>
      </div>
    </div>

    <!-- <p>
      <router-link to="/">Home</router-link>
      
      <router-link to="/user/1/usa">user1</router-link>
      <router-link to="/user/2/china">user2</router-link>
      <router-link to="/user/3/japon">user3</router-link>
       

      <br>
      <router-link to="/news">news</router-link>
      <router-link to="/about">about</router-link>
    <router-link to="/myapp">app</router-link>-->
    <!-- to 不加冒号(:to) 直接写路径-->

    <!--   <br />
    <br />
    <router-link to="/player/1">Curry1</router-link>
    <router-link to="/player/2">Hadden 1</router-link>
    <router-link to="/curry">Curry redirect</router-link>
    -->
    <!--
    <hr />
    <button class="btn btn-primary">ok</button>
    <button class="btn btn-success">success</button>
    <button class="btn btn-danger">note</button>
    <hr />
    <div class="myclass1">bonjour</div>

    <hr />
    <div class="routebc">
      router progamer
      <br />
      <button @click="btnClick(1)">Curry2</button>
      <button @click="btnClick(2)">Hadden2</button>
      <br />
      <router-link :to=" { name: `Player`, params:{ u:1 } }">Curry3</router-link>
    -->

    <!-- 加冒号 :to  写java脚本或js对象-->
    <!--    <router-link :to="{path: '/player/2/stats' }">Hadden3</router-link>
    </div>

    <hr />

    -->
  </div>
</template>




<script>
import "./assets/my.css";

let Parser = require("rss-parser");
let parser = new Parser();

export default {
  name: "App",

  data() {
    return {
      contents: [],
      obj: [],
      headerTag:
        "<h1>Vuejs News App</h1>  <div>Actualite de https://www.bfmtv.com/rss/info/flux-rss/flux-toutes-les-actualites/</div>",
       transitionName:'',
       routes:{ '/': 1 ,'/news':2,'/gdp':3,'/people':4,'/about':5,'/contact':6},  
    };
  },

  mounted() {
    this.setHeaderTag(this.$route);
   // this.getNews();

    this.getNews(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=9ba1b6b28a764b8c92958d2399239a40",
      2
    );
  },
  beforeRouteUpdate(to, from, next) {
    // 只在参数变化时触发,路由变化不触发 建议用 watch
  },
  watch: {
    $route(to, from) {
      this.setHeaderTag(to);

        
     const toDepth =  this.routes[ to.path]
     const fromDepth = this.routes[from.path ]
     this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'

     //this.transitionName += toDepth + ' '+  fromDepth   ;

    // console.log( to.path ,from.path , this.$route   ); 
     
    }
  },

  methods: {
     
      

     
    setHeaderTag(r) {
      if (r.name == "home")
        this.headerTag =
          "<h1>Vuejs News App</h1>  <div>Actualite de https://www.bfmtv.com/rss/info/flux-rss/flux-toutes-les-actualites/</div>";
      if (r.name == "News") this.headerTag = "<h1>Toutes les actualités</h1>";
      if (r.name == "About") this.headerTag = "<h1>About Me</h1>";
    },
    btnClick(uid) {
      //路由重定向
      //this.$router.push({ path: `/player/${uid}` }); // 注意这里是`` 而不是'' 或""

      //this.$router.push({path: `/player/${uid}/stats` });
      this.$router.push({ name: "Player", params: { uid: uid } });
      // this.$router.push({ name: `Player`, query: { uid: uid } }); // get 方法

      //this.$router.go(-1); // 返回
    },

    getNews(
      url_news =  "https://newsapi.org/v2/top-headlines?country=us&apiKey=9ba1b6b28a764b8c92958d2399239a40", 
      v = 1
    ) {
       //https://www.bfmtv.com/rss/info/flux-rss/flux-toutes-les-actualites/
      //this.$http.get(url_news,
      this.axios.get(url_news).then(
        response => {

          
          if (1 == v) {
            var promise = parser.parseString(response.data);

            promise.then(obj => {
              this.obj = obj;
              //this.contents.push( obj.items ) ;
              this.contents = this.contents.concat(obj.items);
            });
          }
          if (2 == v) {
            
            var articles = response.data.articles;

            response.data.articles.map(function(val, i) {
              articles[i].pubDate = val.publishedAt;

              articles[i].content =
                val.description + '<img src="' + val.urlToImage + '" >';

              articles[i].link = val.url;
              articles[i].isApi = 1;
              articles[i].enclosure = [];
              articles[i].enclosure.url = val.urlToImage;
            });

            this.contents = this.contents.concat(articles);
          }
        },
         
      ) .catch(err => {console.log(err)});
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 20px;*/
}
.router-link-exact-active {
  color: #000 !important;
}
.router-link-active {
}
.footer {
  background-color: #494163 !important;
  color: #fff;
}
.hy-layout a {
  color: rgba(49, 48, 48, 0.897);
}
.hy-layout img {
  border-radius: 0.1rem;
}

.hy-layout {
  padding: 10px;
}
.hy-layout .row {
}
.hy-layout .row > [class*="col-"] {
  padding: 10px;
}
.hy-layout .row > [class*="col-"] > div {
  border: 1px solid #ccc;
  border-radius: 0.3rem;
  padding: 10px;
}

 
 

.slide-left-enter-active , .slide-right-enter-active  {
  transition: all .3s ease;
}
.slide-left-leave-active  , .slide-right-leave-active{
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-left-enter ,  .slide-right-leave-to
 {
  transform: translateX(5000px);
  opacity: 0; 
}

.slide-left-leave-to ,  .slide-right-enter
 {
  transform: translateX(-5000px);
  opacity: 0; 
}
 


</style>
