<template>
  <div data-app>
    <!-- <tree :tree-data="tree"></tree> -->
    <v-app-bar tile color="transparent" height="40">
      <v-row align="stretch" justify="start">
        <tree :tree-data="tree"></tree>
      </v-row>
    </v-app-bar>
  </div>
</template>

<script>
import Tree from "./components/Tree";

export default {
  data: () => ({
    tree: {
      label: "Group",
      children: [
        {
          label: "Sub Group 1",
          children: [
            { label: "Sub Group 1 Menu 1" },
            { label: "Sub Group 1 Menu 2", children:[{label: "XXXXX"}]}
          ]
        },
        { label: "Sub Group 2",
          children:[{label: "Sub Group 2 Menu 1"}]
        }
      ]
    }
  }),
  components: {
    Tree
  }
};
</script>