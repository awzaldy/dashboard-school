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
      <template #cell(id)="data" v-if="view">
        <nuxt-link :to="`/admin-area/admin-penggalangan-data/${data.value}`">
          <base-button type="info" class="btn-fill">
            <i class="tim-icons icon-paper"></i>
          </base-button>
        </nuxt-link>
        <nuxt-link :to="`/admin-area/admin-penggalangan-edit/${data.value}`">
          <base-button type="success" class="btn-fill">
            <i class="tim-icons icon-pencil"></i>
          </base-button>
        </nuxt-link>
        <base-button
          v-b-modal.my-modal
          type="danger"
          class="btn-fill"
          @click="$bvModal.show('bv-modal-hapus-' + data.value)"
        >
          <i class="tim-icons icon-trash-simple"></i>
        </base-button>
        <b-modal :id="'bv-modal-hapus-' + data.value" hide-footer>
          <template #modal-title>
            Apakah Anda Yakin Akan Menghapus Data Penggalangan?
          </template>

          <b-row>
            <b-col>
              <b-button
                @click="onHapus(data.value)"
                variant="danger"
                class="mt-3"
                block
                >Hapus</b-button
              >
            </b-col>
            <b-col>
              <b-button
                @click="$bvModal.hide('bv-modal-hapus-' + data.value)"
                variant="secondary"
                class="mt-3"
                block
                >Batalkan</b-button
              >
            </b-col>
          </b-row>
        </b-modal>
      </template>
      <template #cell(id)="data" v-else>
        <nuxt-link :to="`/admin-area/admin-penggalangan-data/${data.value}`">
          <base-button type="info" class="btn-fill">
            <i class="tim-icons icon-paper"></i>
            {{ data.value }}
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