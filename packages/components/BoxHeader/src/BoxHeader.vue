<template>
  <div
    uk-sticky="media: 960"
    class="uk-navbar-container tm-navbar-container uk-sticky uk-sticky-fixed uk-active uk-sticky-below"
    style="position: fixed; top: 0px; width: 1280px;"
  >
    <div class="uk-container uk-container-expand">
      <nav class="uk-navbar">
        <div class="uk-navbar-left">
          <span uk-icon="icon: grid"></span>&nbsp;
          <div class="margin-right-20">
            <app-list></app-list>
          </div>
          <div class="margin-right-20">
            <!-- <cid-list></cid-list> -->
          </div>
        </div>
        <div class="uk-navbar-right"></div>
        <div class="uk-navbar-item uk-visible@m">
          <div v-if="isLogin">
            <span uk-icon="icon: user"></span>
            &nbsp;{{ username }} &nbsp;&nbsp;&nbsp;&nbsp;
            <a @click="logout" href="javascript:void(0);">
              <span uk-icon="icon: sign-out"></span>退出
            </a>
          </div>
          <div v-else>
            <a
              :href="loginUrl"
              class="uk-button uk-button-default tm-button-default ilogin"
              >登录</a
            >
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import parseuri from "parseuri";
import { setToken, removeToken, setUser, getUser } from "../../lib/auth";
import { goPost } from "../../lib/api";

import AppList from "./AppList.vue";

import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
UIkit.use(Icons);

export default {
  name: "BoxHeader",
  components: {
    AppList
  },
  data() {
    return {
      uid: null,
      env: "local",
      username: "",
      loginUrl: localStorage["app_login_url"] + "/#/login"
    };
  },
  methods: {
    isLogin() {
      return this.uid > 0;
    },
    logout() {
      //
      goPost(
        "SsoLogout",
        {},
        data => {
          removeToken();
          window.location.href = this.loginUrl;
        },
        () => {}
      );
      //window.location.href = this.loginUrl;
    }
  },
  mounted() {
    const parseuriz = parseuri(window.location.href);
    const token = parseuriz.queryKey.sso_token;
    const appid = parseuriz.queryKey.appid || localStorage["appid"];
    const appname = parseuriz.queryKey.appname;

    if (appid > 0) {
      // 获取菜单
      goPost(
        "menuListByPage",
        { app_id: appid },
        (data, msg) => {
          console.log(data.records);
          localStorage["appMenuList"] = JSON.stringify(data.records);
          // window.location.href = location.protocol + "//" + location.host;
        },
        () => {}
      );
    }

    // 跳转登陆成功
    if (token && token.length > 32) {
      setToken(token);

      goPost(
        "SsoAuthCheck",
        {},
        data => {
          if (data.id > 0) {
            let user = data;
            this.uid = user.id;
            this.username = user.username;

            if (appid) {
              localStorage["appid"] = appid;
            }

            if (appname) {
              localStorage["appname"] = appname;
            }

            setUser(JSON.stringify(data));
            window.location.href = location.protocol + "//" + location.host;
          } else {
            removeToken();
          }
        },
        error => {}
      );
    } else {
      let user = JSON.parse(getUser());
      if (user && user.id > 0) {
        this.uid = user.id;
        this.username = user.username;
      }
    }
  }
};
</script>

<style>
@import "./assets/css/uikit.min.css";
@import "./assets/css/theme.css";
</style>
