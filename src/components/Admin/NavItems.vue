<template>
  <v-list dense>
      <v-subheader>REPORTS</v-subheader>
      <v-list-item-group
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in provisionalItems"
          :key="i"
          link 
          :to="{name: item.to}"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

    <v-list-group :value="false" prepend-icon="mdi-account-circle">
      <template v-slot:activator>
        <v-list-item-title>Users</v-list-item-title>
      </template>

      <v-list-group :value="true" no-action sub-group>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Admin</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item v-for="([title, icon], i) in admins" :key="i" link >
          <v-list-item-title v-text="title"></v-list-item-title>

          <v-list-item-icon>
            <v-icon v-text="icon"></v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-group>

      <v-list-group no-action sub-group>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Actions</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item v-for="([title, icon], i) in cruds" :key="i" link>
          <v-list-item-title v-text="title"></v-list-item-title>

          <v-list-item-icon>
            <v-icon v-text="icon"></v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-group>
    </v-list-group>
  </v-list>
</template>

<script>
export default {
  data() {
    return {
      provisionalItems:[
        { text: 'Crear curso', icon: 'mdi-clock', to: 'admin.course.create' },
        { text: 'Register', icon: 'mdi-account', to: 'admin.register' },
      ],
      items: [
        { title: "Home", icon: "mdi-home-city" },
        { title: "Perfil", icon: "mdi-account" },
      ],
      admins: [
        ["Management", "mdi-account-multiple-outline"],
        ["Settings", "mdi-cog-outline"],
      ],
      cruds: [
        ["Create", "mdi-plus-outline"],
        ["Read", "mdi-file-outline"],
        ["Update", "mdi-update"],
        ["Delete", "mdi-delete"],
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>