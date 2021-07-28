<template>
<div id="app">
  <v-app>
    <div>
      <v-row>
        <v-col>
          <v-subheader>Multi Language</v-subheader>
            <v-container
            id="scroll-target"
            style="max-height: 300px"
            class="overflow-y-auto"
            >
              <v-row
                v-scroll:#scroll-target="onScrollLeft"
                align="start"
                justify="start"
                style="height: 500px"
              >
                <v-data-table :headers="headers" :items="items" hide-default-footer>
                </v-data-table>
              </v-row>
            </v-container>
        </v-col>
        <v-col>
          <v-subheader></v-subheader>
          <v-text-field
              v-model="TableName"
              label="Code"
          >
          </v-text-field>
          <v-text-field
              v-model="TableName"
              label="KO"
          >
          </v-text-field>
          <v-text-field
              v-model="TableName"
              label="EN"
          >
          </v-text-field>
          <v-row>
            <v-btn>
              SAVE
            </v-btn>
            <v-btn>
              DELETE
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </v-app>
  <!-- <v-app id="inspire">
    <div>
      <v-row>
        <v-col>
          <v-subheader>SYSTEM CODE</v-subheader>
          <v-container
          id="scroll-target"
          style="max-height: 300px"
          class="overflow-y-auto"
          >
            <v-row
              v-scroll:#scroll-target="onScrollLeft"
              align="center"
              justify="center"
              style="height: 500px"
            >
              <v-data-table :headers="headers" :items="items" hide-default-footer>
              </v-data-table>
            </v-row>
          </v-container>
          <v-row>
            <v-col>
              <v-text-field
                  v-model="TableName"
                  label="Table Name"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
                <v-text-field
                    v-model="useYN"
                    label="Use"
                >
                </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
                <v-text-field
                    v-model="TableDescr"
                    label="Table Descr"
                >
                </v-text-field>
            </v-col>
          </v-row>   
          <v-row>
            <v-btn>
              SAVE
            </v-btn>
            <v-btn>
              DELETE
            </v-btn>
          </v-row>
        </v-col>

        <v-col>
          <v-subheader>SYSTEM CODE DATA</v-subheader>
          <v-row>
            <v-container
            id="scroll-target"
            style="max-height: 300px"
            class="overflow-y-auto"
            >
              <v-row
                v-scroll:#scroll-target="onScrollRight"
                align="center"
                justify="center"
                style="height: 500px"
              >
                <v-data-table :headers="dataHeaders" :items="dataItems" hide-default-footer>
                </v-data-table>
              </v-row>
            </v-container>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                  v-model="TableName"
                  label="Table Name"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
                <v-text-field
                    v-model="DataCode"
                    label="Code"
                >
                </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
                <v-text-field
                    v-model="CodeSeq"
                    label="Seq"
                >
                </v-text-field>
            </v-col>
          </v-row> 
          <v-row>
            <v-col>
                <v-text-field
                    v-model="DataDescr"
                    label="Description"
                >
                </v-text-field>
            </v-col>
          </v-row> 
          <v-row>
            <v-btn>
              SAVE
            </v-btn>
            <v-btn>
              DELETE
            </v-btn>
          </v-row>
        </v-col>        
      </v-row>
    </div>
  </v-app> -->
</div>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
    // headers: [
    //       { text: 'Table', value: 'table', },
    //       { text: 'UseYN', value: 'useYN', },
    //       { text: 'Descr', value: 'descr' },
    //     ],
    // items: [
    //   { table: 'SYS_CODE_1', useYN: 'Y', descr: 'SYS_CODE1_DESC'},
    //   { table: 'SYS_CODE_2', useYN: 'N', descr: 'SYS_CODE2_DESC'},
    //   { table: 'SYS_CODE_3', useYN: 'Y', descr: 'SYS_CODE3_DESC'},
    //   { table: 'SYS_CODE_4', useYN: 'Y', descr: 'SYS_CODE4_DESC'},
    //   { table: 'SYS_CODE_5', useYN: 'Y', descr: 'SYS_CODE5_DESC'},
    //   { table: 'SYS_CODE_6', useYN: 'Y', descr: 'SYS_CODE6_DESC'}
    // ],
    headers: [ {text: 'Code', value: 'code'}
             ],
    items: [ {code: '@SAVE'}, 
             {code: '@DELETE'},
             {code: '@SEARCH'},
           ],
    dataHeaders: [
          { text: 'Table', value: 'dataTable', },
          { text: 'Code', value: 'dataCode' },
          { text: 'Seq', value: 'dataSeq' },
          { text: 'Descr', value: 'dataDescr' },
        ],
    dataItems: [
      { dataTable: 'SYS_CODE_1', dataCode: 'CODE1', dataSeq: 1, dataDescr: 'CODE1_DESC'},
      { dataTable: 'SYS_CODE_1', dataCode: 'CODE2', dataSeq: 2, dataDescr: 'CODE2_DESC'},
      { dataTable: 'SYS_CODE_1', dataCode: 'CODE3', dataSeq: 3, dataDescr: 'CODE3_DESC'},
      { dataTable: 'SYS_CODE_1', dataCode: 'CODE4', dataSeq: 4, dataDescr: 'CODE4_DESC'},
      { dataTable: 'SYS_CODE_1', dataCode: 'CODE5', dataSeq: 5, dataDescr: 'CODE5_DESC'},
      { dataTable: 'SYS_CODE_1', dataCode: 'CODE6', dataSeq: 6, dataDescr: 'CODE6_DESC'}
    ],

    TableName: '',
    TableDescr: '',
    offsetLeft: 0,
    offsetRight: 0,
  }),
  methods: {
    onScrollLeft (e) {
      this.offsetLeft = e.target.scrollTop
    },
    onScrollRight (e) {
      this.offsetRight = e.target.scrollTop
    },
  },
};
</script>
