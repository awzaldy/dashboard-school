<template>
  <div>
    <card type="plain">
      <h3 slot="header" class="card-title">ARTIKEL</h3>
      <nuxt-link to="/artikel/tambahartikel">
        <base-button type="info" class="btn-fill mb-4">
          Tambahkan Artikel
        </base-button>
      </nuxt-link>
      <table-artikel :content="loadedPostAdmin"></table-artikel>
    </card>
  </div>
</template>

<script>
import axios from "axios";
import Cookie from "js-cookie";
import { Table, TableColumn } from "element-ui";
import TableArtikel from '~/components/TableArtikel.vue';
export default {
  middleware: ["check-auth", "auth"],
  components: {
    TableArtikel,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  computed: {
    loadedPostAdmin() {
      return this.$store.getters.loadedPostsAdmin;
    },
  },
};
</script>

<style>
</style>