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

              <base-button
                type=""
                class="btn-fill"
                v-if="file_gambar"
                :ref="file_gambar"
                @click="uploadImageFile()"
              >
                Upload gambar
              </base-button>
            </div>

            <div class="col-md-12">
              <client-only>
                <VueEditor
                  :editorOptions="editorSettings"
                  useCustomImageHandler
                  @imageAdded="handleImageAdded"
                  v-model="form.deskripsi_artikel"
                />
              </client-only>
            </div>
            <div class="col-md-12 mt-4 mb-4">
              <base-button type="info" class="btn-fill">
                Tambahkan
              </base-button>
            </div>
            <div class="col-md-12">
              <div class="progress">
                <div
                  class="progress-bar"
                  role="progressbar"
                  :aria-valuenow="uploadValue"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {{ uploadValue }}%
                </div>
              </div>
            </div>
          </form>
          <card class="mt-3" header="Form Data Result">
            <pre class="m-0">{{ form }}</pre>
          </card>
        </div>
      </template>
    </card>
  </div>
</template>

<script>
import { storeFile } from "@/plugins/firebase.js";
import "firebase/storage";
import "firebase/compat/storage";
import axios from "axios";
import moment from "moment";
export default {
  middleware: ["check-auth", "auth"],
  data() {
    return {
      editorSettings: {
        modules: {
          imageDrop: true,
          imageResize: true,
        },
        theme: "snow",
      },
      file_gambar: null,
      url: null,
      blog: {},
      isUploadingImage: false,
      isDeletingImage: false,
      value: "",
      uploadValue: "75",
      form: {
        id: "",
        judul_artikel: "",
        gambar_artikel: "",
        tanggal_terbit: "",
        nama_admin: "",
        deskripsi_artikel: "",
        gambar_deskripsi: [],
      },
    };
  },
  methods: {
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

      // Create a reference to the destination where we're uploading
      // the file.
      const imageRef = storeFile.ref(`images/Deskripsi/${file.name}`);

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
          "https://firebasestorage.googleapis.com/v0/b/myfundaction-4d946.appspot.com/",
          "https://ik.imagekit.io/enterbinertesting/"
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

      const imageRef = storeFile
        .ref(`images/main/${file.name}`)
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
            let url_string = url.toString();
            let url_imagekit = url_string.replace(
              "https://ik.imagekit.io/enterbinertesting/"
            );
            this.url = url_imagekit;
            this.blog.imageUrl = url_imagekit;
            this.form.gambar = url_imagekit;
            console.log(this.form.gambar);
            this.isUploadingImage = false;
          });
        }
      );
      // When the upload ends, set the value of the blog image URL
      // and signal that uploading is done.
    },
    onResetData() {
      this.uploadValue = "";
    },
  },
};
</script>

<style>
</style>