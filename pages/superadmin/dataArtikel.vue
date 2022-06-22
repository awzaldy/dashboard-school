<template>
  <div class="row">
    <card type="plain">
      <h3 slot="header" class="card-title">Data Artikel</h3>
      <data-tabel-artikel
        :content="loadedPost"
        @hapus="onHapus"
      ></data-tabel-artikel>
    </card>
  </div>
</template>

<script>
import { Table, TableColumn } from "element-ui";
import DataTabelArtikel from "~/components/SuperAdmin/artikel/DataTabelArtikel.vue";
export default {
  layout: "super-admin-layout",
  middleware: ["check-auth", "auth"],
  components: {
    DataTabelArtikel,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  methods: {
    async onHapus(id) {
      await this.$store.dispatch("deletePost", id);
      await this.$store.dispatch("deletePostAdmin", id);
      await this.$router.go(0);
    },
  },
  computed: {
    loadedPost() {
      return this.$store.getters.loadedPosts;
    },
  },
};
</script>

<style>
</style>