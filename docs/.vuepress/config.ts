import { defineUserConfig } from 'vuepress'
import { defaultTheme } from 'vuepress'

export default defineUserConfig({

  lang: 'en-US',
  title: 'Nuxt-form',
  base: '/nuxt-form/',
  description: 'Documentation for nuxt-form module',

  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  theme: defaultTheme({
    navbar: [
      { text: 'Guide', link: '/guide/' }
    ],
    repo: '',
    docsDir: '',
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          children: [
            'installation',
            'configuration',
            'build',
            'inputs',
            'validation',
            'actions',
            'model'
          ]
        }
      ]
    }  
  }),
});
