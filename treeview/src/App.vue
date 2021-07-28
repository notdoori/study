<template>
<div>
  <v-app>
    <div class="layout1">
      <v-layout  align-baseline>
        <span class="span1">
          <v-card tile flat width="140px">   
            <v-combobox
              v-model="selectGroup"
              :items="groupItems"
              label="Group"
              outlined
              dense
            ></v-combobox>
          </v-card>
        </span>
        <span class="span1">
          <v-card tile flat width="140px">   
            <v-combobox
                v-model="selectSys"
                :items="sysItems"
                label="System"
                outlined
                dense
              >
            </v-combobox>
          </v-card>
        </span>
        <span class="span1">
          <v-card tile flat width="90px">   
            <v-btn tile @click="onSearchMenu">
                <!-- SEARCH -->
                {{ btnSearchText }}
            </v-btn>
          </v-card>
        </span>  
      </v-layout>
    </div>

    <div>
      <v-row>
        <v-col cols="auto">
          <v-card tile flat outlined width="426px">
            <v-btn width="70" tile @click="dialog = true">
              <!-- ADD -->
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-dialog v-model="dialog" max-width="290">
              <v-card>
                <v-card-title class="headline">
                  ADD MENU
                </v-card-title>

                <v-card-text>
                  <v-form>
                    <v-text-field
                      label="NAME"
                      name="menuName"
                      type="text"
                      v-model="menuName"
                    ></v-text-field>
                  </v-form>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    color="green darken-1"
                    text
                    @click="onDialogCancel"
                  >
                    Cancel
                  </v-btn>

                  <v-btn
                    color="green darken-1"
                    text
                    @click="onDialogAdd"
                  >
                    Add
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-btn width="70" tile @click="deleteItem">
              <!-- DELETE -->
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <v-btn width="70" tile @click="moveUp">
              <!-- UP  -->
              <v-icon>mdi-arrow-up</v-icon>
            </v-btn>
            <v-btn width="70" tile @click="moveDown">
              <!-- DOWN -->
              <v-icon>mdi-arrow-down</v-icon>
            </v-btn>
            <v-btn width="70" tile @click="moveRight">
              <!-- RIGHT -->
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
            <v-btn width="70" tile @click="moveLeft">
              <!-- LEFT  -->
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>

            <v-card-text>
              <v-treeview open-all :key="renderKey"
                        :items="items" item-key="id" 
                        return-object
                        activatable
                        @update:active="onUpdateActive"
              >
              </v-treeview>
            </v-card-text>

          </v-card>
        </v-col>

        <v-col cols="auto" sm="3">
          <v-card outlined>
            <v-card-title>
              Menu
            </v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field
                  :label="menuNameText"
                  name="fMenuName"
                  type="text"
                  v-model="fMenuName"
                  readonly
                ></v-text-field>

                <v-text-field
                  label="Menu ID"
                  name="fMenuId"
                  type="text"
                  v-model="fMenuId"
                  readonly
                ></v-text-field>

                <v-text-field
                  :label="getLabel('component')"
                  name="fComponent"
                  type="text"
                  v-model="fComponent"
                  readonly
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="btn">
              <v-btn tile @click="onSave">
                SAVE
              </v-btn> 
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col>
          <v-card outlined width="500px">
            <v-data-table
            :search="search"
            :headers="excludeMenuheaders"
            :items="excludeMenuItems"
            hide-default-footer
            @click:row="onSelectedMenu"
            >
              <template v-slot:top>
                <v-text-field
                  v-model="search"
                  label="Search"
                  class="mx-4"
                ></v-text-field>
              </template>
            </v-data-table>
          </v-card>
          
        </v-col>

      </v-row>
    </div>
  </v-app>
</div>
</template>

<style scoped>
  .span1 {
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }

  .layout1 {
    height: 64px;
  }

  .btn {
    display: flex;
    justify-content: flex-end;
  }
