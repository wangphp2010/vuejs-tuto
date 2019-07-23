import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import myapp from '@/components/myapp'
import About from '@/components/About'
import Contact from '@/components/Contact'
import News from '@/components/News'
import Player from '@/components/Player'
import People from '@/components/People'
import Home from '@/components/Home'
import Gdp from '@/components/gdp'
import Page404 from '@/components/Page404'
import PlayerProfile from '@/components/Player/Profile'
import PlayerStats from '@/components/Player/Stats'
import SettingHeader from '@/components/setting/Header'

 
/* import SettingDetail from '@/components/setting/Detail'

import SettingSidebar from '@/components/setting/Sidebar'
import SettingSearch from '@/components/setting/Search' */

import User from '@/components/User'



Vue.use(Router)

export default new Router({
 //mode: 'history', // 去掉链接中的井号 mode: 'history', 默认值是 "hash"
 base: "/vuejs-tuto",  // 根路由 设置 默认 "" 或/

  routes: [
    {
      path: '/',//        path: '/user/(//d+)/(//d+)',        path: '/user/:id(\\d+)',         path: '/user/:id*',
      name: 'Home',
       
         components: {
         Home:Home,
         myHeader: SettingHeader,
       /*  myDetail: SettingDetail,

        SettingSidebar: SettingSidebar,
        SettingSearch: SettingSearch, */
      }  
 


    },
     
    {
      path: '/people',
      name: 'People',
       components: {
        myHeader: SettingHeader,
        People: People,
      }
    },
    {
      path: '/gdp',
      name: 'Gdp',
       components: {
        myHeader: SettingHeader,
        People: Gdp,
      }
    },
    {
      path: '/About',
      name: 'About',
      components: {
        myHeader: SettingHeader,
        About: About,
      },
      alias: '/aboutme'
    },
    {
      path: '/Contact',
      name: 'Contact',
      components: {
        myHeader: SettingHeader,
        Contact: Contact,
      } 
      
    },
    

    {
      path: '/news/:nid?',

      name: 'News',
      components: {
        myHeader: SettingHeader,
        News: News,
      },

    },
    {
      path: '/news/page/:page?',
      name: 'Newspage',
      components: {
        myHeader: SettingHeader,
        News: News,
      },

    },
    {
      path: '/curry',
      redirect: '/player/1', //重定向
      // redirect: { name: 'About' },

    },
    {
      path: "/user/:uid?/:nationality?",
      name: 'User',
      component: User,
      props: true,
    },
    {
      path: '/player/:uid',
      name: 'Player',
      component: Player,
      children: [
        {
          path: 'stats',
          component: PlayerStats

        },
        {
          path: 'profile',
          component: PlayerProfile

        },

      ]
    },
    {
      path: '/myapp',
      name: 'app',
      component: myapp
    },
    {
      path: '*',
      name: 'page404',
      components: {
        myHeader: SettingHeader,
        Page404: Page404,
      },
    },
  ]
})
