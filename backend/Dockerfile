# --- build stage ---
FROM node:20-alpine

# 設置工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製其他檔案
COPY . .

# 暴露端口
EXPOSE 5001

# 啟動服務
CMD ["npm", "start"]