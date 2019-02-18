require('./bootstrap');

window.Vue = require('vue');

import moment from 'moment'
import VueProgressBar from 'vue-progressbar'
import Swal from 'sweetalert2'
window.Swal = Swal

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});
window.Toast = Toast

import { 
    Form,
    HasError,
    AlertError,
    AlertErrors, 
    AlertSuccess
} from 'vform'
window.Form = Form

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
Vue.component(AlertErrors.name, AlertErrors)
Vue.component(AlertSuccess.name, AlertSuccess)

import VueRouter from 'vue-router'
Vue.use(VueRouter)

Vue.filter('capitalize', function (value) {
    if(!value) return ''
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('date', function (value) {
    return moment(value).format('Do MMMM YYYY');
})

window.Fire = new Vue();

const routes = [
    { path: '/admin', component: require('./components/admin/Dashboard.vue').default},
    { path: '/admin/developer', component: require('./components/admin/Developer.vue').default},
    { path: '/admin/profile', component: require('./components/Profile.vue').default},
    { path: '/admin/users', component: require('./components/admin/UserList.vue').default},
    { path: '/admin/users/:id', component: require('./components/admin/User.vue').default},
]

const router = new VueRouter({
    mode: 'history',
    routes
})

const options = {
    color: '#bffaf3',
    failedColor: '#874b4b',
    thickness: '5px',
    transition: {
        speed: '0.2s',
        opacity: '0.6s',
        termination: 300
    },
    location: 'top'
}
Vue.use(VueProgressBar, options)

Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue').default
);

Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue').default
);

const app = new Vue({
    el: '#app',
    router
});
