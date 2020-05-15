import Vue from 'vue'
import Router from 'vue-router'

import MyWorkBench from '../pages/my-workbench'
import Knowledge from '../pages/my-knowledge'
import OpenSource from '../pages/my-open-source'

import SocketIO from '../pages/socket/socket-io'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: MyWorkBench
    },
    {
      path: '/workbench',
      name: 'workbench',
      component: MyWorkBench
    },
    {
      path: '/knowledge',
      name: 'knowledge',
      component: Knowledge
    },
    {
      path: '/opensource',
      name: 'openSource',
      component: OpenSource
    }, {
      path: '/socketio',
      name: 'SocketIO',
      component: SocketIO
    }
  ]
})
