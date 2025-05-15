import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListaItem from '@/components/ListaRickAndMorty/ListaItem.vue'
import SobreView from '@/views/SobreView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/:characterId',
      name: 'Personagem',
      component: ListaItem,
      props: ({ params }) => ({
        ...params,
        ...{ characterId: Number.parseInt(params.characterId) || undefined },
      }),
    },
    {
      path: '/sobre',
      name: 'Sobre',
      component: SobreView,
    },
  ],
})

export default router
