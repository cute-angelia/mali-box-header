<template>
  <div>
    <span class="uk-link">{{ this.currentAppName }}</span>
    <div
      uk-drop="mode: click;animation: uk-animation-slide-top-small; duration: 500"
    >
      <div class="uk-card-default uk-card-body ">
        <div v-for="(v, k) of this.dataLists" :key="k" class="app-style">
          <a v-bind:href="v.url">
            <img
              v-if="v.icon != null && v.icon != 'null' && v.icon.length > 0"
              style="width:90px;height:90px;"
              v-bind:src="v.icon"
              alt=""
            />
            <vue-letter-avatar
              v-else
              v-bind:name="v.name"
              size="90"
              :rounded="false"
            />
            <p style="color:#666;">{{ v.name }}</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { goPost } from "../../lib/api";
import { getToken } from "../../lib/auth";

import Vue from "vue";
import VueLetterAvatar from "vue-letter-avatar";
Vue.use(VueLetterAvatar);

export default {
  data() {
    return {
      currentAppid: localStorage["appid"],
      currentAppName: localStorage["appname"] || "",
      dataLists: []
    };
  },
  methods: {
    // 获取 appid 列表
    getAppList() {
      let thiz = this;
      goPost(
        "AppList",
        {},
        data => {
          thiz.setDataList(data.records);
        },
        d => {
          console.log(d);
        }
      );
    },
    // 赋值
    setDataList(data) {
      if (data) {
        for (var i in data) {
          const app = data[i];
          app["url"] =
            app["url"] +
            "?appname=" +
            app["name"] +
            "&appid=" +
            app["id"] +
            "&sso_token=" +
            getToken();
        }
        this.dataLists = data;
      }
      // choose default
      if (this.currentAppid) {
        for (let v of this.dataLists) {
          if (this.currentAppid == v.id) {
            this.currentAppName = v.name;
            this.setAppid(v.id, v.name);
            break;
          }
        }
      }
    },
    // 选择一个 appid
    changeCid(ele) {
      this.setCid(
        ele.target.getAttribute("data-id"),
        ele.target.getAttribute("data-name")
      );
    },
    // 设置 appid
    setAppid(id, name) {
      localStorage["appid"] = this.currentAppid = id;
      localStorage["appname"] = this.currentAppName = name;
    }
  },
  beforeMount() {
    this.getAppList();
  }
};
</script>

<style scoped>
.app-width {
  width: 900px;
}
.app-style {
  border-radius: 5px;
  display: inline-block;
  margin: 10px;
  text-align: center;
}
.uk-drop {
  position: absolute;
  z-index: 1020;
  box-sizing: border-box;
  width: 765px;
}
.uk-link {
  cursor: pointer;
}
</style>
