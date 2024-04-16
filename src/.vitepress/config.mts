import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "数据结构与算法",

  description: "JavaScript 数据结构与算法",

  lang: 'zh-CN',

  lastUpdated: true,

  srcDir: 'docs',

  outDir:'../dist',

  head: [
    ['link', { rel: 'icon', href: '/images/logo.png' }],
  ],

  markdown: {
    lineNumbers: true, // 代码行号
    image: {
      lazyLoading: true // 图片懒加载
    }
  },

  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    logo: '/images/logo.png',

    outline: {
      level: [2, 4]
    },

    search: {
      provider: 'local'
    },

    nav: [
      { text: '数据结构', link: '/data-structure/Array', activeMatch: '/data-structure/' },
      { text: '算法', link: '/algorithm/sort', activeMatch: '/algorithm/' }
    ],

    sidebar: {
      // 数据结构
      '/data-structure/': {
        items: [
          { text: '数组', link: '/data-structure/Array' },
          { text: '栈', link: '/data-structure/Stack' },
          { text: '队列', link: '/data-structure/Queue' },
          { text: '优先队列', link: '/data-structure/PriorityQueue' },
          { text: '单向链表', link: '/data-structure/LinkedList' },
          { text: '双向链表', link: '/data-structure/DoubleLinkedList' },
          { text: '集合', link: '/data-structure/Set' },
          { text: '字典', link: '/data-structure/Map' },
          { text: '哈希表', link: '/data-structure/HashTable' },
          { text: '树', link: '/data-structure/Tree' },
          { text: '二叉树', link: '/data-structure/BinaryTree' },
          { text: '二叉搜索树', link: '/data-structure/BinarySearchTree' },
          { text: '图', link: '/data-structure/Graph' },
        ]
      },

      // 算法
      '/algorithm/': {
        text: '算法',
        collapsed: false,
        items: [
          { text: '排序', link: '/algorithm/sort' },
          { text: '搜索', link: '/algorithm/search' },
          { text: '设计思想', link: '/algorithm/idea' },
          { text: '经典算法', link: '/algorithm/classic' },
        ]
      },
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/XPoet/js-data-structure-and-algorithm' }
    ],

    footer: {
      message: 'Released under the AGPL-3.0 License',
      copyright: 'Copyright © 2019-present XPoet'
    },
  }
})
