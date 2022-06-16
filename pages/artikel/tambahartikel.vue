<template>
  <div>
    <card type="chart">
      <template slot="header">
        <div class="col-lg-6">
          <div class="col-md-12">
            <h3 slot="header" class="title">Tambah Artikel</h3>
          </div>
          <form @submit.prevent="updateProfile">
            <div class="col-md-12">
              <base-input type="email" label="Judul Artikel"> </base-input>
            </div>
            <div class="col-md-12">
              <base-input type="email" label="Gambar Artikel"> </base-input>
            </div>
            <div class="col-md-12">
              <client-only>
                <vue-editor></vue-editor>
              </client-only>
            </div>
            <div class="col-md-12 mt-4 mb-4">
              <base-button type="info" class="btn-fill">
                Tambahkan
              </base-button>
            </div>
          </form>
        </div>
      </template>
    </card>
  </div>
</template>

<script>
import VueEditor from "~/components/VueEditor.vue";

export default {
  components: { VueEditor },
  middleware: ["check-auth", "auth"],
  data() {
    return {};
  },
  method: {},
};
</script>

<style>
</style>