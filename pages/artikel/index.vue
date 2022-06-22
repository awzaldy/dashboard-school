<template>
  <div>
    <card type="plain">
      <h3 slot="header" class="card-title">ARTIKEL</h3>
      <nuxt-link to="/artikel/tambahartikel">
        <base-button type="info" class="btn-fill mb-4">
          Tambahkan Artikel
        </base-button>
      </nuxt-link>

      <card>
        <base-button
          type="success"
          class="btn-fill mb-4"
          @click="artikel = true"
        >
          Semua Artikel
        </base-button>

        <base-button
          type="success"
          class="btn-fill mb-4"
          @click="artikelAnda()"
        >
          Artikel Anda
        </base-button>

        <div class="col-md-12" v-if="artikel">
          <h4 slot="header" class="card-title mb-3">Semua Artikel</h4>
          <table-artikel-semua
            :content="loadedPost"
            @hapus="onHapus"
          ></table-artikel-semua>
        </div>

        <div class="col-md-12" v-else>
          <h4 slot="header" class="card-title mb-3">Artikel Anda</h4>
          <table-artikel
            :content="loadedPostAdmin"
            @hapus="onHapus"
          ></table-artikel>
        </div>
      </card>
    </card>
  </div>
</template>

<script>
import axios from "axios";
import Cookie from "js-cookie";
import { Table, TableColumn } from "element-ui";
import TableArtikel from "~/components/TableArtikel.vue";
import TableArtikelSemua from "~/components/TableArtikel-Semua.vue";
export default {
  middleware: ["check-auth", "auth"],
  components: {
    TableArtikelSemua,
    TableArtikel,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      artikel: true,
    };
  },
  methods: {
    async onHapus(id) {
      await this.$store.dispatch("deletePost", id);
      await this.$store.dispatch("deletePostAdmin", id);
      //await this.$router.go(0);
    },
    artikelAnda() {
      this.artikel = false;
    },
  },
  computed: {
    loadedPost() {
      return this.$store.getters.loadedPosts;
    },
    loadedPostAdmin() {
      return this.$store.getters.loadedPostsAdmin;
    },
  },
};
</script>

<style>
</style>