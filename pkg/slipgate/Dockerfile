FROM node:23-bookworm

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN node --run build

EXPOSE 3000
CMD ["node", "--run", "start"] 
