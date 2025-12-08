import { createRouter, createWebHistory } from 'vue-router'

import ProductsPage from '@/pages/ProductsPage.vue'

import CategoryProductsPage from '@/pages/CategoryProductsPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/products',
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsPage,
  },
  {
    path: '/products/:categoryId/:slug',
    name: 'category-products',
    component: CategoryProductsPage,
    props: true,
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
