const URL = "http://localhost:3000";
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "client",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "@/assets/scss/custom.scss",
    "~/assets/css/styles.min.css",
    "@/assets/css/global.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/bootstrap.js",
    { src: "~/plugins/cs-components.js", mode: "client" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/auth",
    "vue-social-sharing/nuxt",
    "bootstrap-vue/nuxt",
    "@nuxtjs/strapi",
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  bootstrapVue: {
    bootstrapCSS: false,
    icons: true,
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    baseURL: URL,
  },
  proxy: {
    "/api": URL,
  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en",
    },
  },
  server: {
    port: process.env.PORT || 8000, // default: 3000
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // extend: (config) => {
    //   const svgRule = config.module.rules.find((rule) =>
    //     rule.test.test(".svg")
    //   );
    //   svgRule.test = /\.(png|jpe?g|gif|webp)$/;
    //   config.module.rules.push({
    //     test: /\.svg$/,
    //     use: ["babel-loader", "vue-svg-loader"],
    //   });
    // },
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            propertyName: "token",
          },
          logout: true,
        },
      },
    },
  },
};
