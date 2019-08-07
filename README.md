## 前端组免试题【贪吃蛇】
### duang~ duang~ duang~
学弟学妹们，这个是前端组免试题的仓库。没有做出来也不要气馁，一切的学习也才刚刚开始，还有很多的时间可以学习。做出题目了也切勿沾沾自喜，因为我们要学习的东西还很多。免试题的答案和原题都已经放在了这个仓库中，大家可以来参考一下。

### 为什么和我之前看的目录结构不太一样

对的。如果没猜错你现在应该是在代码的`master`分支上，`master`分支上的代码已经使用`webpack`模块化了(传说中的`前端工程化`，当然现在只是实现了`模块化`)，原来的题目在`practice`分支上，如果不习惯这样的代码可以切到`raw`分支查看答案。

我不懂什么叫分支 ~~作为一个程序员怎么能不懂git和github呢~~ 

### 我该怎么运行`master`分支上的这份代码

似乎我直接点击 `./src/index.html` 并不能运行代码。

你需要搭建一个环境

1. 首先下载并安装 [node.js](https://nodejs.org/zh-cn/) 和 [yarn](https://yarn.bootcss.com/) 
2. 打开命令行并确保当前的路径是这个项目
3. 运行 `yarn install` 下载依赖
4. 运行 `yarn dev` 这时会自动打开一个浏览器，你就可以看到预览的效果了

### 我想看最终的文件怎么办

可能你不想仅限于预览，这时候只需要运行 `yarn build` 。
`webpack` 将会自动打包`./src`目录下的资源文件，在`./dist`目录下生成`index.html`、`main.css`、`main.js`三个文件。

### 如果还有其他什么问题，欢迎提`issue`或`QQ上小窗我`