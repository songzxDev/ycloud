# ycloud

## 来自友云采前端团队的为什么要上云（why cloud）ui 框架

开发须知：

1. 引用lodash代码时请通过修改 util/lodash.js直接引入lodash对应的包的方式来引入
代码中其他地方需要引入lodash 都通过
```
import _ from '@/util/lodash'
```
的方式来引入，需要的包按需引入

2. 目录结构请参考demo文件夹，组件js和html都请命名成index.xx

3. ko通用指令目前是写在yonyouyc/ko-bindinghander下有需求向songhlc@yonyou.com提


