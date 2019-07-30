<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        Year
        <input type="number" v-model="year" @keyup="keyupYear" />
        <button @click="reset">Reset</button>
        <button @click="stop">Stop</button>
        <button @click="cc" :disabled="run">Continue</button>

        <transition-group name="list" tag="div">
          <div class="input-group mt-1" v-for=" data  in dataByYear " :key="data.country">
            <div class="input-group-prepend">
              <span class="input-group-text" style="width:200px;">
                <b>{{ data.id }}</b>
                &nbsp {{data.country}}
              </span>
            </div>
            <!--     <v-countup :start-value="data.gdp2" :end-value="data.gdp"></v-countup> 
            -->
             <Vcountup
              class="form-control"
              :start-value="data.gdp2"
              :end-value="data.gdp"
              :country="data.country"
              :run="run"
              :maxGdp="maxGdp"
              :iidd="data.id"
              :year="year"
              :lastc="lastc"
            ></Vcountup>

            <!--     <div class="input-group-append" >
              <span class="input-group-text">x</span>
            </div>
            -->
          </div>
        </transition-group>
        <div class>
          Source:
          <a
            href="https://data.worldbank.org/indicator/ny.gdp.mktp.cd"
          >https://data.worldbank.org/indicator/ny.gdp.mktp.cd</a>
        </div>
        <iframe
          width="500"
          height="200"
          :src="youtube"
          component
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</template>
 
<script>
// 通过setDataByYear 让v-countup.vue 数字增加,当增加完毕让全局属性this.$store.state.status+1 再通过监听 newStatus{this.$store.state.status} 是否有改变 来执行this.cc();
import Vcountup from "@/components/v-countup.vue"; //引入组件

export default {
  name: "Gdp",
  components: {
    Vcountup
    //注册组件
  },
  data() {
    return {
      datas: [],

      dataByYear: [],
      year: 1960,
      pinlv: 23,
      num: 20,
      second: 2,
      run: true,
      maxGdp: 0,
      youtube: "https://www.youtube.com/embed/K3DG_80swBk?start=12&autoplay=1",
      lastc: ""
    };
  },
  watch: {
    newStatus() {
      this.cc();
    }
  },
  computed: {
    newStatus() {
      return this.$store.state.status;
    }
  },
  methods: {
    yearAC() {
      if (this.year.toString().length == 4) {
        if (parseInt(this.year) < 1960) this.year = 1960;
        if (parseInt(this.year) > 2018) this.year = 2018;

        this.setDataByYear(this.year);
      }
    },
    keyupYear() {
      this.yearAC();
      this.run = false;
    },
    getDataTxt() {
      var that = this;
      /*  $.get("static/data.txt", function(data) {
        that.datas = JSON.parse(data);

        that.setDataByYear(that.year);
      }); */

      // vanilla js 
      var r = new XMLHttpRequest();
      r.open("GET", "static/data.txt", true);
      r.onreadystatechange = function() {
        if (r.readyState != 4 || r.status != 200) return;

        that.datas = JSON.parse(r.responseText);

        that.setDataByYear(that.year);
      };
      r.send("banana=yellow");
    },
    sort(data) {
      return _.orderBy(data, ["gdp"], ["desc"]);
    },
    cc() {
      this.run = true;

      if (this.year < 2018) {
        this.year = parseInt(this.year) + 1;
        this.yearAC();
      } else {
        this.run = false;
      }
    },
    reset() {
      this.year = 1960;
      this.setDataByYear(this.year);
      this.youtube =
        "https://www.youtube.com/embed/K3DG_80swBk?start=12&autoplay=1&v=" +
        new Date();
      this.run = true;
    },
    stop() {
      this.run = false;
    },

    setDataByYear(yy) {
      var year = parseInt(yy);

      var dataByYear = [];
      var dataByYear2 = [];
      var num = this.num;

      this.datas.map(function(val, i) {
        var sv = 0;
        if (val.data[year]) {
          if (parseInt(val.data[year - 1])) sv = parseInt(val.data[year - 1]);

          dataByYear.push({
            country: val.country,
            gdp: parseInt(val.data[year]),
            gdp2: sv
          });
        }
      });

      dataByYear = this.sort(dataByYear);
      this.maxGdp = dataByYear[0].gdp;
      this.lastc = dataByYear[num-1].country ; 

      dataByYear.map(function(val, i) {
        if (i < num) {
          dataByYear2.push({
            id: i + 1,
            country: val.country,
            gdp: parseInt(val.gdp),
            gdp2: parseInt(val.gdp2)
          });
        }
      });

      this.dataByYear = dataByYear2;
    }
  },

  mounted() {
    this.getDataTxt();
    document.title = "   world gdp ranking  page     Design by PHP STUDIO  ";
  }
};
</script>

<style scoped >
.list-move {
  transition: all 2s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(20px) !important;
}
.list-leave-active {
  position: absolute;
}
</style>
