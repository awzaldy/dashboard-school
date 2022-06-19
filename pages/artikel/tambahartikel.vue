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
              <base-input
                type="text"
                v-model="form.judul_artikel"
                label="Judul Artikel"
              >
              </base-input>
            </div>
            <div class="col-md-12">
              <label> Gambar Artikel </label>
              <div class="input-group mb-3">
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="inputGroupFile04"
                    @click="onResetData"
                    @change.prevent="onFileChange"
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
                  v-if="url"
                  :src="url"
                  style="max-height: 600px; max-width: 400px"
                />
              </div>
            </div>

            <div class="col-md-12">
              <client-only>
                <VueEditor
                  :editorOptions="editorSettings"
                  useCustomImageHandler
                  @image-added="handleImageAdded"
                  v-model="form.deskripsi_artikel"
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
                variant ="info"
                show-progress
                animated
              ></b-progress>
            </div>
          </form>
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
      file_gambar: null,
      url: null,
      blog: {},
      isUploadingImage: false,
      isDeletingImage: false,
      value: "",
      uploadValue: "",
      uploadSemua: false,
      form: {
        id: "",
        judul_artikel: "",
        gambar_artikel: "",
        tanggal_terbit: "",
        jam_terbit: "",
        nama_admin: "",
        jabatan: "",
        deskripsi_artikel: "",
        gambar_deskripsi: [],
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
        `artikel/${year}/bulan|${nowDate}/${judul}/DeskripsiGambar/${file.name}`
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
        this.form.gambar_deskripsi = url_imagekit;
        Editor.insertEmbed(cursorLocation, "image", url_imagekit);
        resetUploader();
        this.isUploadingImage = false;
      });
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.file_gambar = file;
      this.url = URL.createObjectURL(file);
      this.uploadValue = "";
    },
    launchImageFile() {
      // Trigger the file input click event.
      this.$refs.imageFile.click();
    },
    uploadImageFile() {
      // When the upload ends, set the value of the blog image URL
      // and signal that uploading is done.
    },
    onResetData() {
      this.uploadValue = "";
    },

    onSubmit() {
      this.uploadSemua = true;
      const file = this.file_gambar;

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
      const judul = this.form.judul_artikel;
      let nowDate = moment().format("Do-MMMM-YYYY");
      let bulan_no = moment().format("MM");
      let bulan = moment().format("MMMM");
      let year = moment().format("YYYY");
      const imageRef = storeFile
        .ref(
          `artikel/${year}/Bulan|${bulan_no}|${bulan}/${nowDate}/${judul}/ArtikelGambar/${file.name}`
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
            this.$store.dispatch("addPosts", this.form);
            this.$store.dispatch("addPostsAdmin", this.form);
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