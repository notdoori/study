<template>
  <div>
    <v-app>
      <p> {{ $t('message') }} </p>
      <v-btn @click="onClick">
        CHANGE
      </v-btn>
    </v-app>
  </div>
  
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  methods: {
    onClick() {
      console.log(this.$i18n.locale);
      this.$i18n.locale = 'ko';
    }
  },
  beforeCreate() {
    console.log(this.$root);
  }
  ,created() {

  }
};
</script>
