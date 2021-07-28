<template>
<div>
  <v-app>
    <div class="layout1">
      <v-layout  align-baseline>
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
                SEARCH
            </v-btn>
          </v-card>
        </span>      
      </v-layout>
    </div>
    
    <div>
      <v-row>
        <v-col cols="auto">
          <v-card outlined >
            <v-data-table
              :headers="menuHeaders"
              :items="menuItems"
              hide-default-footer
              @click:row="onSelectedMenu"
            >
            </v-data-table>
          </v-card>
        </v-col>

        <v-col cols="auto" sm="3">
          <v-card outlined>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Menu ID"
                  name="fMenuId"
                  type="text"
                  v-model="fMenuId"
                ></v-text-field>
                <v-text-field
                  label="Menu Name"
                  name="fMenuName"
                  type="text"
                  v-model="fMenuName"
                ></v-text-field>
                <v-text-field
                  label="Menu Descr"
                  name="fMenuDescr"
                  type="text"
                  v-model="fMenuDescr"
                ></v-text-field>
                <v-text-field
                  label='Component'
                  name="fComponent"
                  type="text"
                  v-model="fComponent"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="btn">
              <v-btn tile @click="onSave">
                SAVE
              </v-btn> 
              <v-btn tile @click="onDelete">
                DELETE
              </v-btn> 
            </v-card-actions>
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

  .save {
    position: absolute; 
    right: 20px;
  }

  .layout1 {
    height: 64px;
  }

  .btn {
    display: flex;
    justify-content: flex-end;
  }

  .combo {
    background: rgb(213, 229, 247);
  }
</style>

<script>

export default {
  name: 'App',
  methods: {
    onSearchMenu() {
      console.log('system: ', this.selectSys);
      if (this.selectSys === null ) {
        // this.selectSys = 'ADMIN';
        // this.selectGroup = 'TEST_001';
        return;
      }
    },
    onSelectedMenu(item) {
      console.log(item);

      // this.fMenuName = item.menuName;
      this.fMenuId = item.menuId;
      this.fComponent = item.component;
      this.fMenuName = item.menuName;
      this.fMenuDescr = item.menuDescr;
    },
    onSave() {

    },
    onDelete() {

    }

  },

  data: () => ({
    //
    selectSys: null,
    fMenuName: null,
    fMenuId: null,
    fMenuDescr: null,
    fComponent: null,
    sysItems: ['ADMIN', 'ADMIN1', 'ADMIN2'],
    menuHeaders: [
                    {text: 'menuId', align: 'start', filterable: 'false', value: 'menuId'},
                    {text: 'menuName', value: 'menuName'},
                    {text: 'description', value: 'menuDescr'},
                    {text: 'component', value: 'component'}                      
                 ],
    menuItems: [
                    {menuId: 'M0001', menuName: '권한 관리', menuDescr: '권한 관리', component: 'Authority'},
                    {menuId: 'M0002', menuName: '사용자 그룹 관리', menuDescr: '사용자 그룹 관리', component: 'Group'},
                    {menuId: 'M0003', menuName: '사용자 관리', menuDescr: '사용자 관리', component: 'users'},
                    {menuId: 'M0004', menuName: '로그 아웃', menuDescr: '로그 아웃', component: 'Logout'}, 
                    {menuId: 'M0005', menuName: '로그 아웃', menuDescr: '로그 아웃', component: 'Logout'},
                    {menuId: 'M0006', menuName: '로그 아웃', menuDescr: '로그 아웃', component: 'Logout'}, 
                    {menuId: 'M0007', menuName: '로그 아웃', menuDescr: '로그 아웃', component: 'Logout'}, 
                    {menuId: 'M0008', menuName: '로그 아웃', menuDescr: '로그 아웃', component: 'Logout'},
                    {menuId: 'M0009', menuName: '로그 아웃', menuDescr: '로그 아웃', component: 'Logout'},                    
               ]
  }),
};
</script>
