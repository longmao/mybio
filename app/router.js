import Vue from 'vue'
import VueRouter from 'vue-router'


import auth from './util/auth'

import Index from './modules/Index.vue'

const About = r => require.ensure([], () => r(require('./modules/About.vue')), 'About')
const App = r => require.ensure([], () => r(require('./modules/App.vue')), 'App')
const Faq = r => require.ensure([], () => r(require('./modules/Faq.vue')), 'Faq')




const Pitch_Reg_Success = r => require.ensure([], () => r(require('./modules/Pitch_Reg_Success.vue')), 'Pitch_Reg_Success')
const Invest_Referral_Program = r => require.ensure([], () => r(require('./modules/Invest_Referral_Program.vue')), 'Invest_Referral_Program')
const Pitch_Reg = r => require.ensure([], () => r(require('./modules/Pitch_Reg.vue')), 'Pitch_Reg')
const Why_Us = r => require.ensure([], () => r(require('./modules/Why_Us.vue')), 'Why_Us')
const Promotion_In_China = r => require.ensure([], () => r(require('./modules/Promotion_In_China.vue')), 'Promotion_In_China')
const Biochina_Online_Pitch = r => require.ensure([], () => r(require('./modules/Biochina_Online_Pitch.vue')), 'Biochina_Online_Pitch')





Vue.use(VueRouter)



const router = new VueRouter({
    base: __dirname,
    mode: 'hash',
    routes: [
        { path: '/', component: Index },
        { path: '/faq', component: Faq },
        { path: '/pitch_reg_success', component: Pitch_Reg_Success },
        { path: '/invest_referral_program', component: Invest_Referral_Program },
        { path: '/pitch_reg', component: Pitch_Reg },
        { path: '/why_us', component: Why_Us },
        { path: '/promotion_in_china', component: Promotion_In_China },
        { path: '/biochina_online_pitch', component: Biochina_Online_Pitch },
        { path: '/*', component: Index }
    ]
})
router.beforeEach((to, from, next) => {
    console.log("from: " + from.fullPath)
    console.log("to path: " + to.fullPath)
    window.scrollTo(0, 0)
    next() // 确保一定要调用 next()
})

export default router
