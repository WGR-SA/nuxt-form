import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Nuxt-form",
  base: '/nuxt-form/',
  description: "Nuxt-form documentation",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/readme' }
    ],

    logo: 'https://wgr.ch/img/home/tortue.svg',

    sidebar: [
      {
        text: 'Introduction',
        link: '/guide/README'
      },
      {
        text: 'Installation',
        link: '/guide/installation'
      },
      {
        text: 'Configuration',
        link: '/guide/configuration',
      },
      {
        text: 'Builder',
        link: '/guide/build'
      },
      {
        text: 'Inputs',
        link: '/guide/inputs'
      },
      {
        text: 'Validation',
        link: '/guide/validation'
      },
      {
        text: 'Actions',
        link: '/guide/actions'
      },
      {
        text: 'Model',
        link: '/guide/model'
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/wgr-sa/nuxt-form' }
    ]
  }
})
