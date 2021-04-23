<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link to="/" class="navbar-brand">VuejsApp</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/news" class="nav-link">News</router-link>
            </li>
          

            <li class="nav-item">
              <router-link to="/gdp" class="nav-link">World GDP</router-link>
            </li>
          
            <li class="nav-item">
              <router-link to="/people" class="nav-link">People</router-link>
            </li>

            

              <li class="nav-item">
              <router-link to="/about" class="nav-link">About</router-link>
            </li>
             <li class="nav-item">
              <router-link to="/contact" class="nav-link">Contact</router-link>
            </li>
          </ul>
        </div>
      </nav>
</template>
 
<script>
export default {
  props: ['headerTag'] ,  

}
</script>


<style scoped>
.container-fluid
{
    background-color:#6B5B95 !important;
    color:#fff;
}
</style>
