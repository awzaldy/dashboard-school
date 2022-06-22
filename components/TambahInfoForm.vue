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
              <base-input
                type="text"
                v-model="formInfo.judul_informasi"
                label="Judul Informasi"
              >
              </base-input>
            </div>
            <div class="col-md-12">
              <label class="mb-2">Tanggal Agenda</label>
              <base-input>
                <el-date-picker
                  v-model="formInfo.tanggal_agenda_mulai"
                  type="date"
                  placeholder="Pilih hari"
                >
                </el-date-picker>
              </base-input>
            </div>
            <div class="col-md-12">
              <label for="appt">Waktu Agenda Mulai:</label>
              <base-input type="time" v-model="formInfo.waktu_agenda_mulai">
              </base-input>
            </div>
            <div class="col-md-12">
              <label for="appt">Waktu Agenda Selesai:</label>
              <base-input type="time" v-model="formInfo.waktu_agenda_selesai">
              </base-input>
            </div>
            <div class="col-md-12">
              <label class="mb-2">Infromasi</label>
              <client-only>
                <VueEditor
                  :editorOptions="editorSettings"
                  v-model="formInfo.informasi"
                />
              </client-only>
            </div>
            <div class="col-md-12 mt-4 mb-4">
              <base-button type="info" class="btn-fill" @click="onSubmit">
                Tambahkan
              </base-button>
            </div>
            <ul class="navbar-nav ml-auto">
              <modal
                :show.sync="searchModalVisible_info"
                class="modal"
                :centered="false"
                :show-close="true"
              >
                <div class="mx-auto">
                  <div class="row">
                    <div class="col-md-10">
                      <p style="font-size: 25px">
                        Informasi Berhasil Ditambahkan
                      </p>
                    </div>
                    <div class="col-md-2">
                      <img
                        src="@/assets/img/check-mark-verified.gif"
                        alt="Computer man"
                        style="width: 48px; height: 48px"
                      />
                    </div>
                  </div>
                  <div>
                    Kembali ke halaman utama dalam
                    {{ countDown }} detik
                  </div>
                </div>
              </modal>
            </ul>
          </form>
          <b-card class="mt-3" header="Form Data Result">
            <pre class="m-0">{{ formInfo }}</pre>
          </b-card>
        </div>
      </template>
    </card>
  </div>
</template>

<script>
import { storeFile } from "@/plugins/firebase.js";
import { Modal } from "@/components";
import "firebase/storage";
import "firebase/compat/storage";
import moment, { now } from "moment";
import Cookie from "js-cookie";
import { DatePicker, TimeSelect } from "element-ui";
export default {
  components: {
    [DatePicker.name]: DatePicker,
    [TimeSelect.name]: TimeSelect,
    Modal,
  },
  data() {
    return {
      countDown: 3,
      interval: null,
      searchModalVisible_info: false,
      formInfo: {
        nama_admin: "",
        judul_informasi: "",
        tanggal_agenda_buat: "",
        waktu_agenda_buat: "",
        tanggal_agenda_mulai: "",
        tanggal_only_mulai: "",
        waktu_agenda_mulai: "",
        waktu_agenda_selesai: "",
        bulan_agenda_mulai: "",
        tahun_agenda_mulai: "",
        informasi: "",
        gambar_informasi: "",
        belum_lewat: false,
      },
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

  methods: {
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      }
    },
    handleImageAdded: function (file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)
      var formData = new FormData();
      formData.append("image", file);

      if (!file.type.match("image.*")) {
        alert("Please upload an image.");
        return;
      }

      const metadata = {
        contentType: file.type,
      };

      this.isUploadingImage = true;

      const judul = this.form.judul_artikel;
      // Create a reference to the destination where we're uploading
      // the file.
      let nowDate = moment().format("MM|Do-MMMM-YYYY");
      let year = moment().format("YYYY");
      const imageRef = storeFile.ref(
        `Informasi/${year}/bulan|${nowDate}/${file.name}`
      );

      const uploadTask = imageRef
        .put(file, metadata)
        .then((snapshot) => {
          // Once the image is uploaded, obtain the download URL, which
          // is the publicly accessible URL of the image.
          // LETS TRY MAKE SOME CHARITY !!

          return snapshot.ref.getDownloadURL().then((url) => {
            return url;
          });
        })
        .catch((error) => {
          console.error("Error uploading image", error);
        });

      // When the upload ends, set the value of the blog image URL
      // and signal that uploading is done.
      uploadTask.then((url) => {
        let url_string = url.toString();
        let url_imagekit = url_string.replace(
          "https://firebasestorage.googleapis.com/v0/b/dashboard-school-5b47d.appspot.com/",
          "https://ik.imagekit.io/enterbiner/"
        );
        this.blog.imageUrl = url_imagekit;
        this.form.gambar_informasi = url_imagekit;
        Editor.insertEmbed(cursorLocation, "image", url_imagekit);
        resetUploader();
        this.isUploadingImage = false;
      });
    },
    onSubmit() {
      let nowDate = moment().format("Do-MMMM-YYYY");
      let jamTerbit = moment().format("H:mm:ss");
      let tanggal = moment().format("Do");
      let bulan_no = moment().format("MM");
      let bulan = moment().format("MMMM");
      let year = moment().format("YYYY");
      let tanggal_lengkap_mulai = moment(
        this.formInfo.tanggal_agenda_mulai.toString()
      ).format("Do-MMMM-YYYY");
      let tanggal_mulai = moment(
        this.formInfo.tanggal_agenda_mulai.toString()
      ).format("Do");
      let bulan_mulai = moment(
        this.formInfo.tanggal_agenda_mulai.toString()
      ).format("MMMM");
      let tahun_mulai = moment(
        this.formInfo.tanggal_agenda_mulai.toString()
      ).format("YYYY");
      this.formInfo.nama_admin = Cookie.get("nama");
      this.formInfo.waktu_agenda_buat = jamTerbit;
      this.formInfo.tanggal_agenda_buat = nowDate;
      this.formInfo.tanggal_agenda_mulai = tanggal_lengkap_mulai;
      this.formInfo.tanggal_only_mulai = tanggal_mulai;
      this.formInfo.bulan_agenda_mulai = bulan_mulai;
      this.formInfo.tahun_agenda_mulai = tahun_mulai;
      this.$store.dispatch("addInformasi", this.formInfo);
      this.searchModalVisible_info = true;
      this.countDownTimer();
      this.interval = setTimeout(
        function () {
          this.$router.push({ path: "/info" });
        }.bind(this),
        5000
      );
    },
  },
};
</script>

<style>
</style>