</style>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },
  // computed: {
  //   Items() {
  //     return this.items;
  //   }
  // },
  data: () => ({
    // items: [ {id: "01", name: "SYSTEM",
    //           children: [{id: "01-01", name: "권한 관리", children: []},
    //                       {id: "01-02", name: "사용자 그룹 관리", children:[]},
    //                       {id: "01-03", name: "사용자 관리", children:[]},
    //                       {id: "01-04", name: "로그 아웃", children:[]}
    //                     ]
    //           }],
    items: [],
    itemsMap: null,
    activeItem: null,
    matchedItem: null,
    newIdx : 0,
    renderKey: 0,
    upperLevelItem: null,
    dialog: false,
    menuName: null,
    isCancel: false,
    sysItems: [],
    selectSys: null,
    groupItems: [],
    selectGroup: null,
    includeMenuheaders: [],
    includeMenuItems: [],
    excludeMenuheaders: [],
    excludeMenuItems: [],
    fMenuName: null,
    fMenuId: null,
    fMenuDescr: null,
    fComponent: null,
    search: '',
    btnSearchText: '',
    menuNameText: ''
  }),
  // computed: {
  //   btnSearchText() {
  //     return 'SEARCH3'
  //   },
  //   menuNameText() {
  //     return 'MENU NAME3'
  //   }
  // },
  methods: {
    getLabel(label) {
      if (label === 'save') {
        return 'SAVE';
      } else if (label === "component") {
        return 'Component';
      }
    },
    onSave() {
      // console.log(this.$el.textContent);
    },
    onSelectedMenu(item) {
      console.log(item);

      // this.fMenuName = item.menuName;
      this.fMenuId = item.menuId;
      this.fComponent = item.component;
    },
    onSelectedIMenu(item) {
      console.log(item);
    },
    onSearchMenu() {
      console.log('system: ', this.selectSys, ' group: ', this.selectGroup);
      if (this.selectSys === null || this.selectGroup == null) {
        // this.selectSys = 'ADMIN';
        // this.selectGroup = 'TEST_001';
        return;
      }
    },
    onDialogCancel() {
      this.dialog = false;
      this.isCancel = true;
      // console.log(this.menuName);
    },
    onDialogAdd() {
      // this.addItem();
      this.dialog = false;
      this.isCancel = false;
      // console.log(this.menuName);
      
      if (this.isCancel === true) {
        return;
      }

      if (this.menuName === null) {
        return;
      }
      this.addItem();
    },
    moveRight() {
      if (this.activeItem != null) {
        this.upperLevelItem = null;
        this.upperLevelItem = this.findUpperLevelItem(this.items, this.activeItem, null);

        if (this.upperLevelItem != null) {
          let index_move = this.upperLevelItem.children.findIndex((t) => t.id === this.activeItem.id);
          let index_to;
          if (index_move > 0) {
            index_to = index_move - 1;
            this.upperLevelItem.children[index_to].children.push(this.activeItem);
            this.upperLevelItem.children.splice(index_move, 1);
            this.foreceRerender();
          }
        }
      }

      // console.log(this.items);
    },
    moveLeft() {
      if (this.activeItem != null) {
        this.upperLevelItem = null;
        this.upperLevelItem = this.findUpperLevelItem(this.items, this.activeItem, null);

        // console.log('upper: ', this.upperLevelItem);

        if (this.upperLevelItem != null) {
          let target = null;
          target = this.findUpperLevelItem(this.items, this.upperLevelItem, null);
          // console.log('target: ', target);
          let upperLevelId = this.upperLevelItem.id;
          if (target != null) {
            // console.log('children: ', target.children);
            // let index_target = target.children.findIndex((t) => t.id === this.activeItem.id);
            let index_from = this.upperLevelItem.children.findIndex((t) => t.id === this.activeItem.id);
            let index_to = target.children.findIndex((t) => t.id === upperLevelId);

            target.children.splice(index_to + 1, 0, this.activeItem);            
            this.upperLevelItem.children.splice(index_from, 1);
            this.foreceRerender();
          }
        }
      }

      // console.log(this.items);
    },
    swapElement(input, index_from, index_to) {
      let temp = input[index_from];

      input[index_from] = input[index_to];
      input[index_to] = temp;

      // console.log('input: ', input);
    },
    moveUp() {
      if (this.activeItem != null) {
        this.upperLevelItem = null;
        this.upperLevelItem = this.findUpperLevelItem(this.items, this.activeItem, null);
        
        if (this.upperLevelItem != null) {
          // console.log(this.upperLevelItem);
          let index_from = this.upperLevelItem.children.findIndex((t) => t.id === this.activeItem.id);
          let index_to;
          if (index_from > 0) {
            index_to = index_from - 1;
            this.swapElement(this.upperLevelItem.children, index_from, index_to);
            this.foreceRerender();
          }
        }
      }
    },
    moveDown() {
      if (this.activeItem != null) {
        this.upperLevelItem = null;
        this.upperLevelItem = this.findUpperLevelItem(this.items, this.activeItem, null);

        if (this.upperLevelItem != null) {
          // console.log(this.upperLevelItem);
          let index_from = this.upperLevelItem.children.findIndex((t) => t.id === this.activeItem.id);
          let index_to;
          if (index_from < this.upperLevelItem.children.length - 1) {
            index_to = index_from + 1;
            this.swapElement(this.upperLevelItem.children, index_from, index_to);
            this.foreceRerender();
          }
        }
      }
    },
    foreceRerender() {
      this.renderKey += 1;
    },
    onUpdateActive(item) {
      
      if (item.length <= 0) {
        return;
      }
      this.activeItem = item[0];
      // console.log('activeItem: ', this.activeItem);

      // this.activeItemId = item[0].id;
      // console.log('active: ', this.activeItemId);  
      
      this.fMenuName = this.activeItem.name;
      this.fMenuId = this.activeItem.id;
      this.fComponent = this.activeItem.component;
      
    },
    deleteItem() {
      if (this.activeItem == null) {
        return;
      }

      console.log('delete Item: ', this.activeItem);
      this.upperLevelItem = null;
      this.upperLevelItem = this.findUpperLevelItem(this.items, this.activeItem, null);      

      // console.log('upper level Item: ', this.upperLevelItem);
      if (this.upperLevelItem === null) {
        // top level
        this.items = this.items.filter((t) => t.id !== this.activeItem.id);
      } else {
        this.upperLevelItem.children = this.upperLevelItem.children.filter((i) => i.id !== this.activeItem.id)
      }

      this.activeItem = null;
      this.upperLevelItem = null;
      // console.log(this.items);

    },
    // showDialog() {
    //   this.dialog = true;
    // },
    addItem() {
      console.log('add Item includes: ', this.activeItem);
      console.log('Name: ', this.menuName);


      if (this.activeItem != null) {
        let newItemId = 'New'+ `${++this.newIdx}`;
        // let newItemName = `${newItemId}` + ' Item';
        let newItemName = this.menuName;
        
        this.activeItem.children.push({
            id: newItemId,
            name: newItemName,
            children: []
          });
      } else {
        let newItemId = 'New'+ `${++this.newIdx}`;
        // let newItemName = `${newItemId}` + ' Item';
        let newItemName = this.menuName;

        this.items.push({
            id: newItemId,
            name: newItemName,
            children: []
          });
      }

      this.foreceRerender();
      this.activeItem = null;
      // console.log(this.items);
    },
    // findUpperLevelItem(items, upperItem) {
    //   // console.log('length: ', items.length);
    //   var i;
    //   for (i = 0; i < items.length; i++) {
    //     let item = items[i];
    //       // console.log('index: ', i, ' item: ', item.id, ' activeId: ', this.activeItem.id);
    //     if (item.id === this.activeItem.id) {
    //       //console.log('item: ', item.id, ' activeId: ', this.activeItem.id, ' item: ', item);
    //       return upperItem;
    //     } else {
    //       if (item.children.length > 0) {
    //         let retItem = this.findUpperLevelItem(item.children, item);
    //         if (retItem != null) {
    //           return retItem;
    //         }
    //       }
    //     }
    //   }
    //   return null;
    // },
    findUpperLevelItem(items, activeItem, upperItem) {
      // console.log('length: ', items.length);
      var i;
      for (i = 0; i < items.length; i++) {
        let item = items[i];
          // console.log('index: ', i, ' item: ', item.id, ' activeId: ', this.activeItem.id);
        if (item.id === activeItem.id) {
          //console.log('item: ', item.id, ' activeId: ', this.activeItem.id, ' item: ', item);
          return upperItem;
        } else {
          if (item.children.length > 0) {
            let retItem = this.findUpperLevelItem(item.children, activeItem, item);
            if (retItem != null) {
              return retItem;
            }
          }
        }
      }
      return null;
    }
  }, 
  created() {
    this.items = [ //{id: "", name: "MENU", children: [
              {id: "01", name: "SYSTEM",
              children: [{id: "01-01", name: "권한 관리", component: "Authority", children: []},
                          {id: "01-02", name: "사용자 그룹 관리", component: "Groups", children:[]},
                          {id: "01-03", name: "사용자 관리", component: "Users", children:[]},
                          {id: "01-04", name: "로그 아웃", component: "Logout", children:[]}
                        ]
              },
              // {id: "02", name: "SYSTEM2",
              // children: [{id: "02-01", name: "권한 관리2", children: []},
              //             {id: "02-02", name: "사용자 그룹 관리2", children:[]},
              //             {id: "02-03", name: "사용자 관리2", children:[]},
              //             {id: "02-04", name: "로그 아웃2", children:[]}
              //           ]
              // }
    //]}
    ];

    this.sysItems = ['ADMIN', 'ADMIN1', 'ADMIN2'];
    this.groupItems = ['TEST_001', 'TEST_002'];

    this.includeMenuheaders = [
                      {text: 'menuId', align: 'start', filterable: 'false', value: 'menuId'},
                      {text: 'menuName', value: 'menuName'},
                      {text: 'order', value: 'order'},
                      {text: 'description', value: 'menuDescr'}                    
                    ];

    this.includeMenuItems = [
                      {menuId: 'M0001', menuName: '권한 관리', order: '01', menuDescr: '권한 관리'},
                      {menuId: 'M0002', menuName: '사용자 그룹 관리', order: '02', menuDescr: '사용자 그룹 관리'},
                      {menuId: 'M0003', menuName: '사용자 관리', order: '03', menuDescr: '사용자 관리'},
                      {menuId: 'M0004', menuName: '로그 아웃', order: '04', menuDescr: '로그 아웃'}, 
                    ];

    this.excludeMenuheaders = [
                      {text: 'menuId', align: 'start', filterable: 'false', value: 'menuId'},
                      {text: 'description', value: 'menuDescr'},
                      {text: 'component', value: 'component'}                
                    ];

    this.excludeMenuItems = [
                      {menuId: 'M0005', menuDescr: '권한 관리2', component: 'M0005'},
                      {menuId: 'M0006', menuDescr: '사용자 그룹 관리2', component: 'M0006'},
                      {menuId: 'M0007', menuDescr: '사용자 관리2', component: 'M0007'},
                      {menuId: 'M0008', menuDescr: '로그 아웃2',component: 'M0008'}, 
                    ];

    this.itemsMap = [
      {
        "STRUCTURE_ID": "01",
        "ROLE_GROUP_ID": "TEST_001",
        "MENU_NAME": "SYSTEM",
        "PARENT_KEY": null,
        "HAS_CHILD": "Y",
        "MENU_ID": null
    },
    {
        "STRUCTURE_ID": "01-01",
        "ROLE_GROUP_ID": "TEST_001",
        "MENU_NAME": "권한 관리",
        "PARENT_KEY": "01",
        "HAS_CHILD": "N",
        "MENU_ID": "M0001"
    },
    {
        "STRUCTURE_ID": "01-02",
        "ROLE_GROUP_ID": "TEST_001",
        "MENU_NAME": "사용자 그룹 관리",
        "PARENT_KEY": "01",
        "HAS_CHILD": "N",
        "MENU_ID": "M0002"
    },
    {
        "STRUCTURE_ID": "01-03",
        "ROLE_GROUP_ID": "TEST_001",
        "MENU_NAME": "사용자 관리",
        "PARENT_KEY": "01",
        "HAS_CHILD": "N",
        "MENU_ID": "M0003"
    },
    {
        "STRUCTURE_ID": "01-04",
        "ROLE_GROUP_ID": "TEST_001",
        "MENU_NAME": "로그 아웃",
        "PARENT_KEY": "01",
        "HAS_CHILD": "N",
        "MENU_ID": "M0004"
    }
    ];

    // this.btnSearchText ='SEARCH2';
    // console.log('beforCreate: ', this.btnSearchText);
    // this.menuNameText ="MENU NAME2"
  },
  beforeCreate() {
    console.log(this.$root);
    // console.log('beforCreate: ', this.$root.$el.innerHTML);
    // this.$root.$el.innerHTML = this.$root.$el.innerHTML.replace('SEARCH', 'SEARCH2');
    // console.log('beforeMount: ', this.$root.$el.innerHTML);
    // this.btnSearchText ='SEARCH2';
    // console.log('beforCreate: ', this.btnSearchText);
    // this.btnSearchText ='SEARCH2';
    // this.menuNameText ="MENU NAME2"
  },
  beforeMount() {
    //console.log('beforeMount: ', this.$root.$el.innerHTML);
    // console.log('beforeMount: ', this.$root.$el.textContent);
    // this.$root.$el.textContent = this.$root.$el.textContent.replace('SEARCH', 'SEARCH2');
    // console.log('beforeMount: ', this.$root.$el.textContent);
    // this.btnSearchText ='SEARCH2';
    // console.log('beforeMount: ', this.btnSearchText);
    this.btnSearchText ='SEARCH2';
    this.menuNameText ="MENU NAME2"
  },
  mounted() {
    //console.log('mounted: ', this.$el.innerHTML);
  },
  beforeDestroy() {
    // console.log('beforeDestroy: ', this.$el.innerHTML);
  }
};
</script>

