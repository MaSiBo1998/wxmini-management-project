import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
// import enElementLocale from 'element-ui/lib/locale/lang/en'
import zhElementLocale from 'element-ui/lib/locale/lang/zh-CN'
// import viElementLocale from 'element-ui/lib/locale/lang/vi'
// import idElementLocale from 'element-ui/lib/locale/lang/id'
import esElementLocale from 'element-ui/lib/locale/lang/es'

// import enLocale from './en'
import zhLocale from './zh-CN'
// import viLocale from './vi'
// import idLocale from './id'
import esLocale from './es'

Vue.use(VueI18n)

const messages = {
  // en: {
  //   ...enLocale,
  //   ...enElementLocale
  // },
  // vi: {
  //   ...viLocale,
  //   ...viElementLocale
  // },
  zh: {
    ...zhLocale,
    ...zhElementLocale
  },
  // id: {
  //   ...idLocale,
  //   ...idElementLocale
  // },
  es: {
    ...esLocale,
    ...esElementLocale
  }
}
export function getLanguage() {
  const chooseLanguage = Cookies.get('language')
  if (chooseLanguage) return chooseLanguage
  return 'es'
}
const i18n = new VueI18n({
  // set locale
  // options: en | zh | es
  locale: getLanguage(),
  silentTranslationWarn: true,
  // set locale messages
  messages
})

export default i18n
