<template>
  <v-container>
    <!-- <v-row>
      <v-breadcrumbs :items="items">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
            :to="{ name: item.href }"
            :disabled="item.disabled"
          >
            {{ item.text.toUpperCase() }}
          </v-breadcrumbs-item>
        </template>
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </v-row> -->
    <v-row>
      <v-col>
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          text: "Sesiones",
          disabled: false,
          href: "in.course.sessions",
          action: 'holas'
        },
        {
          text: "Calificaciones",
          disabled: false,
          href: "in.course.qualifications",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>