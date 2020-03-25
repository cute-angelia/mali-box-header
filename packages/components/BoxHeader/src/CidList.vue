<template>
  <div>
    <button class="uk-button uk-button-default" type="button" v-if="isLogin">
      {{ currentCname }}({{ currentCid }})
    </button>
    <div
      uk-dropdown="mode: click; animation: uk-animation-slide-top-small; duration: 500"
    >
      <input
        type="text"
        placeholder=""
        class="uk-form-small"
        @keyup="search()"
        v-model="keywords"
      />
      <ul class="uk-nav uk-dropdown-nav">
        <li v-for="(v, i) of this.cidLists" :key="i">
          <a
            v-on:click="changeCid"
            style="color:#666;"
            v-bind:data-id="v.id"
            v-bind:data-name="v.name"
            href="#"
            >{{ v.name }}({{ v.id }})</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import utils from '../library/utils'

  export default {
    components: {}, //在组件内注册
    data() {
      return {
        env: 'local',
        sid: this.$root.sid,
        currentCid: this.$root.currentCidInfo.id,
        currentCname: this.$root.currentCidInfo.name,
        cidLists: [],
        allCidLists: [],
        keywords: '',
        isLogin: this.$root.isLogin
      }
    },
    methods: {
      // 获取 cid 列表
      getCidList() {},
      // 赋值
      setCidList(data) {
        if (data) {
          this.cidLists = data.list
          this.allCidLists = data.list
          // 将所有数据存入localStorage, 建立 id => name
          let temp = {}
          for (let i in data.list) {
            temp[data.list[i]['id']] = data.list[i]['name']
          }
          localStorage.setItem('box-channel', JSON.stringify(temp))
        }
        // choose default
        if (this.currentCid == 0) {
          for (let v of this.cidLists) {
            this.setCid(v.id, v.name)
            break
          }
        }
      },
      // 选择一个 cid
      changeCid(ele) {
        this.setCid(
          ele.target.getAttribute('data-id'),
          ele.target.getAttribute('data-name')
        )
        // 刷新整体页面
        window.location.reload()
      },
      // 设置 cid
      setCid(id, name) {
        localStorage[
          'cid'
        ] = this.currentCid = this.$root.currentCidInfo.id = id
        localStorage[
          'cname'
        ] = this.currentCname = this.$root.currentCidInfo.name = name
      },
      // 查询渠道
      search() {
        if (!this.keywords) {
          this.cidLists = this.allCidLists
        } else {
          let list = this.allCidLists
          this.cidLists = []
          // 遍历
          for (let i in list) {
            if (
              list[i]['id'] == this.keywords ||
              list[i]['name'].indexOf(this.keywords) > -1
            ) {
              this.cidLists.push(list[i])
            }
          }
        }
      }
    },
    beforeMount() {
      this.getCidList()
    }
  }
</script>

<style scoped>
  .uk-dropdown-nav {
    max-height: 300px;
    overflow: auto;
  }
  ::-webkit-scrollbar {
    width: 0px;
  }
</style>
