<template>
  <div>
    <VueEditor
      :editorOptions="editorSettings"
      useCustomImageHandler
      @image-added="handleImageAdded"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      editorSettings: {
        modules: {
          imageDrop: true,
          imageResize: true,
        },
        theme: "snow",
      },
    };
  },
  method: {
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
  },
};
</script>

<style>
</style>