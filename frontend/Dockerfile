FROM node:20-alpine AS dev

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

#For dev, rewrite for production later 
EXPOSE 5173

CMD ["npm", "run", "dev"]