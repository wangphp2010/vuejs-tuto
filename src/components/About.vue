<template>
  <div class="container jumbotron">
    <h2>
      Design by PHP STUDIO
      <br />
      <a class="badge badge-secondary" href="http://php2010.free.fr">http://php2010.free.fr</a>
      <br>
      {{ message }}
      
    </h2>
  </div>
</template>

 <script>
document.title = "Design by PHP STUDIO - about page  ";
export default {
  data(){
    return{
       
    }
  },
  mounted() {
    console.log(this.$store.state.allProducts );
      document.title =  "  About page     Design by PHP STUDIO  ";

       
      console.log(this.data);
  },
  computed:
  {
     
     //响应式监听里面所有的变量 一定要设置返回值 , 返回值变量名 = 函数名 
      message () {
      return this.$store.state.allProducts 
    }
   
  },
  methods:{
    
  }
};
</script>
