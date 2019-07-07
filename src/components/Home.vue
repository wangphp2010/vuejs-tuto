<template>
  <div>
    <h1>home page</h1>
    <div class="col-md-6 offset-3">
      <SettingSearch v-bind:contents="contents" name="SettingSearch"></SettingSearch>
    </div>
    <section class="hy-layout">
      <div class="row">
        <div class="col-md-4">
          <SettingSidebar v-bind:contents="contents" name="SettingSidebar"></SettingSidebar>
        </div>
        <div class="col-md-8">
          <myDetail name="myDetail" v-bind:contents="contents"></myDetail>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import SettingDetail from "@/components/setting/Detail";
import SettingSidebar from "@/components/setting/Sidebar";
import SettingSearch from "@/components/setting/Search";

export default {
  name: "Index",
  data() {
    return {
      headerTag:
        "<h1>Vuejs News App</h1>  <div>Actualite de https://www.bfmtv.com/rss/info/flux-rss/flux-toutes-les-actualites/</div>"
    };
  },
  components: {
    myDetail: SettingDetail,
    SettingSidebar: SettingSidebar,
    SettingSearch: SettingSearch
  },
  props: ["contents"]
};
</script>