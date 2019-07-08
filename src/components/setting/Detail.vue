<template>
  <div>
    <h1>A LA UNE  </h1>
     <p>Toutes les actualités - BFMTV.COM</p>
     <section class="hy-layout">
      
        <transition-group name="list" tag="div" class="row"  >
          <div
          class="col-md-3"  
          v-for="(content, i )  in owncontents  "
          :key="content.title"
          v-if="i <= owncontents.length && i >= owncontents.length - 24  "
        >
          <router-link v-bind:to=" '/news/' + i " class="nav-link">
            <ul class="list-unstyled">
              <li>
                <img
                  v-bind:src="  content.content | getUrlImg  "
                  v-bind:alt="  content.title "
                  style="  height:100px; max-width:100%"
                />
              </li>
              <li>{{ content.title.substring(0,60) }}</li>
            </ul>
          </router-link>
        </div>
        </transition-group>

       
    </section>
  </div>
</template>

<script>
export default {
  name: "detail",
  data() {
    return {
      motcle: "",
       owncontents :  this.contents ,
  
     };
  },
  props: ["contents"], //声明一个自定义的属性
  
  watch: {
      
    contents(){

        this.owncontents = this.contents ;
        
         
    },
    motcle() {
      var motcle = this.motcle.toLowerCase()
      var list = []
      
       this.contents.map(function(val, key) {
        if( val.title.toLowerCase().indexOf( motcle ) != -1 || val.content.toLowerCase().indexOf( motcle ) != -1 )   list.push(val);
        
       });
       this.owncontents = list  
 
    }
  },
  
  
  mounted() {
       
      

      
    this.bus.$on("getMotcle", params => {
      this.motcle = params;
    });
    document.title = " Design by PHP STUDIO - Home page ";

    // 所有加载完后会调用这个
    /*
    var url_news;
    url_news =  "https://www.bfmtv.com/rss/info/flux-rss/flux-toutes-les-actualites/";*/
    //   url_news = "http://api.komavideo.com/news/list";
    /*
    this.axios.post(url_news).then(body => {
      this.content = body.data;
    });

    */
    /*语法        
 this.$http.get( url , data ).then( succes, error );
 this.$http.post( url , data ).then( succes, error );
*/
    /*
    this.$http.get(url_news).then(
      response => {
        var promise = parser.parseString(response.data)  ;
        promise.then( obj => {
           this.contents = obj .items 
         }
         
         );
  


        
        
       
      },
      error => {
        console.log(error.statusText);
      }
    );

    */
  }
};
</script>
<style scoped>
pre {
  white-space: pre-wrap;
  max-width: 500px;
}

.list-move {
	transition: all 1s;
}


.list-enter,
.list-leave-to {
opacity: 0 !important;
 }
.list-leave-active {
  position: absolute;
   
}



</style>
