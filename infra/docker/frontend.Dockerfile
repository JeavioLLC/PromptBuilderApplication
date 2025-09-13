# Frontend image (Vite dev server)
FROM node:20-alpine

WORKDIR /app/frontend

COPY frontend/package*.json ./
COPY frontend/tsconfig*.json ./
COPY frontend/vite.config.ts ./

RUN npm ci || npm i

COPY frontend/. .

EXPOSE 3000

CMD ["npm", "run", "dev", "--silent", "--", "--host"]


