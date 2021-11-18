## ice 模板

> icework2.0 模板

## 使用

```bash
# 安装依赖
$ npm install

# 启动服务
$ npm start  # visit http://localhost:3333
```

ice 2.0 tsconfig 里面不能写注释，可能内部又重新读取了配置，写了注释会导致 tsconfig 配置失效

[More docs](https://ice.work/docs/guide/about).

# 注意

```
1.图片引入使用import的方式，一个是能优化打包，二同时能兼容vite和webpack的引入方式

vite模式下

当在 tsconfig.json 里设置选项 "jsx": "react-jsx" 时，会默认通过 esbuild.jsxInject 选项为每个组件文件注入代码 import React from 'react'，因此业务代码里不能再重复引入。
```
