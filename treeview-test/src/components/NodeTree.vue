<template>  
<div class="nt1">

    <!-- <div> -->
    <v-btn
        tile
        depressed
        @click="toggle"
    >
        {{node.label}}
    </v-btn>
    
    <!-- </div> -->
    <v-list v-show="open" v-if="isFolder">
        <node
            v-for="(child, index) in node.children"
            :key="index"
            :node="child">
        </node>
    </v-list>

</div>
<!-- <li :class="[isFolder ? 'folder' : 'file']">
    <label
      :class="{'open': open}"
      @click="toggle"
      @dblclick="changeType">
      {{ node.label }}
      <span v-if="isFolder">{{ isFolder ? node.children.length : '' }}</span>
    </label>
    <ul v-show="open" v-if="isFolder" :class="{'open': open}">
      <node
        v-for="(child, index) in node.children"
        :key="index"
        :node="child">
      </node>
      <li class="add" @click="addChild"><label>Add New Item</label></li>
    </ul>
</li> -->

</template>

<script>
export default {
  name: "node",
  data: function() {
    return {
       open: false
    };
  },
  props: {
    node: Object
  },
  computed: {
    isFolder: function() {
      return this.node.children && this.node.children.length;
    }
  },
  methods: {
    toggle: function() {
      if (this.isFolder) {
        this.open = !this.open;
      }

      console.log('isFolder: ', this.isFolder, 'open: ', this.open);
    },
    changeType: function() {
      if (!this.isFolder) {
        Vue.set(this.node, "children", []);
        this.addChild();
        this.open = true;
      }
    },
    addChild: function() {
      this.node.push({
        name: "New Item"
      });
    }
  }
};
</script>

<style scoped>
div {
    margin: 0;
}

.v-btn {
    margin: 0;
}
</style>