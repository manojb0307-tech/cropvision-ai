FROM node:20-slim

WORKDIR /app

# Install build dependencies for better-sqlite3 and sharp
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    libpng-dev \
    libjpeg-dev \
    && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .

# Build frontend
RUN npx vite build

EXPOSE 8787

CMD ["node", "server/server.js"]
