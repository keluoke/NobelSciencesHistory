# NobelSciences - 诺贝尔自然科学奖历史全景解读应用

本应用是一个基于 React + TypeScript + Vite + Tailwind CSS 构建的现代科学史探索与实验模拟平台。100% 运行在客户端浏览器，无需任何后端服务器即可零成本部署。

---

## 🚀 部署到 Cloudflare Pages 详细指南

Cloudflare Pages 提供完全免费的托管服务（无限流量、全球 CDN 加速、免费 SSL 证书及自定义域名）。你可以选择以下任意一种方式完成部署：

---

### 方法一：通过 GitHub 仓库自动部署（推荐，代码推送自动更新）

1. **推送代码至 GitHub**：
   将本项目代码提交并推送到你的 GitHub 仓库中。

2. **登录 Cloudflare 控制台**：
   打开 [Cloudflare 仪表盘 (dash.cloudflare.com)](https://dash.cloudflare.com/) 并登录账号。

3. **创建 Pages 应用**：
   - 在左侧菜单点击 **Workers & Pages**（Workers 和 Pages）。
   - 点击 **Create application**（创建应用程序）。
   - 选择 **Pages** 选项卡，然后点击 **Connect to Git**（连接到 Git）。

4. **选择你的仓库**：
   授权 GitHub 访问权限并选中你刚创建的仓库，点击 **Begin setup**（开始设置）。

5. **配置构建参数**：
   - **Project name（项目名称）**：自定义（如 `nobel-sciences`）
   - **Production branch（生产分支）**：`main` 或 `master`
   - **Framework preset（框架预设）**：选择 `Vite`
   - **Build command（构建命令）**：`npm run build`
   - **Build output directory（输出目录）**：`dist`
   - *（可选）环境变量*：若 Node 版本提示过低，可添加环境变量 `NODE_VERSION` = `20`

6. **点击 Save and Deploy（保存并部署）**：
   等待 1 分钟左右，构建完成后 Cloudflare 将自动分配一个免费的专属域名（如 `https://nobel-sciences.pages.dev`）。

---

### 方法二：直接网页上传打包文件（最快捷，无需 Git）

如果你不想配置 Git 仓库，可以直接在本地编译后上传：

1. **本地打包**：
   在终端运行：
   ```bash
   npm run build
   ```
   打包完成后，项目根目录下会生成一个 `dist` 文件夹。

2. **网页直接上传**：
   - 打开 [Cloudflare 仪表盘](https://dash.cloudflare.com/) -> **Workers & Pages** -> **Create application**。
   - 选择 **Pages** -> 点击 **Upload assets**（上传资产）。
   - 输入项目名称（如 `nobel-sciences`）。
   - 将打包好的 `dist` 文件夹直接拖拽到网页上传区域中。
   - 点击 **Deploy site**（部署站点），即可秒级完成上线！

---

### 方法三：使用 Wrangler 命令行工具部署

如果你喜欢在终端使用 CLI 工具：

1. **安装并构建**：
   ```bash
   npm run build
   ```

2. **执行部署命令**：
   ```bash
   npx wrangler pages deploy dist --project-name=nobel-sciences
   ```
   首次使用时会弹出浏览器授权 Cloudflare 账号，授权完成后即可自动上传并生成在线访问链接。

---

## 📌 常见问题与注意事项

- **SPA 路由刷新 404**：项目中已包含 `public/_redirects` 配置文件（内容为 `/*  /index.html  200`），打包时会自动拷贝至 `dist` 目录，确保在任意二级页面刷新均能正常展示，不会报错。
- **自定义域名**：在 Cloudflare Pages 项目后台的 **Custom domains** 选项卡中，可以随时一键免费绑定你自己的独立域名并自动配置全球 HTTPS 证书。
