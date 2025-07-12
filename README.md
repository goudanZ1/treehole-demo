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
