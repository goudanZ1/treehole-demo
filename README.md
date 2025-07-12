# treehole-demo

## 开发环境搭建

1. 安装 [Node.js](https://nodejs.org/zh-cn/download) (v22) 和 npm

2. 将项目 clone 到本地：

   ```shell
   git clone https://github.com/goudanZ1/treehole-demo
   cd treehole-demo
   ```

3. 安装 pnpm 包管理器并配置国内镜像源：

   ```shell
   npm install -g pnpm
   pnpm config set registry https://registry.npmmirror.com
   ```

4. 安装依赖：

   ```shell
   pnpm install
   ```

5. 启动开发服务器：

   ```shell
   pnpm dev
   ```

6. 在浏览器中访问 <http://localhost:3000> 即可查看运行效果，开发时在本地编辑代码并保存后会同步进行热更新

## Challenges

（你可以自己动手模仿着修修改改，也完全可以使用 AI，没有标准答案，也可以不按照我的提示走，你觉得达到要求了就行~）

1. 老板：小明啊，我看 [北大官网《燕园特写》栏目](https://www.pku.edu.cn/close-up_pku2025.html) 上最新的一张题为 “蘸碧青毫书水篆 跃金湖光印波章” 的照片挺好看的，要不你把它设成咱们网站的背景图吧~
   
   > 在目前的实现中，背景图的源地址是在 `src/app/layout.js` 中设置的。如果你希望新的背景图来自本地（也就是说你下载了那张图），可以把新的图片放在 `public/` 目录下，在 `url` 中只需给出 `public/` 下的相对路径，如 `/background.jpg`；如果你希望新的背景图来自其他网站，那么需要在 `url` 里给出完整的 url，如 `http://i1.hdslb.com/bfs/garb/item/d2de77bf182351a5dd0d1b097c372a6c90434a50.png`

2. 同学：现在好像无论我自己有没有收藏（关注）一个树洞，它的收藏数旁边都是空心的五角星诶。能不能在我自己收藏了的时候显示实心的五角星呢？
   
   > 只需要关注 `src/components/card/cardbadges.js` 里的 `LikeBadge` 组件即可。现在它接收了一个多余的 `isLike` prop（参数），只需要判断在 `isLike` 为 true 时使用实心的图标 `<Icon name="star-full" />`。

3. 甲方：如果在小屏幕上看，好像导航栏那一行东西会显得很拥挤。能不能试着在小屏幕上把这些组件分成两行呢？
   
   > 在 `src/app/layout.js` 中已经为你设置了 `<main className="pt-44 md:pt-32">`，意思是在中等以上大小的屏幕，`pt`（padding-top，上面的内边距）会减小到 32 个单位，也就是说在 sm 及以下大小的屏幕上 pt 会加大，主要页面下移，为导航栏留出了更多空间。说这些是为了告诉你 `md:pt-32` 在中等以上大小的屏幕会覆盖 `pt-44` 的样式。你只需关注 `src/components/nav/nav.js` 中 `Nav` 组件的 “导航链接和用户名输入框” 部分，这部分有两个直接 `div` 子节点，能不能使他们在较小的屏幕上改为竖着排列呢？

## 勇者，请开始你的旅程吧！










































<div style="color: transparent">
在上一次 commit 里有我个人的解答 :）
</div>
