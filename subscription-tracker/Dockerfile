FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV DB_PATH=/data/subscriptions.sqlite
ENV HOST=0.0.0.0
ENV PORT=4321

COPY package.json package-lock.json* ./
RUN npm install --omit=dev

COPY . .
RUN npm run build

EXPOSE 4321

CMD ["node", "./dist/server/entry.mjs"]
