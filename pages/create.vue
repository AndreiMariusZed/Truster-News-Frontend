<template>
  <div>
    <client-only>
      <loading v-show="loading" />
      <h1>CREATE ARTICLE PAGE</h1>
      <cs-input
        v-model="title"
        label="Title"
        placeholder="Article title"
      ></cs-input>
      <label>Category</label>
      <select v-model="categoryID">
        <option
          v-for="category in categories"
          :key="category._id"
          :value="category._id"
        >
          {{ category.type }}
        </option>
      </select>
      <br />
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
      <cs-button @click="onAddArticle">Add Article</cs-button>
      <fake-news-modal :show="showFakeNewsModal" @onClose="onClose" />
    </client-only>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import Loading from "@/components/Loading.vue";
import FakeNewsModal from "@/components/FakeNewsModal.vue";

export default {
  components: {
    editor: Editor,
    Loading,
    FakeNewsModal,
  },
  data() {
    return {
      title: "",
      content: "",
      selectedFile: null,
      fileName: null,
      categoryID: null,
      loading: false,
      showFakeNewsModal: false,
    };
  },
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get("/api/categories");
      return {
        categories: response.categories,
      };
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      this.fileName = event.target.files[0].name;
    },
    onClose() {
      this.showFakeNewsModal = false;
    },
    async onAddArticle() {
      this.loading = true;
      try {
        let description = tinymce.activeEditor
          .getContent({ format: "text" })
          .substring(0, 150);
        let wholeText = tinymce.activeEditor.getContent({ format: "text" });
        var wordcount = tinymce.activeEditor.plugins.wordcount;
        let words = wordcount.body.getWordCount();
        let duration = Math.ceil(words / 250);
        let data = new FormData();
        data.append("title", this.title);
        data.append("content", this.content.toString());
        data.append("photo", this.selectedFile, this.selectedFile.name);
        data.append("authorID", this.$auth.$state.user.authorID);
        data.append("categoryID", this.categoryID);
        data.append("duration", duration.toString() + " min");
        data.append("description", description);
        data.append("wholeText", wholeText);
        let response = await this.$axios.$post("/api/articles", data);
        if (response.success) {
          this.loading = false;
          console.log("articol adaugat");
          this.$router.push(`/articles/${response.article._id}`);
        } else {
          this.loading = false;
          this.showFakeNewsModal = true;
          console.log("fake news");
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style></style>
