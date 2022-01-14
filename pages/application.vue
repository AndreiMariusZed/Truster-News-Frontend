<template>
  <div class="application">
    <h1>APPLY TO BECOME AN AUTHOR PAGE</h1>
    <client-only>
      <cs-input
        v-model="description"
        label="Description"
        placeholder="Enter a description"
      ></cs-input>
      <h1>CREATE ARTICLE FOR DEMONSTRATION OF YOUR SKILLS</h1>
      <cs-input
        v-model="title"
        label="Title"
        placeholder="Article title"
      ></cs-input>
      <br />
      <label>Upload Image For Article: </label>
      <input type="file" @change="onFileSelected" />
      <p>{{ fileName }}</p>
      <br />
      <p>Content</p>
      <editor
        v-model="content"
        api-key="85gwv1mg3enexbvackceg6qi25ysyjsh87slqwxpjigg3xk2"
        :init="{
          height: 500,
          menubar: true,
          file_picker_types: 'image',
          file_picker_callback: function (cb, value, meta) {},
          plugins: [
            'advlist autolink lists link image imagetools charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help | paste | image | wordcount',
        }"
      />
      <br />
      <label>Upload Your CV:</label>
      <input type="file" @change="onCVuploaded" />
      <p>{{ cvName }}</p>
      <cs-button @click="onSubmit">Submit Application</cs-button>
    </client-only>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
export default {
  components: {
    editor: Editor,
  },
  data() {
    return {
      description: "",
      title: "",
      content: "",
      selectedFile: null,
      fileName: null,
      selectedCV: null,
      cvName: null,
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      this.fileName = event.target.files[0].name;
    },
    onCVuploaded(event) {
      this.selectedCV = event.target.files[0];
      this.cvName = event.target.files[0].name;
    },
    async onSubmit() {
      try {
        let data = new FormData();
        data.append("userID", this.$auth.$state.user._id);
        data.append("title", this.title);
        data.append("content", this.content.toString());
        data.append("photo", this.selectedFile, this.selectedFile.name);
        data.append("description", this.description);
        data.append("cv", this.selectedCV, this.selectedCV.name);
        let response = await this.$axios.$post("/api/applications", data);
        if (response.success) {
          console.log("Application added");
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.application {
  margin-top: 40px;
}
</style>
