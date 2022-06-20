<template>
  <div>
    <card type="chart">
      <template slot="header">
        <div class="col-lg-6">
          <div class="col-md-12">
            <h3 slot="header" class="title">Tambah Informasi</h3>
          </div>
          <form @submit.prevent="updateProfile">
            <div class="col-md-12">
              <label class="mb-2">Tanggal Agenda</label>
              <base-input>
                <el-date-picker
                  v-model="datePicker"
                  type="date"
                  placeholder="Pilih hari"
                >
                </el-date-picker>
              </base-input>
            </div>
            <div class="col-md-12">
              <label class="mb-2">Infromasi</label>
              <client-only>
                <VueEditor :editorOptions="editorSettings" />
              </client-only>
            </div>
            <div class="col-md-12 mt-4 mb-4">
              <base-button type="info" class="btn-fill" @click="onSubmit">
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
import { DatePicker, TimeSelect } from "element-ui";
export default {
  components: {
    [DatePicker.name]: DatePicker,
    [TimeSelect.name]: TimeSelect,
  },
  data() {
    return {
      datePicker: "",
      editorSettings: {
        modules: {
          imageDrop: true,
          imageResize: true,
        },
        theme: "snow",
      },
    };
  },
};
</script>

<style>
</style>