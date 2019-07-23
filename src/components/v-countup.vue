<template>
  <div   > 

     
       {{ showsv }}
       
</div>
</template>

<script>
export default {
  name: "v-countup",

  data() {
    return {
      sv: this.startValue,
      ev: this.endValue,
      pinlv: 13,
      second: 2,
      showsv : 0 ,
    };
  },
  watch:{
      startValue()
      {
          this.sv = this.startValue ;
          this.ev = this.endValue ; 
          this.addGdponebyone(this.ev, this.sv);

           
      },
       
  },
  props: ["start-value", "end-value" , "country" , "run"], //for-child-msg 等价于forChildMsg

  methods: {
    addGG(d) {

     
      this.sv += d;
       
      //  var timerId;
      if (this.ev - this.sv > d) {
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
      
        if( this.country == '美国' && this.run )
         this.$store.commit('setStatus' );
          
      }

       this.showsv = accounting.formatNumber(this.sv) +" $   " ;
      //this.showsv +=  this.myformat(this.sv) + " 美元";

    },
    addGdponebyone(ev, sv) {
      var d;
      d = parseInt((ev - sv) / (this.pinlv * this.second));
      this.addGG(d);
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
