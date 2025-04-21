# --- build stage ---

# 基礎鏡像
FROM node:20-alpine AS build-stage
# 工作目錄
WORKDIR /app
# 複製 package.json 和 package-lock.json
COPY package*.json .
# 安裝依賴
RUN npm install
# 複製其他文件
COPY . .
# 執行 build
RUN npm run build

# --- production stage ---
FROM node:20-alpine AS production-stage
# 工作目錄
WORKDIR /app
# 複製 build 結果
COPY --from=build-stage /app/dist ./dist
# 安裝生產依賴
RUN npm install -g serve
# 暴露端口
EXPOSE 3000
# 執行預覽
CMD ["serve", "-s", "dist"]