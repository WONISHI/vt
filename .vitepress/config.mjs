import { defineConfig } from 'vitepress'
import { set_sidebar } from './utils/auto_sidebar.js'
export default defineConfig({
  base: '/vt/',
  title: "关于收集插件的用法",
  description: "A VitePress Site",
  head: [["link", { rel: "icon", href: "/vt/logo.svg" }]],
  themeConfig: {
    logo: '/logo.svg',
    outlineTitle: '目录',
    outline: [1, 6],
    nav: [
      {
        text: '首页', items: [
          { text: '尚医通', link: 'http://8.134.184.87' }
        ]
      },
      {
        text: '示例', items: [
          { text: 'pdfjs', link: '/src/pdfjs/' },
          { text: 'qiankun', link: '/src/qiankun/qiankun教程.md' }
        ]
      }
    ],

    sidebar: {
      "/toolsfunction/pdfjs": set_sidebar("/src/pdfjs"),
      "/src/qiankun":set_sidebar("/src/qiankun")
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    footer: {
      copyright: 'Copyright @2024 Author WEI'
    },
    // 设置搜索框的样式
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
  }
})
