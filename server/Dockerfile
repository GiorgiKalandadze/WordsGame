FROM node:20
WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
COPY src/ ./src/
COPY ../client/build/ ./public/
COPY index.js .
ENV PORT 8080
EXPOSE 8080
CMD ["npm", "run", "start"]
