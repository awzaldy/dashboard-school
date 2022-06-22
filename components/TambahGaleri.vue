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
              <label class="mb-3"> Tambah Foto Galeri </label>
              <div class="input-group mb-3">
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="inputGroupFile04"
                    @click="onResetData"
                    @change.prevent="onFileChange1"
                  />
                  <label class="custom-file-label" for="inputGroupFile04"
                    >Pilih Gambar</label
                  >
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="mb-3" id="preview">
                <img
                  v-if="url1"
                  :src="url1"
                  style="max-height: 600px; max-width: 400px"
                />
              </div>
            </div>
            <div class="col-md-12">
              <div class="input-group mb-3">
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="inputGroupFile04"
                    @click="onResetData"
                    @change.prevent="onFileChange2"
                  />
                  <label class="custom-file-label" for="inputGroupFile04"
                    >Pilih Gambar</label
                  >
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="mb-3" id="preview">
                <img
                  v-if="url2"
                  :src="url2"
                  style="max-height: 600px; max-width: 400px"
                />
              </div>
            </div>
            <div class="col-md-12">
              <div class="input-group mb-3">
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="inputGroupFile04"
                    @click="onResetData"
                    @change.prevent="onFileChange3"
                  />
                  <label class="custom-file-label" for="inputGroupFile04"
                    >Pilih Gambar</label
                  >
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="mb-3" id="preview">
                <img
                  v-if="url3"
                  :src="url3"
                  style="max-height: 600px; max-width: 400px"
                />
              </div>
            </div>
            <div class="col-md-12">
              <div class="input-group mb-3">
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="inputGroupFile04"
                    @click="onResetData"
                    @change.prevent="onFileChange4"
                  />
                  <label class="custom-file-label" for="inputGroupFile04"
                    >Pilih Gambar</label
                  >
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="mb-3" id="preview">
                <img
                  v-if="url4"
                  :src="url4"
                  style="max-height: 600px; max-width: 400px"
                />
              </div>
            </div>
            <div class="col-md-12 mt-4 mb-4">
              <base-button type="info" class="btn-fill" @click="onSubmit">
                Tambahkan
              </base-button>
            </div>
            <ul class="navbar-nav ml-auto">
              <modal
                :show.sync="searchModalVisible"
                class="modal"
                :centered="false"
                :show-close="true"
              >
                <div class="mx-auto">
                  <div class="row">
                    <div class="col-md-10">
                      <p style="font-size: 25px">
                        Artikel Berhasil Ditambahkan
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

            <div class="col-md-12 mb-3 mt-3">
              <b-progress
                height="1rem"
                :value="uploadValue"
                v-if="uploadSemua"
                max="100"
                variant="info"
                show-progress
                animated
              ></b-progress>
            </div>
          </form>
          <div class="col-md-12">
            <h5>Note: Jumlah maksimal dalam upload gambar adalah 4 foto</h5>
          </div>
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
import axios from "axios";
import moment, { now } from "moment";
import Cookie from "js-cookie";
export default {
  components: { Modal },
  middleware: ["check-auth", "auth"],
  data() {
    return {
      countDown: 3,
      interval: null,
      editorSettings: {
        modules: {
          imageDrop: true,
          imageResize: true,
        },
        theme: "snow",
      },
      searchModalVisible: false,
      file_gambar1: null,
      file_gambar2: null,
      file_gambar3: null,
      file_gambar4: null,
      url1: null,
      url2: null,
      url3: null,
      url4: null,
      blog1: {},
      blog2: {},
      blog3: {},
      blog4: {},
      isUploadingImage: false,
      isDeletingImage: false,
      value: "",
      uploadValue: "",
      uploadSemua: false,
      form1Galeri: {
        id: "",
        tanggal_terbit: "",
        jam_terbit: "",
        nama_admin: "",
        galeri_foto: "",
      },
      form2Galeri: {
        id: "",
        tanggal_terbit: "",
        jam_terbit: "",
        nama_admin: "",
        galeri_foto: "",
      },
      form3Galeri: {
        id: "",
        tanggal_terbit: "",
        jam_terbit: "",
        nama_admin: "",
        galeri_foto: "",
      },
      form4Galeri: {
        id: "",
        tanggal_terbit: "",
        jam_terbit: "",
        nama_admin: "",
        galeri_foto: "",
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
    onFileChange1(e) {
      const file = e.target.files[0];
      this.file_gambar1 = file;
      this.url1 = URL.createObjectURL(file);
      this.uploadValue = "";
    },
    onFileChange2(e) {
      const file = e.target.files[0];
      this.file_gambar2 = file;
      this.url2 = URL.createObjectURL(file);
      this.uploadValue = "";
    },
    onFileChange3(e) {
      const file = e.target.files[0];
      this.file_gambar3 = file;
      this.url3 = URL.createObjectURL(file);
      this.uploadValue = "";
    },
    onFileChange4(e) {
      const file = e.target.files[0];
      this.file_gambar4 = file;
      this.url4 = URL.createObjectURL(file);
      this.uploadValue = "";
    },
    launchImageFile() {
      // Trigger the file input click event.
      this.$refs.imageFile.click();
    },
    onResetData() {
      this.uploadValue = "";
    },

    async onSubmit() {
      this.uploadSemua = true;
      const file = [
        this.file_gambar1,
        this.file_gambar2,
        this.file_gambar3,
        this.file_gambar4,
      ];

      if (!file.type.match("image.*")) {
        alert("Please upload an image.");
        return;
      }

      const metadata = {
        contentType: file.type,
      };

      this.isUploadingImage = true;

      // Create a reference to the destination where we're uploading
      // the file.
      let nowDate = moment().format("Do-MMMM-YYYY");
      let bulan_no = moment().format("MM");
      let bulan = moment().format("MMMM");
      let year = moment().format("YYYY");
      const imageRef = storeFile
        .ref(
          `Galeri/${year}/Bulan|${bulan_no}|${bulan}/${nowDate}/${file.name}`
        )
        .put(file, metadata);

      imageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          imageRef.snapshot.ref.getDownloadURL().then((url) => {
            let tanggalTerbit = moment().format("Do MMMM YYYY");
            let jamTerbit = moment().format("H:mm:ss");
            let nama_admin_cookie = Cookie.get("nama");
            let jabatan_cookie = Cookie.get("jabatan");
            let url_string = url.toString();
            let url_imagekit = url_string.replace(
              "https://firebasestorage.googleapis.com/v0/b/dashboard-school-5b47d.appspot.com",
              "https://ik.imagekit.io/enterbiner/"
            );

            this.url = url_imagekit;
            this.blog.imageUrl = url_imagekit;
            this.form.nama_admin = nama_admin_cookie;
            this.form.jabatan = jabatan_cookie;
            this.form.tanggal_terbit = tanggalTerbit;
            this.form.jam_terbit = jamTerbit;
            this.form.gambar_artikel = url_imagekit;

            this.url = url_imagekit;
            this.blog.imageUrl = url_imagekit;
            this.form.nama_admin = nama_admin_cookie;
            this.form.jabatan = jabatan_cookie;
            this.form.tanggal_terbit = tanggalTerbit;
            this.form.jam_terbit = jamTerbit;
            this.form.gambar_artikel = url_imagekit;

            this.url = url_imagekit;
            this.blog.imageUrl = url_imagekit;
            this.form.nama_admin = nama_admin_cookie;
            this.form.jabatan = jabatan_cookie;
            this.form.tanggal_terbit = tanggalTerbit;
            this.form.jam_terbit = jamTerbit;
            this.form.gambar_artikel = url_imagekit;

            this.url = url_imagekit;
            this.blog.imageUrl = url_imagekit;
            this.form.nama_admin = nama_admin_cookie;
            this.form.jabatan = jabatan_cookie;
            this.form.tanggal_terbit = tanggalTerbit;
            this.form.jam_terbit = jamTerbit;
            this.form.gambar_artikel = url_imagekit;

            // this.$store.dispatch("addGaleri", this.formInfo);
            this.isUploadingImage = false;
            this.searchModalVisible = true;
            this.countDownTimer();
            this.interval = setTimeout(
              function () {
                this.$router.push({ path: "/artikel" });
              }.bind(this),
              5000
            );
          });
        }
      );
    },
  },
};
</script>

<style>
</style>