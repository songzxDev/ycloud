开发须知：

1. 引用lodash代码时请通过修改 util/lodash.js直接引入lodash对应的包的方式来引入
代码中其他地方需要引入lodash 都通过
```
import _ from '@/util/lodash'
```
的方式来引入，需要的包按需引入

2. 目录结构请参考demo文件夹，组件js和html都请命名成index.xx

3. ko通用指令目前是写在yonyouyc/ko-bindinghander下有需求向songhlc@yonyou.com提

4. 所有鼠标键盘交互事件使用handle开头

5. 组件维护信息开头注释
  ```
  /*
  * @author: songhlc
  * @date: 2017-10-23
  * @description: 下拉组件
  * */
  ```
  
  依赖第三方包：knockout,jquery,ko-bindinghandler
