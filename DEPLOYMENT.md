# 美股智能分析选股系统 - 部署指南

## 项目概述

本项目是一个基于 Vite + React + TypeScript + Express + MySQL 的全栈美股智能分析选股系统，提供实时股票数据、技术指标分析和条件选股功能。

## 技术栈

**前端**：Vite、React 19、TypeScript、TailwindCSS、Radix UI、TanStack Query、tRPC、Lightweight Charts

**后端**：Express、tRPC、Drizzle ORM、MySQL、WebSocket

**部署**：Docker、GitHub Actions

## 本地开发

### 环境要求

- Node.js 22.x
- pnpm 10.4.1+
- MySQL 数据库（可选）

### 安装依赖

```bash
pnpm install
```

### 配置环境变量

创建 `.env` 文件并配置以下环境变量：

```bash
# 数据库配置（可选）
DATABASE_URL=mysql://user:password@localhost:3306/stock_analysis

# OAuth 配置（可选）
OAUTH_SERVER_URL=
VITE_APP_ID=

# JWT 密钥
JWT_SECRET=your-secret-key

# 所有者 OpenID（可选）
OWNER_OPEN_ID=

# API 密钥（用于五档盘口数据）
ALPHA_VANTAGE_API_KEY=your-alpha-vantage-key
POLYGON_IO_API_KEY=your-polygon-io-key

# Forge API（可选）
BUILT_IN_FORGE_API_URL=
BUILT_IN_FORGE_API_KEY=

# 分析工具（可选）
VITE_ANALYTICS_ENDPOINT=
VITE_ANALYTICS_WEBSITE_ID=
```

### 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
pnpm build
```

### 启动生产服务器

```bash
pnpm start
```

## Docker 部署

### 构建 Docker 镜像

```bash
docker build -t meigu3:latest .
```

### 运行 Docker 容器

```bash
docker run -d \
  --name meigu3 \
  -p 3000:3000 \
  -e DATABASE_URL="mysql://user:password@host:3306/stock_analysis" \
  -e JWT_SECRET="your-secret-key" \
  -e ALPHA_VANTAGE_API_KEY="your-key" \
  -e POLYGON_IO_API_KEY="your-key" \
  meigu3:latest
```

## GitHub Actions 自动部署

本项目已配置 GitHub Actions 工作流，当代码推送到 `main` 分支时会自动触发构建和部署。

### 配置步骤

1. **在 GitHub 仓库中设置 Secrets**

   进入仓库的 Settings > Secrets and variables > Actions，添加以下 secrets：

   - `DEPLOY_KEY`: SSH 私钥（用于连接服务器）
   - `DEPLOY_HOST`: 部署服务器地址
   - `DEPLOY_USER`: 服务器用户名
   - `DEPLOY_PATH`: 部署路径

2. **推送代码触发部署**

   ```bash
   git add .
   git commit -m "Update application"
   git push origin main
   ```

3. **手动触发部署**

   在 GitHub 仓库的 Actions 页面，选择 "Deploy to Manus.space" 工作流，点击 "Run workflow"。

### 工作流说明

GitHub Actions 工作流会执行以下步骤：

1. 检出代码
2. 设置 Node.js 22 环境
3. 安装 pnpm
4. 安装项目依赖
5. 构建应用
6. 上传构建产物
7. 部署到服务器（需要配置服务器信息）

## 部署到 Manus.space

### 方法一：使用 Manus Web 界面

1. 在 Manus 中创建新任务
2. 提供 GitHub 仓库 URL：`https://github.com/JohnnyTenkyo/meigu3`
3. Manus 会自动克隆、构建和部署项目
4. 点击 "Publish" 按钮发布到 manus.space

### 方法二：使用 Docker 部署

1. 构建 Docker 镜像
2. 推送到容器注册表
3. 在服务器上拉取并运行容器

### 方法三：使用传统服务器部署

1. 在服务器上克隆仓库
2. 安装依赖并构建
3. 使用 PM2 或 systemd 管理进程

```bash
# 使用 PM2
pm2 start dist/index.js --name meigu3

# 查看日志
pm2 logs meigu3

# 重启应用
pm2 restart meigu3
```

## 环境变量说明

### 必需的环境变量

- `NODE_ENV`: 运行环境（development/production）

### 可选的环境变量

- `DATABASE_URL`: MySQL 数据库连接字符串（如果不配置，自选股等功能将无法使用）
- `JWT_SECRET`: JWT 签名密钥（用于用户认证）
- `ALPHA_VANTAGE_API_KEY`: Alpha Vantage API 密钥（用于获取五档盘口数据）
- `POLYGON_IO_API_KEY`: Polygon.io API 密钥（用于获取五档盘口数据）
- `OAUTH_SERVER_URL`: OAuth 服务器地址（如果使用 OAuth 登录）
- `VITE_APP_ID`: 应用 ID
- `OWNER_OPEN_ID`: 所有者 OpenID（用于设置管理员权限）

## 功能特性

### 核心功能

- **市场概览**：显示道琼斯、标普500、纳斯达克等主要指数
- **股票搜索**：支持搜索 239 只美股股票
- **股票详情**：K线图 + 多种技术指标
- **自选股管理**：收藏和管理自选股票
- **条件选股**：基于技术指标的智能选股

### 技术指标

- **黄蓝梯子指标**：蓝梯 EMA 24/23，黄梯 EMA 89/90
- **CD抄底指标**：基于 MACD 的买卖信号
- **买卖力道指标**：包含 ⚡ 和 💀 提醒
- **NX指标**：买卖信号统计
- **买卖动能指标**：基于五档盘口数据

### 时间周期

支持多种时间周期：1m, 3m, 5m, 15m, 30m, 1h, 2h, 3h, 4h, 1d, 1w, 1mo

## 数据库迁移

如果使用数据库功能，需要执行数据库迁移：

```bash
pnpm db:push
```

这会创建必要的数据库表结构。

## 故障排除

### 端口占用

如果 3000 端口被占用，应用会自动使用下一个可用端口（如 3001）。

### OAuth 警告

如果看到 "OAUTH_SERVER_URL is not configured" 警告，这是正常的。如果不使用 OAuth 登录功能，可以忽略此警告。

### 数据库连接失败

如果数据库连接失败，应用仍然可以运行，但自选股等需要数据库的功能将无法使用。

### API 密钥未配置

如果 Alpha Vantage 和 Polygon.io API 密钥未配置，买卖动能指标将无法显示实时数据。

## 性能优化建议

1. **启用 CDN**：将静态资源部署到 CDN
2. **启用 Gzip 压缩**：在 Nginx 或服务器配置中启用 Gzip
3. **配置缓存策略**：为静态资源设置合适的缓存头
4. **使用 PM2 集群模式**：提高并发处理能力

```bash
pm2 start dist/index.js -i max --name meigu3
```

## 监控和日志

### 应用日志

- 开发模式：日志输出到控制台
- 生产模式：建议配置日志收集工具（如 Winston、Pino）

### 性能监控

建议集成 APM 工具（如 New Relic、Datadog）进行性能监控。

## 安全建议

1. **使用 HTTPS**：在生产环境中始终使用 HTTPS
2. **设置强密码**：为 JWT_SECRET 使用强随机密码
3. **限制 CORS**：配置合适的 CORS 策略
4. **定期更新依赖**：定期运行 `pnpm update` 更新依赖
5. **环境变量保护**：不要将 `.env` 文件提交到 Git

## 支持和反馈

如有问题或建议，请在 GitHub 仓库中创建 Issue。

## 许可证

MIT License
