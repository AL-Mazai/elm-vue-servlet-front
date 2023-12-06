import {createApp} from 'vue'
import App from './App.vue'

const app = createApp(App)

// axios配置
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8082/elm_back_war/';//基础url部分
app.config.globalProperties.$axios = axios;//将axios挂载到vue实例上(this.$axios)

//font-awesome组件
import 'font-awesome/css/font-awesome.min.css'
//normalize.css组件
import 'normalize.css/normalize.css'

// 路由配置
import router from './router'

router.beforeEach(function (to, from, next) {
    let user = sessionStorage.getItem('user');

    //除了登录、注册、首页、商家列表、商家信息之外，都需要判断是否登录
    if (!(to.path == '/' || to.path == '/index' || to.path == '/businessList' ||
        to.path == '/businessInfo' || to.path == '/login' || to.path == '/register')) {
        if (user == null) {
            router.push('/login');
            // location.reload();
        }
    }
    next();

});
app.use(router)

//element-plus和icon图标组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus)

// 引入qs，用于url参数转化（parse和stringify）的库
import qs from 'qs';

app.config.globalProperties.$qs = qs;

// 公共模块
import {
    getCurDate,
    setSessionStorage,
    getSessionStorage,
    removeSessionStorage,
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage
} from './common/common'

app.config.globalProperties.$getCurDate = getCurDate
app.config.globalProperties.$setSessionStorage = setSessionStorage
app.config.globalProperties.$getSessionStorage = getSessionStorage
app.config.globalProperties.$removeSessionStorage = removeSessionStorage
app.config.globalProperties.$setLocalStorage = setLocalStorage
app.config.globalProperties.$getLocalStorage = getLocalStorage
app.config.globalProperties.$removeLocalStorage = removeLocalStorage


app.mount('#app')
