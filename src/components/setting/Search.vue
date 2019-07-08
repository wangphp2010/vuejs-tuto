<template>
  <div>
    <div class="d-flex justify-content-center">
      <div class="searchbar">
        <input class="search_input" type="text" name placeholder="Search..." v-model="motcle" />
        <a href="#" class="search_icon">
          <fa :icon="faSearch" />
        </a>
      </div>
    </div>
     
  </div>
</template>
<script>
import Fa from "vue-fa";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
export default {
  components: {
    Fa
  },
   
  data() {
    return {
      faSearch,
      motcle:'',
    };
  },
  watch:{
      motcle()
      {
          this.bus.$emit( 'getMotcle' , this.motcle ) ;
          this.$store.commit( 'setKw' , this.motcle  );
      }
  },
  methods:{

  },
  mounted(){
    this.motcle = this.$store.state.kw ; 
  }

};
</script>

<style scoped>
.searchbar {
  margin-bottom: auto;
  margin-top: auto;
  height: 60px;
  background-color: #353b48;
  border-radius: 30px;
  padding: 10px;
}

.search_input {
  color: white;
  border: 0;
  outline: 0;
  background: none;
  width: 0;
  caret-color: transparent;
  line-height: 40px;
  transition: width 0.4s linear;
}

/* .searchbar:hover > .search_input {
  padding: 0 10px;
  width: 450px;
  caret-color: red;
  transition: width 0.4s linear;
}

.searchbar:hover > .search_icon {
  background: white;
  color: #e74c3c;
} */
.searchbar  .search_input {
  padding: 0 10px;
  width: 600px;
  caret-color: red;
  transition: width 0.4s linear;
}

.searchbar  .search_icon {
  background: white;
  color: #e74c3c;
} 

.search_icon {
  height: 40px;
  width: 40px;
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: white;
}
</style>
