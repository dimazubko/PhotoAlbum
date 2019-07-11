import Vue from 'vue'
import Router from 'vue-router'
import Authorization from '@/views/Authorization.vue'

Vue.use(Router); // Регистрируем Router как плагин

const ROUTER = new Router( // Экспортируем по дефолту новый экземпляр класса Router
    {
        mode: 'history', // Чтобы были слэши (/) в путях
        routes: [ 
                    { 
                        path: '/',
                        name: 'login',
                        component: Authorization
                    },
                    {
                        path: '/albumlist',
                        name: 'albumlist',
                        component: () => import('@/views/AlbumList.vue'), // Lazy loading
                        meta: { requiresAuth: true }
                    },
                    {
                        path: '/albumlist/album-:id',
                        name: 'album',
                        component: () => import('@/views/Album.vue'),
                        props: true,
                        meta: { requiresAuth: true }
                    },
                    {
                        path: '/favorites',
                        name: 'favorites',
                        component: () => import('@/views/Favorites.vue'),
                        props: true,
                        meta: { requiresAuth: true }
                    }
                ] // Указываем массив маршрутов, где каждый объект представляет отдельную страницу
    }
)

ROUTER.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth))
    {
      // этот путь требует авторизации, проверяем залогинен ли
      // пользователь, и если нет, перенаправляем на страницу логина
      const USER = JSON.parse(localStorage.getItem('user') || '{}');
      if (USER.status !== 'loggedIn') next({ path: '/' });
      else next();
    }
    else next() // всегда так или иначе нужно вызвать next()!    
})

export default ROUTER;