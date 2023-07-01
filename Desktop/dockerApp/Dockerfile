FROM node:18

WORKDIR /dockerApp
COPY package*.json package-lock.json ./
RUN npm ci --only=production
COPY . .
ENV PORT 3000
EXPOSE $PORT

CMD [ "node", "index.js"]