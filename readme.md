[![npm version](https://img.shields.io/npm/v/ycloud.svg)](https://www.npmjs.com/package/ycloud)
[![license](https://img.shields.io/npm/l/ycloud.svg)](https://www.npmjs.com/package/ycloud)
[![Build Status](https://api.travis-ci.org/yonyouyc/ycloud.png?branch=master)](https://api.travis-ci.org/yonyouyc/ycloud.png?branch=master)

# ycloud

[English](https://github.com/yonyouyc/ycloud/blob/master/readme-en.md)

ycloud 是友云采FED自研的一套基于knockoutjs 的开源UI组件库，主要服务于PC端的企业级Web应用。
- 高质量、功能丰富
- 友好的 API ，自由灵活地使用空间
- 符合友云采规范、细致、漂亮、统一的 UI
- 以表格为核心的丰富示例文档

## 说明
因内部管控需要，暂时不开放src下的源码。我们仍然会持续完善和改进ycloud框架，并在后续适当的时机重新开放源代码。请知悉，有疑问请通过邮件songhlc@yonyou.com联系我。
暂时源码迁移到公司内部git[http://git.yonyou.com/nccloud_yuncai/ycloud](http://git.yonyou.com/nccloud_yuncai/ycloud)之中。

## 相关链接

- 示例工程和文档
    - ycloud-admin [https://yonyouyc.github.io/ycloud-admin/dist/index.html#buyofferlist](https://yonyouyc.github.io/ycloud-admin/dist/index.html#buyofferlist)
    - document [http://ycloud.windknow.cc](http://ycloud.windknow.cc)

## 安装

```
yarn add ycloud
```
或者
```
npm install ylcoud -S

```
## 快速开始

### ES6

``` 
<html>
<head>
    <link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.bootcss.com/font-awesome/4.6.2/css/font-awesome.min.css" rel="stylesheet">
</head>
</html>
```


```
import 'ycloud/dist/ycloud.min.css'
import ko from 'knockout'
import ycloud from 'ycloud'

```

### UMD

```
<html>
<head>
    <link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.bootcss.com/font-awesome/4.6.2/css/font-awesome.min.css" rel="stylesheet">
    <link href="--pathto--/ycloud/dist/ycloud.min.css" rel="stylesheet">
    <script src="--pathto--/knockout.min.js"></script>
    <script src="--pathto--/ycloud/dist/ycloud.min.js"></script>
</head>
</html>
```


获取更多信息请访问我们的 [开发文档](https://github.com/yonyouyc/ycloud-document).

## 浏览器支持

现代浏览器，IE9+

## 开发说明

待补充

## 更新说明

待补充

## 参与贡献

待补充

## LICENSE

BSD

