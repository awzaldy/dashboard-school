<template>
  <div class="row">
    <card type="plain">
      <h3 slot="header" class="card-title">INFORMASI & AGENDA</h3>
      <nuxt-link to="/info/tambahInfo">
        <base-button type="info" class="btn-fill mb-4">
          Tambahkan Informasi
        </base-button>
      </nuxt-link>

      <card>
        <nuxt-link to="/info/">
          <base-button type="success" class="btn-fill mb-4">
            Semua Informasi
          </base-button>
        </nuxt-link>
        <nuxt-link to="/info/info-anda">
          <base-button type="success" class="btn-fill mb-4">
            Informasi Anda
          </base-button>
        </nuxt-link>

        <div class="col-md-12">
          <h4 slot="header" class="card-title mb-3">Semua Informasi</h4>

          <table-info
            :content="loadedInformasiAdmin"
            @hapus="onHapus"
          ></table-info>
        </div>
      </card>
    </card>
  </div>
</template>
<script>
import TableInfo from "~/components/02-Informasi/TableInfo.vue";
export default {
  name: "dashboard",
  middleware: ["check-auth", "auth"],
  components: {
    TableInfo,
  },
  data() {
    return {};
  },
  computed: {
    loadedInformasiAdmin() {
      return this.$store.getters.loadedInformasiAdmin;
    },
  },
  methods: {
    async onHapus(id) {
      await this.$store.dispatch("deleteInformasi", id);
      await this.$store.dispatch("deleteInformasiAdmin", id);
      //await this.$router.go(0);
    },
  },
  mounted() {},
};
</script>
<style></style>
