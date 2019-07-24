<template>
  <div>
    <table width="100%">
      <tr>
         <td :style="stylediv" align="right">&nbsp </td>
        <td align="left">
          &nbsp
          <img :src="img" style="border-radius:1px;" alt />
          &nbsp {{ showsv }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "v-countup",

  data() {
    return {
      sv: this.startValue,
      ev: this.endValue,
      pinlv: 30,
      second: 2,
      showsv: 0,
      imgs: {
        "United States": { img: "static/flags-mini/us.png", c: "#1a1aff" },
        Japan: { img: "static/flags-mini/jp.png", c: "#b30086" },
        China: { img: "static/flags-mini/cn.png", c: "#e60000" },
        Germany: { img: "static/flags-mini/de.png", c: "#330d00" },
        France: { img: "static/flags-mini/fr.png", c: "#000099" },
        "United Kingdom": { img: "static/flags-mini/gb.png", c: "#b3b3e6" },
        India: { img: "static/flags-mini/in.png", c: "#004d00" },
        Canada: { img: "static/flags-mini/ca.png", c: "#6600cc" },
        Italy: { img: "static/flags-mini/it.png", c: "#009900" },
        Brazil: { img: "static/flags-mini/br.png", c: "#009933" },
        Spain: { img: "static/flags-mini/es.png", c: " #bbff99" },
        Australia: { img: "static/flags-mini/au.png", c: "#29a329" },
        Netherlands: { img: "static/flags-mini/nl.png", c: "#6666ff" },
        "Korea, Rep.": { img: "static/flags-mini/kr.png", c: "#1a1aff" },
        "Russian Federation": { img: "static/flags-mini/ru.png", c: "#008fb3" },
        Mexico: { img: "static/flags-mini/mx.png", c: "#008060" },

        Sweden: { img: "static/flags-mini/se.png", c: "#006699" },

        Switzerland: { img: "static/flags-mini/ch.png", c: "#ff4d4d" },
        Belgium: { img: "static/flags-mini/be.png", c: "#4d4dff" },
        Austria: { img: "static/flags-mini/at.png", c: "#ff6666" },
        Denmark: { img: "static/flags-mini/dk.png", c: "#ffb3b3" },
        Turkey: { img: "static/flags-mini/tr.png", c: "#ff6666" },
        Indonesia: { img: "static/flags-mini/id.png", c: "#cc99ff" },
        "South Africa": { img: "static/flags-mini/za.png", c: "#000099" },
        "Saudi Arabia": { img: "static/flags-mini/sa.png", c: "#66ffcc" },
        "Venezuela, RB": { img: "static/flags-mini/ve.png", c: "#0086b3" },
        Argentina: { img: "static/flags-mini/ar.png", c: "#80ccff" },
        Iraq: { img: "static/flags-mini/ir.png", c: "#66ffbb" },
        "Iran, Islamic Rep.": { img: "static/flags-mini/ir.png", c: "#66ffbb" },

        Philippines: { img: "static/flags-mini/ph.png", c: "#fc6666" },
        Iran: { img: "static/flags-mini/ir.png", c: "#118060" },
        Nigeria: { img: "static/flags-mini/ng.png", c: "#1a1acc" }

        /*  
   另一种方法
   require('../assets/flags-mini/us.png') 对应src/assets/flags-mini/us.png
   
   "United States": {'img': require('../assets/flags-mini/us.png'), 'c': "#1a1aff"},
        "Japan": {'img': require('../assets/flags-mini/jp.png'), 'c': "#ff3333"},
        */
      },
      img: "",
      c: "#00b3b3",
       
    };
  },
  computed: {
    stylediv() {
      var w;
      var max = this.maxGdp;
      var d = 660;

      if (this.imgs[this.country]) {
        this.c = this.imgs[this.country].c;
        this.img = this.imgs[this.country].img;
      }
      if (this.sv < max) {
        w = (this.sv / max) * d;
      } else {
        w = d;
      }
      if (parseInt(w) <= 1) w = 1;

      if (1 == this.iidd && parseInt(this.year) > 1960) w = d;

      return (
        "width:" +
        w +
        "px;background-color:" +
        this.c +
        ";min-width:2px;border-radius:2px; "
      );
    }
  },
  watch: {
    startValue() {
      this.sv = this.startValue;
      this.ev = this.endValue;
      this.addGdponebyone(this.ev, this.sv);
    }
  },
  props: [
    "start-value",
    "end-value",
    "country",
    "run",
    "maxGdp",
    "iidd",
    "year"
  ], //for-child-msg 等价于forChildMsg

  methods: {
    addGG(d) {
      if (this.sv < this.ev) this.sv += d;
      else this.sv -= d;

      if (Math.abs(this.ev - this.sv) > d) {
        setTimeout(() => {
          this.addGG(d);
        }, parseInt(1000 / this.pinlv)   )
      } else {
        this.sv = this.ev;

        if (this.country == "United States" && this.run)
          this.$store.commit("setStatus"); // setStatus+1触发下年gdp
      }

      this.showsv = this.formatNumber(  parseInt(this.sv)) + " $   ";
     
    },
    addGdponebyone(ev, sv) {
      var d;
      var dif;

      d = parseInt(   Math.abs(ev - sv) / (this.pinlv * this.second)  ) ;
      

      this.addGG(d);
      
    },

    formatNumber(v) {
      v = v.toString();
      var str = "";
      var t = 1;

      for (var i = v.length - 1; i >= 0; i--) {
        var n = "";
        if (t % 3 == 0) n = ",";
        str = n + v[i] + str;
        t++;
      }

      return str.replace(/^\,/, "");
    },

    myformat(num) {
      num = num.toString();
      if (num.length > 8) {
        num = num.replace(/(^\d+)(\d{4})(\d{4}$)/, "$1亿$2万$3");
      } else {
        if (num.length > 4) num = num.replace(/(^\d+)(\d{4}$)/, "$1万$2");
      }
      return num;
    }
  },
  mounted() {
    this.addGdponebyone(this.ev, this.sv);
  }
};
</script>
<style scoped>
.dd {
  background-color: aqua;
}
</style>
