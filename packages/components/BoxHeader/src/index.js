// 引入组件
import BoxHeader from './BoxHeader/src'
BoxHeader.install = Vue => Vue.component(BoxHeader.name, BoxHeader);

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(BoxHeader);
}

export default BoxHeader;