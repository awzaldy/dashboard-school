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
      :sort-desc.sync="sortDesc"
      show-empty
    >
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>
      <template #cell(id)="data">
        <nuxt-link :to="`/admin-area/admin-penggalangan-data/${data.value}`">
          <base-button type="info" class="btn-fill">
            Lihat Artikel <i class="tim-icons icon-paper ml-2"></i>
          </base-button>
        </nuxt-link>
      </template>
    </b-table>
    <b-pagination
      class="d-flex justify-content-center"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
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
      sortDesc: true,
      fields: [
        { key: "index", label: "No", sortable: true },

        { key: "judul_artikel", label: "Judul Artikel", sortable: true },

        { key: "tanggal_terbit", label: "Tanggal Terbit", sortable: true },

        { key: "jam_terbit", label: "Jam Terbit", sortable: true },

        { key: "nama_penulis", label: "Penulis", sortable: true },

        { key: "nama_admin", label: "Admin", sortable: true },

        { key: "id", label: "Detail", sortable: true },

        { key: "id", label: "Edit", sortable: true },
      ],
      form: this.content
        ? { ...this.content }
        : {
            id: this.content.id,
          },
    };
  },
  computed: {
    rows() {
      return this.content.length;
    },
  },
  methods: {},
};
</script>

<style>
</style>