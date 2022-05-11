<template>
  <div>
    <client-only
      ><loading v-show="loading" />
      <h1>EDIT ARTICLE PAGE</h1>
      <cs-input
        v-model="title"
        label="Title"
        placeholder="Article title"
      ></cs-input>
      {{ title }}
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
      {{ categoryID }}
      <br />
      <file-preview v-model="selectedFile" :previewImage="selectedFile" />
      {{ selectedFile }}
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
      <cs-button @click="onSaveChanges">Save Changes</cs-button>
      <fake-news-modal :show="showFakeNewsModal" @onClose="onClose" />
    </client-only>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import filePreview from "@/components/filePreview.vue";
import Loading from "@/components/Loading.vue";
import FakeNewsModal from "@/components/FakeNewsModal.vue";

export default {
  components: {
    editor: Editor,
    Loading,
    FakeNewsModal,
    filePreview,
  },
  mounted() {
    this.title = this.article.title;
    this.categoryID = this.article.categoryID._id;
    this.content = this.article.content;
    this.selectedFile = this.article.photo;
    this.fileName = this.article.photo.substring(
      this.article.photo.lastIndexOf("amazonaws.com/") + 13 + 1
    );
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
  async asyncData({ $axios, params }) {
    try {
      let categories = $axios.$get("/api/categories");
      let article = $axios.$get(`/api/articles/${params.id}`);

      const [categoriesResponse, articleResponse] = await Promise.all([
        categories,
        article,
      ]);
      return {
        categories: categoriesResponse.categories,
        article: articleResponse.article,
      };
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async onSaveChanges() {
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
        if (this.selectedFile !== this.article.photo) {
          data.append("photo", this.selectedFile, this.selectedFile.name);
        }
        data.append("authorID", this.$auth.$state.user.authorID);
        data.append("categoryID", this.categoryID);
        data.append("duration", duration.toString() + " min");
        data.append("description", description);
        data.append("wholeText", wholeText);
        let response = await this.$axios.$put(
          `/api/articles/${this.$route.params.id}`,
          data
        );
        if (response.success) {
          this.loading = false;
          console.log("articol modificat");
          this.$router.push(`/articles/${this.$route.params.id}`);
        } else {
          this.loading = false;
          this.showFakeNewsModal = true;
          console.log(" ERAORE!!! articol nemodificat");
        }
      } catch (err) {
        console.log(err);
      }
    },
    onClose() {
      this.showFakeNewsModal = false;
    },
  },
};
</script>

<style scoped>
.article-img {
  width: 300px;
  height: 200px;
}
</style>
