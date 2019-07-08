<template>
  <div class="container">
    <h1>People page</h1>

    <div class="row">
      <div class="col-md-3">
        <transition-group name="list" tag="div">
          <div
            class="input-group mb-1 list-item"
            v-for=" hero  in heros "
            :key="hero.id"
            @click="getHero(hero)"
            :class="{'selected': (hero === newHero )}"
          >
            <div class="input-group-prepend">
              <span class="input-group-text">{{hero.id}}</span>
            </div>
            <span class="form-control">{{hero.name}}</span>


   
            <div class="input-group-append" @click="delHero(hero)">
              <span class="input-group-text">x</span>
            </div>

 
            
          </div>
        </transition-group>

        <div class="input-group mb-1 alert alert-primary">   
          <div class="input-group-prepend">
            <span class="input-group-text">{{newHero.id}}</span>
          </div>

          <input type="text" class="form-control" v-model="newHero.name" />
        </div>
        <button v-on:click="shuffle" class="btn btn-secondary btn-sm">Shuffle</button>

        <button v-on:click="addHero" type="button" class="btn btn-secondary btn-sm">{{btnTxt}}</button>
        <button v-on:click="clear" type="button" class="btn btn-secondary btn-sm">clear</button>
      </div>
    </div>

   
  </div>
</template>

<script>
import oSelect from "@/components/Select.vue"; //引入组件

export default {
  name: "People",
  data() {
    return {
      heros: [
        { id: 11, name: "Dr Nice" },
        { id: 12, name: "Narco" },
        { id: 13, name: "Bombasto" },
        { id: 14, name: "Celeritas" },
        { id: 15, name: "Magneta" },
        { id: 16, name: "RubberMan" },
        { id: 17, name: "Dynama" },
        { id: 18, name: "Dr IQ" },
        { id: 19, name: "Magma" },
        { id: 20, name: "Tornado" }
      ],
      newHero: {},
      btnTxt: "Add",
      
    };
  },
  components: {
    oSelect
    //注册组件
  },
  mounted() { document.title =  "  People page     Design by PHP STUDIO  ";},

  beforeRouteUpdate(to, from, next) {},
  methods: {
    delHero(hero) {
      event.stopPropagation();

      this.heros.map(function(herof, i, heros) {
        if (herof.id == hero.id) {
          heros.splice(i, 1);
        }
      });

      this.clear();
    },
    onChangeOption(index) {
      //子组件通过一个事件来触发onChangeOption方法，从而传递一系列参数，这里的index就是传过来的
      this.selectData.defaultIndex = index;
      //触发过后，动态改变了需要值
    },

    changeBtnTxt() {
      if (this.btnTxt == "Add") {
        this.btnTxt = "Edit";
      } else {
        this.btnTxt = "Add";
      }
    },
    addHero() {
      if (this.btnTxt == "Add") {
        if (this.newHero.name) {
          if (this.newHero.name.replace(/\s*/, "")) {
            let iidd =
              this.heros.length > 0
                ? this.heros[this.heros.length - 1].id + 1
                : 1;
            let newHero = {
              id: iidd,
              name: this.newHero.name
            };

            this.heros.push(newHero);
            this.newHero = {};
          }
        }
      }
    },
    getHero(hero) {
      this.btnTxt = "Edit";
      this.newHero = hero;
    },
    clear() {
      this.btnTxt = "Add";

      this.newHero = [];
    },
    shuffle: function() {
      this.heros = _.shuffle(this.heros);
    }
  }
};
</script>

<style scoped >
.input-group {
  cursor: pointer;
  transition: all 0.3s;
 /*  position: static ;  */
}

.input-group:hover {
  filter: brightness(90%);
  transform: translateX(5px); 
}
.selected {
  filter: brightness(80%) !important;
  transform: translateX(-5px) !important;  
}
.selected .form-control {
  color: #000 !important;
  font-weight: bold;
}

.list-move {
	transition: all 1s;
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
