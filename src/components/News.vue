<template>
  <div>
    <div class="container">
      <div id="showDetail" v-html="html"></div>

      <div class="container text-left regContentHtml">
        <p v-html="regContentHtml"></p>
      </div>
    </div>
    <SettingSearch v-bind:contents="contents" name="SettingSearch"></SettingSearch>
     <hr />
    <!-------------------------------------------------------------->
    <div v-show="showNews" id="showNews">
      <div class="container">
        <h1>Toutes les actualités-</h1>
      </div>

      <section class="hy-layout">
        <transition-group name="list" tag="div" class="row">
          <div
            class="col-md-2"
            v-for="(content, i )  in owncontents  "
            :key="content.title"
            v-if="i <= max && i >= min  "
          >
            <router-link v-bind:to=" '/news/' + i " class="nav-link">
              <ul class="list-unstyled">
                <li>
                  <img
                    v-bind:src="  content.content | getUrlImg    "
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

      <div class="container">
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <v-pagination
              v-model="currentpage"
              :page-count="pagenum"
              :classes="bootstrapPaginationClasses"
              :labels="paginationAnchorTexts"
            ></v-pagination>
          </ul>
        </nav>
      </div>
    </div>

    <!--  <div class="child">
            <div>
              <span>子组件数据</span>
              <input v-model="forChildMsg"/>
            </div>
            <p>{{forChildMsg}}</p>
            <p>ownChildMsg : {{ownChildMsg}}</p>
    </div>-->
  </div>
</template>

<script>
import vPagination from "vue-plain-pagination";
import SettingSearch from "@/components/setting/Search";

var VueScrollTo = require("vue-scrollto");

