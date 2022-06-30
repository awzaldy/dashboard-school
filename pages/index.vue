<template>
  <div>
    <card type="plain">
      <h3 slot="header" class="card-title">DASHBOARD</h3>
      <div class="row">
        <div class="col-lg-3">
          <card type="chart">
            <template slot="header">
              <h5 class="card-category">ADMIN</h5>
              <h3 class="card-title mt-3">{{ admin }}</h3>
            </template>

            <div class="card-footer m-0 pt-0">
              <div class="stats">{{ jabatan }}</div>
            </div>
          </card>
        </div>
        <div class="col-lg-3">
          <card type="chart">
            <template slot="header">
              <h5 class="card-category">Artikel</h5>
              <h3 class="card-title mt-3">
                <i class="tim-icons icon-paper text-info"></i>
                {{ Number(totalArtikel) }}
              </h3>
            </template>

            <div class="card-footer m-0 pt-0">
              <div class="stats">Total artikel yang terbit</div>
            </div>
          </card>
        </div>
        <div class="col-lg-3">
          <card type="chart">
            <template slot="header">
              <h5 class="card-category">Artikel</h5>
              <h3 class="card-title mt-3">
                <i class="tim-icons icon-paper text-success"></i>
                {{ Number(totalArtikelAdmin) }}
              </h3>
            </template>
            <div class="card-footer m-0 pt-0">
              <div class="stats">Artikel yang anda terbitkan</div>
            </div>
          </card>
        </div>
        <div class="col-lg-3">
          <card type="chart">
            <template slot="header">
              <h5 class="card-category">Artikel</h5>
              <h3 class="card-title mt-3">
                <i class="tim-icons icon-paper text-danger"></i>500.321
              </h3>
            </template>
            <div class="card-footer m-0 pt-0">
              <div class="stats">Artikel yang perlu pengecekan</div>
            </div>
          </card>
        </div>

        <div class="col-lg-6">
          <card type="chart">
            <template slot="header">
              <h3 class="card-category">Artikel Terakhir</h3>
              <h3 class="card-title mt-3">{{ admin }}</h3>
            </template>

            <div class="card-footer m-0 pt-0">
              <div class="stats">{{ jabatan }}</div>
            </div>
          </card>
        </div>
        <div class="col-lg-6">
          <card type="chart">
            <template slot="header">
              <h3 class="card-category">Infromasi Terakhir</h3>
              <h3 class="card-title mt-3">{{ admin }}</h3>
            </template>

            <div class="card-footer m-0 pt-0">
              <div class="stats">{{ jabatan }}</div>
            </div>
          </card>
        </div>
      </div>
    </card>
  </div>
</template>
<script>
import Cookie from "js-cookie";
export default {
  name: "dashboard",
  middleware: ["check-auth", "auth"],
  components: {},
  data() {
    return {
      admin: "",
      jabatan: "",
    };
  },
  async beforeMount() {
    let cookieadmin = Cookie.get("nama");
    let cookiejabatan = Cookie.get("jabatan");
    this.admin = cookieadmin;
    this.jabatan = cookiejabatan;
  },
  computed: {
    totalArtikel() {
      return this.$store.getters.totalArtikel;
    },
    totalArtikelAdmin() {
      return this.$store.getters.totalArtikelAdmin;
    },
  },
  methods: {},
  mounted() {},
};
</script>
<style></style>
