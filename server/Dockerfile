FROM node:20
RUN npm --version

WORKDIR /app

COPY package.json .
RUN npm install --omit=dev

COPY src/ ./src/
COPY index.js .

EXPOSE 6000

CMD ["npm", "run", "start"]
