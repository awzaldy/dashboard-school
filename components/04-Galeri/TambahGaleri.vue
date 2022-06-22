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
                    >Pilih Gambar 1</label
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
                    >Pilih Gambar 2</label
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
                    >Pilih Gambar 3</label
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
                    >Pilih Gambar 4</label
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
                Upload Foto
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
                      <p style="font-size: 25px">Foto Berhasil Ditambahkan</p>
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
                    Kembali ke halaman galeri dalam
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

            <div class="col-md-12 mt-4 mb-4" v-show="tambahkan">
              <base-button type="success" class="btn-fill" @click="onTambah">
                Tambahkan
              </base-button>
            </div>
          </form>
          <div class="col-md-12" v-show="tambahkan">
            <h5>
              Note: Tunggu upload file selesai, baru klik tombol tambahkan
            </h5>
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
      tambahkan: false,
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

      let nowDate = moment().format("Do-MMMM-YYYY");
      let bulan_no = moment().format("MM");
      let bulan = moment().format("MMMM");
      let year = moment().format("YYYY");
      let rand = (
        Math.random().toString(36).substring(2, 16) +
        Math.random().toString(36).substring(2, 16)
      ).toUpperCase();

      const file1 = this.file_gambar1;
      const file2 = this.file_gambar2;
      const file3 = this.file_gambar3;
      const file4 = this.file_gambar4;
      if (file1 == null) {
        console.log("tidak ada foto untuk form ke-1");
      } else {
        if (!file1.type.match("image.*")) {
          alert("Please upload an image.");
          return;
        }
        const metadata1 = {
          contentType: file1.type,
        };

        this.isUploadingImage = true;

        const imageRef1 = storeFile
          .ref(
            `Galeri/${year}/Bulan|${bulan_no}|${bulan}/${nowDate}/${file1.name}`
          )
          .put(file1, metadata1);

        imageRef1.on(
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
            imageRef1.snapshot.ref.getDownloadURL().then((url) => {
              let tanggalTerbit = moment().format("Do MMMM YYYY");
              let jamTerbit = moment().format("H:mm:ss");
              let nama_admin_cookie = Cookie.get("nama");
              let url_string = url.toString();
              let url_imagekit = url_string.replace(
                "https://firebasestorage.googleapis.com/v0/b/dashboard-school-5b47d.appspot.com",
                "https://ik.imagekit.io/enterbiner/"
              );

              this.url1 = url_imagekit;
              this.blog1.imageUrl = url_imagekit;
              this.form1Galeri.nama_admin = nama_admin_cookie;
              this.form1Galeri.tanggal_terbit = tanggalTerbit;
              this.form1Galeri.jam_terbit = jamTerbit;
              this.form1Galeri.galeri_foto = url_imagekit;
              this.$store.dispatch("addGaleri", this.form1Galeri);
              this.isUploadingImage = false;
              this.tambahkan = true;
            });
          }
        );
      }

      if (file2 == null) {
        console.log("tidak ada foto untuk form ke-2");
      } else {
        if (!file2.type.match("image.*")) {
          alert("Please upload an image.");
          return;
        }

        const metadata2 = {
          contentType: file2.type,
        };

        this.isUploadingImage = true;

        const imageRef2 = storeFile
          .ref(
            `Galeri/${year}/Bulan|${bulan_no}|${bulan}/${nowDate}/${file2.name}`
          )
          .put(file2, metadata2);

        imageRef2.on(
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
            imageRef2.snapshot.ref.getDownloadURL().then((url) => {
              let tanggalTerbit = moment().format("Do MMMM YYYY");
              let jamTerbit = moment().format("H:mm:ss");
              let nama_admin_cookie = Cookie.get("nama");
              let url_string = url.toString();
              let url_imagekit = url_string.replace(
                "https://firebasestorage.googleapis.com/v0/b/dashboard-school-5b47d.appspot.com",
                "https://ik.imagekit.io/enterbiner/"
              );

              this.url2 = url_imagekit;
              this.blog2.imageUrl = url_imagekit;
              this.form2Galeri.nama_admin = nama_admin_cookie;
              this.form2Galeri.tanggal_terbit = tanggalTerbit;
              this.form2Galeri.jam_terbit = jamTerbit;
              this.form2Galeri.galeri_foto = url_imagekit;
              this.$store.dispatch("addGaleri", this.form2Galeri);
              this.isUploadingImage = false;
              this.tambahkan = true;
            });
          }
        );
      }

      if (file3 == null) {
        console.log("tidak ada foto untuk form ke-3");
      } else {
        if (!file3.type.match("image.*")) {
          alert("Please upload an image.");
          return;
        }

        const metadata3 = {
          contentType: file3.type,
        };

        this.isUploadingImage = true;

        const imageRef3 = storeFile
          .ref(
            `Galeri/${year}/Bulan|${bulan_no}|${bulan}/${nowDate}/${file3.name}`
          )
          .put(file3, metadata3);

        imageRef3.on(
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
            imageRef3.snapshot.ref.getDownloadURL().then((url) => {
              let tanggalTerbit = moment().format("Do MMMM YYYY");
              let jamTerbit = moment().format("H:mm:ss");
              let nama_admin_cookie = Cookie.get("nama");
              let url_string = url.toString();
              let url_imagekit = url_string.replace(
                "https://firebasestorage.googleapis.com/v0/b/dashboard-school-5b47d.appspot.com",
                "https://ik.imagekit.io/enterbiner/"
              );

              this.url3 = url_imagekit;
              this.blog3.imageUrl = url_imagekit;
              this.form3Galeri.nama_admin = nama_admin_cookie;
              this.form3Galeri.tanggal_terbit = tanggalTerbit;
              this.form3Galeri.jam_terbit = jamTerbit;
              this.form3Galeri.galeri_foto = url_imagekit;
              this.$store.dispatch("addGaleri", this.form3Galeri);
              this.isUploadingImage = false;
              this.tambahkan = true;
            });
          }
        );
      }

      if (file4 == null) {
        console.log("tidak ada foto untuk form ke-4");
      } else {
        if (!file4.type.match("image.*")) {
          alert("Please upload an image.");
          return;
        }

        const metadata4 = {
          contentType: file4.type,
        };

        this.isUploadingImage = true;

        const imageRef4 = storeFile
          .ref(
            `Galeri/${year}/Bulan|${bulan_no}|${bulan}/${nowDate}/${file4.name}`
          )
          .put(file4, metadata4);

        imageRef4.on(
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
            imageRef4.snapshot.ref.getDownloadURL().then((url) => {
              let tanggalTerbit = moment().format("Do MMMM YYYY");
              let jamTerbit = moment().format("H:mm:ss");
              let nama_admin_cookie = Cookie.get("nama");
              let url_string = url.toString();
              let url_imagekit = url_string.replace(
                "https://firebasestorage.googleapis.com/v0/b/dashboard-school-5b47d.appspot.com",
                "https://ik.imagekit.io/enterbiner/"
              );

              this.url4 = url_imagekit;
              this.blog4.imageUrl = url_imagekit;
              this.form4Galeri.nama_admin = nama_admin_cookie;
              this.form4Galeri.tanggal_terbit = tanggalTerbit;
              this.form4Galeri.jam_terbit = jamTerbit;
              this.form4Galeri.galeri_foto = url_imagekit;
              this.$store.dispatch("addGaleri", this.form4Galeri);
              this.isUploadingImage = false;
              this.tambahkan = true;
            });
          }
        );
      }

      // Create a reference to the destination where we're uploading
      // the file.
    },

    async onTambah() {
      this.searchModalVisible = true;
      this.countDownTimer();
      this.interval = setTimeout(
        function () {
          this.$router.push({ path: "/superadmin/galeri" }).then($router.go(0));
        }.bind(this),
        5000
      );
    },
  },
};
</script>

<style>
</style>