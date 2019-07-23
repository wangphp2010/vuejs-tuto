<template>
  <div   > 

     
       
       <table width='100%'  >
         <tr>
           
           <td  :style="stylediv" align='right'>&nbsp</td>
           <td   align='left'>&nbsp<img :src="img" style='border-radius:1px;' alt="">&nbsp {{ showsv }}</td>
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
      ev: this.endValue ,
      pinlv: 13,
      second: 2,
      showsv : 0 ,
      imgs:{
        "United States": {'img': require('../assets/flags-mini/us.png'), 'c': "#1a1aff"},
        "Japan": {'img': require('../assets/flags-mini/jp.png'), 'c': "#ff3333"},
        "China": {'img': require('../assets/flags-mini/cn.png'), 'c': "#e60000"},
        "Germany": {'img': require('../assets/flags-mini/de.png'), 'c': "#330d00"},
        "France": {'img': require('../assets/flags-mini/fr.png'), 'c': "#000099"},
        "United Kingdom": {'img': require('../assets/flags-mini/gb.png'), 'c': "#ff1a66"},
        "India": {'img': require('../assets/flags-mini/in.png'), 'c': "#004d00"},
        "Canada": {'img': require('../assets/flags-mini/ca.png'), 'c': "#cc3300"},
        "Italy": {'img': require('../assets/flags-mini/it.png'), 'c': "#009900"},
        "Brazil": {'img': require('../assets/flags-mini/br.png'), 'c': "#009933"},
         "Spain": {'img': require('../assets/flags-mini/es.png'), 'c': " #ff3300"},
         "Australia": {'img': require('../assets/flags-mini/au.png'), 'c': "#29a329"},
      "Netherlands": {'img': require('../assets/flags-mini/nl.png'), 'c': "#6666ff"},
      "Korea, Rep.": {'img': require('../assets/flags-mini/kr.png'), 'c': "#1a1aff"},
      "Russian Federation": {'img': require('../assets/flags-mini/ru.png'), 'c': "#008fb3"},
      "Mexico": {'img': require('../assets/flags-mini/mx.png'), 'c': "#008060"},
     
     "Sweden": {'img': require('../assets/flags-mini/se.png'), 'c': "#006699"},
            
       "Switzerland": {'img': require('../assets/flags-mini/ch.png'), 'c': "#ff4d4d"},
       "Belgium": {'img': require('../assets/flags-mini/be.png'), 'c': "#4d4dff"},
       "Austria": {'img': require('../assets/flags-mini/at.png'), 'c': "#ff6666"},
       "Denmark": {'img': require('../assets/flags-mini/dk.png'), 'c': "#ffb3b3"},
       "Turkey": {'img': require('../assets/flags-mini/tr.png'), 'c': "#ff6666"},
       "Indonesia": {'img': require('../assets/flags-mini/id.png'), 'c': "#cc99ff"},
        "South Africa": {'img': require('../assets/flags-mini/za.png'), 'c': "#000099"},
        "Saudi Arabia": {'img': require('../assets/flags-mini/sa.png'), 'c': "#66ffcc"},
        "Venezuela, RB": {'img': require('../assets/flags-mini/ve.png'), 'c': "#0086b3"},
        "Argentina": {'img': require('../assets/flags-mini/ar.png'), 'c': "#80ccff"},
        "Iraq": {'img': require('../assets/flags-mini/ir.png'), 'c': "#66ffbb"},
       /*  
       
       
       
      
       
       
        
         
          "": {'img': require('../assets/flags-mini/.png'), 'c': ""},
       */


      },
      img:"",
      c: "#00b3b3" ,
      
       
    };
  },
  computed:{
    stylediv()
    {
      var w ;
      var max = this.maxGdp ; 
      var d = 600 ;
       

      if(this.imgs[this.country])
      {
        this.c = this.imgs[this.country].c ;
        this.img = this.imgs[this.country].img ;
      }
      if( this.sv < max )
      {
        w = (this.sv / max)   * d ; 
      }else
      {
        w = d ;
      }
      if( parseInt(w)<=1)w=1;

      return "width:" + w  + "px;background-color:"+ this.c  +";min-width:2px;border-radius:2px; " 
    }
  },
  watch:{
      startValue()
      {
          this.sv = this.startValue ;
          this.ev = this.endValue ; 
          this.addGdponebyone(this.ev, this.sv);

           
      },
       
  },
  props: ["start-value", "end-value" , "country" , "run" ,"maxGdp"], //for-child-msg 等价于forChildMsg

  methods: {
    addGG(d) {

     if(this.sv< this.ev)
      this.sv += d;
      else 
      this.sv -= d;
       
      //  var timerId;
      if (   Math.abs(this.ev - this.sv) > d) {
        /*  timerId = setInterval( function(){
                    that.addGG(  d , i  , dd   )
                }  
                ,  1000/  that.pinlv  ); */

        setTimeout(() => {
          this.addGG(d);
        }, 1000 / this.pinlv);
      } else {
        /* clearInterval(timerId);
			    timerId = null; */
        this.sv = this.ev;
      
        if( this.country == 'United States' && this.run )
         this.$store.commit('setStatus' );
          
      }

       this.showsv = this.formatNumber(this.sv) +" $   " ;
      //this.showsv +=  this.myformat(this.sv) + " 美元";

    },
    addGdponebyone(ev, sv) {
      var d;
      var dif ;

      
      d = parseInt(  Math.abs(ev - sv )  / (this.pinlv * this.second));



      this.addGG(d);
    },

    formatNumber(v){

        v = v.toString() ;
        var str = '' ;
        var t = 1 ;
        
        for( var i = v.length -1 ; i>=0 ;i-- )
        {
          var n = '' ;
          if(t % 3 == 0 ) n = ','; 
          str  = n+v[i]+str;
          t++ 
          }
      

      return  str.replace( /^\,/ , '' ) ;
      },

    myformat(num)
    {
        num = num.toString(); 
        if(num.length > 8 )
        {
            num = num.replace(/(^\d+)(\d{4})(\d{4}$)/ ,"$1亿$2万$3" )
        }
        else{
            if(num.length > 4  )
                num = num.replace(/(^\d+)(\d{4}$)/ ,"$1万$2" )
        }
        return num ;

    }
  },
  mounted() {
    
       

    this.addGdponebyone(this.ev, this.sv);
  }
};
</script>
<style scoped>
    .dd{background-color: aqua }
</style>
