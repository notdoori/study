<template>
  <!-- <div class="tree"> -->
    <!-- <ul class="tree-list">
        <node-tree :node="treeData"></node-tree>
    </ul>   -->
    <!-- <v-row align="stretch" justify="start"> -->
       <!-- <v-menu bottom offset-y> -->
            <!-- <node-tree :node="treeData"></node-tree> -->
       <!-- </v-menu> -->
    <!-- </v-row> -->
  <!-- </div> -->
  <v-menu :close-on-content-click="false" bottom offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            tile
            depressed
            v-bind="attrs"
            v-on="on"
            @click="toggle"
        >
            {{treeData.label}}
        </v-btn>
      </template>
    <!-- <v-list> -->
        <div v-for="(child, index) in treeData.children" :key="index">
            <node-tree v-if="isFolder" :node="child" ></node-tree> 
        </div>
    <!-- </v-list> -->    
  </v-menu>
</template>

<script>
import NodeTree from "./NodeTree";

export default {
  data: function() {
    return {
        open: false
    };
  },
  props: {
    treeData: Object
  },
  components: {
    NodeTree
  },
  computed: {
    isFolder: function() {
      return this.treeData.children && this.treeData.children.length;
    }
  },
  methods: {
      toggle() {
          if (this.isFolder) {
            this.open = !this.open;
          }

          console.log('isFolder: ', this.isFolder, 'open: ', this.open);
      }
  }
  
};
</script>

<style scoped>
div {
    margin: 0;
}
</style>