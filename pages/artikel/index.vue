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
        <nuxt-link to="/artikel/">
          <base-button type="success" class="btn-fill mb-4">
            Semua Artikel
          </base-button>
        </nuxt-link>
        <nuxt-link to="/artikel/artikel-anda">
          <base-button type="success" class="btn-fill mb-4">
            Artikel Anda
          </base-button>
        </nuxt-link>

        <div class="col-md-12">
          <h4 slot="header" class="card-title mb-3">Semua Artikel</h4>
          <table-artikel-semua :content="loadedPost"></table-artikel-semua>
        </div>
      </card>
    </card>
  </div>
</template>

<script>
import axios from "axios";
import Cookie from "js-cookie";
import { Table, TableColumn } from "element-ui";
import TableArtikel from "~/components/artikel/TableArtikel.vue";
import TableArtikelSemua from "~/components/artikel/TableArtikel-Semua.vue";
export default {
  scrollToTop: true,
  middleware: ["check-auth", "auth"],
  components: {
    TableArtikelSemua,
    TableArtikel,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {};
  },
  methods: {
    async onHapus(id) {
      await this.$store.dispatch("deletePost", id);
      await this.$store.dispatch("deletePostAdmin", id);
      //await this.$router.go(0);
    },
  },
  mounted() {},
  methods: {
    moveUp() {
      window.scrollTo(0, 0);
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