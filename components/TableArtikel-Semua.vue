<template>
  <div class="col-md-12">
    <b-table
      striped
      hover
      :items="content"
      :fields="fields"
      :filter="filter"
      :per-page="perPage"
      :current-page="currentPage"
      :responsive="true"
      show-empty
    >
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>
      <template #cell(id)="data">
        <nuxt-link :to="`/admin-area/admin-penggalangan-data/${data.value}`">
          <base-button type="info" class="btn-fill">
            <i class="tim-icons icon-paper"></i>
          </base-button>
        </nuxt-link>
      </template>
    </b-table>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import axios from "axios";
export default {
  props: {
    content: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      filter: null,
      perPage: 10,
      currentPage: 1,
      view: true,
      fields: [
        { key: "index", label: "No" },

        { key: "judul_artikel", label: "Judul Artikel" },

        { key: "tanggal_terbit", label: "Tanggal Terbit" },

        { key: "jam_terbit", label: "Jam Terbit" },

        { key: "nama_admin", label: "Admin" },

        { key: "id", label: "Detail" },

        { key: "id", label: "Edit" },
      ],
      form: this.content
        ? { ...this.content }
        : {
            id: this.content.id,
          },
    };
  },
  methods: {
    onHapus(id) {
      this.form.id = id;
      this.$emit("hapus", this.form);
    },
  },
};
</script>

<style>
</style>