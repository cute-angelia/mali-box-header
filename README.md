# boxheader

best mali

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

## Install

```
npm i mali-box-header --save
```

## Usage

```
// BoxHeader
import BoxHeader from "mali-box-header"
import VueLetterAvatar from "vue-letter-avatar"
Vue.use(BoxHeader)
Vue.use(VueLetterAvatar)


// use with need
1. auth-redirect.vue insert `<box-header />`
2. layout/index.vue insert `<box-header />`
3. permission.js 处理登陆逻辑

```

服务端配置：

```
// 配置三个头部地址
// SY_APPLICATION_ENV ： 环境
// SY_APPLICATION_BOX_API_URL ： box api 地址
// SY_APPLICATION_BOX_URL ： box 后台 地址
// SY_APPLICATION_LOGIN_URL ： 登陆地址
// SY_APPLICATION_API_URL : 自身 api 地址


header 会自动写入到 localstage

app_env
app_box_api_url
app_box_url


```

## Publish

npm run build

## Contributing

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2020 mali