var options = {
  container: "body",
  easing: "ease-in",
  offset: 0,
  force: true,
  cancelable: true,
  onStart: function(element) {
    // scrolling started
  },
  onDone: function(element) {
    // scrolling is done
  },
  onCancel: function() {
    // scrolling has been interrupted
  },
  x: false,
  y: true
};
//import...
export default {
  name: "myapp",
  components: { vPagination, SettingSearch: SettingSearch },

  data() {
    return {
      kw: "",
      max: 23,
      min: 0,

      pagesize: 24,
      pagenum: 3,

      currentpage: 1,
      ownnid: 0,
      showNews: true,
      showDetail: false,
      ownChildMsg: this.forChildMsg,
      owncontents: this.contents,
      nid: this.$route.params.nid,
      html: "",
      regContentHtml: "",

      bootstrapPaginationClasses: {
        ul: "pagination",
        li: "page-item",
        liActive: "active",
        liDisable: "disabled",
        button: "page-link"
      },
      paginationAnchorTexts: {
        first: "«",
        prev: "‹",
        next: "›",
        last: "»"
      }
    };
  },
  props: ["contents", "for-child-msg"], //for-child-msg 等价于forChildMsg

  watch: {
    $route(to, from) {
      this.showNewsDetail();
    },
    forChildMsg() {
      this.ownChildMsg = this.forChildMsg;
    },

    currentpage() {
      this.setminmax(this.currentpage);
    },

    contents() {
      this.owncontents = this.contents;
      this.init();
    },
    kw() {

      let motcle = this.kw;

      let list = [];

      this.contents.map(function(val, key) {
        if (
          val.title.toLowerCase().indexOf(motcle) != -1 ||
          val.content.toLowerCase().indexOf(motcle) != -1
        )
          list.push(val);
      });
      this.owncontents = list;
      this.setPagenum();
    },
    lisStoreKw(kw) {
      this.kw = kw;
    }
    /* showNews(val, oldVal) {
      if (val) this.showDetail = false;
      else this.showDetail = true;

      console.log(val)
    } */
  },
  methods: {
    regContent(str) {
      str = str.replace(/^[\d\D]+\<\!\-\- contenu article \-\-\>/, "");
      str = str.replace(/\<\!\-\- \/contenu article \-\-\>[\d\D]+$/, "");
      str = str.replace(/\<script\>[\d\D]+?\<\/script\>/, "");
      this.regContentHtml = str;
    },
    getNewsContent(url_news) {
      this.$http
        .get(url_news)
        .then(response => {
          this.regContent(response.data);
        })
        .catch(err => {
          console.log(err);
        });

      VueScrollTo.scrollTo("#showDetail", 300, options);
      /*  this.axios.post(url_news ).then(response => {
         this.regContent(response.data)
      });
 */
    },
    setHtml(r) {
      if (this.contents.length) {
        var neirong = this.contents[r.params.nid];
        this.html =
          "<h1>" +
          neirong.title +
          "</h1> " +
          '<img  src="' +
          neirong.enclosure.url +
          '"  alt="' +
          neirong.title +
          '" style="width:100%" />' +
          "<hr />" +
          '  <div class="container text-left">' +
          ' <div class="bd-example tooltip-demo">' +
          " <h2>" +
          neirong.content.toString().replace(/<[\d\D]+?>/g, "") +
          " </h2><hr />" +
          " </div>" +
          "<p>" +
          neirong.pubDate +
          "</p>" +
          "<p>" +
          neirong.link +
          "</p>" +
          "</div>";

        // VueScrollTo.scrollTo("#showNews", 300, options);
      } else console.log(" no this.contents ");
    },
    setShow(nid) {
      if (nid) this.showDetail = true;
      else this.showDetail = false;
    },
    getNid(r) {
      var nid;
      if (r.params.nid || r.params.nid == 0) {
        nid = r.params.nid;
        nid = nid.replace(/\D/, "");
        if (nid != "") this.nid = nid;
      }

      this.setShow(nid);

      if (nid != "") {
        this.nid = nid;
      } else this.nid = 0;
    },
    setminmax(currentpage) {
      this.currentpage = currentpage;
      this.$router.push({ path: `/news/page/${this.currentpage}` });
      this.min = (this.currentpage - 1) * this.pagesize;
      this.max = this.currentpage * this.pagesize - 1;

      document.title =
        "  News page     Design by PHP STUDIO  page: " + this.currentpage;
    },
    showNewsDetail() {
      if (this.$route.params.nid || 0 == this.$route.params.nid) {
        if (this.contents.length) {
          this.getNewsContent(this.contents[this.$route.params.nid].link);

          document.title =
            this.contents[this.$route.params.nid].title +
            "  News page     Design by PHP STUDIO  ";
        }

        this.setHtml(this.$route);
      }
    },
    setPagenum() {
      this.pagenum = Math.ceil(this.owncontents.length / this.pagesize);
     },
    init() {
      this.owncontents = this.contents;

       this.setPagenum();

      this.showNewsDetail();

      this.currentpage = this.$route.params.page
        ? parseInt(this.$route.params.page)
        : 1;

      if (this.$route.params.nid) this.showNewsDetail();
      if (this.$route.params.page) {
        this.setminmax(this.currentpage);
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.getNid(to);

    if (to.params.nid) {
      this.setHtml(to);
      this.getNewsContent(this.contents[to.params.nid].link);
      document.title =
        this.contents[to.params.nid].title +
        "  News page     Design by PHP STUDIO  ";
    }

    next();
  },

  computed: {
    lisStoreKw() {
      return this.$store.state.kw;
    }
  },

  mounted() {
    this.kw = this.$store.state.kw;

    this.getNid(this.$route);
    this.init();
    document.title = "  News page     Design by PHP STUDIO  ";
  }
};
</script>

 

<style scoped >
.bluebg {
  background-color: #6b5b95 !important;
  color: #fff;
}

#showDetail >>> img {
  max-width: 100% !important;
}
.regContentHtml >>> img {
  max-width: 80% !important;
}

.regContentHtml >>> .twitter-tweet {
  overflow: hidden;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #e1e8ed;
  border-radius: 5px;
  max-width: 520px;
}
.mypagination >>> .page-item a {
  display: block;
  padding: 0.5rem 1rem;
}
.router-link-exact-active {
  /* Make the disabled links grayish*/
  color: gray;
  /* And disable the pointer events */
  pointer-events: none;
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
