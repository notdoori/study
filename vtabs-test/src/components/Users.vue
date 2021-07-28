<template>
  <div>
    <v-tabs centered grow height="60px" v-model="activeTab">
      <v-tab v-for="tab in tabs" :key="tab.id" :to="tab.route" exact>{{ tab.name }}</v-tab>
    </v-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: `this.tabs.findIndex(t => t.id === 1)`,
      tabs: [
        { id: 1, name: "Task", route: '/user/sub1' },
        { id: 2, name: "Project", route: '/user/sub2' }
      ]
    };
  }
};
</script>