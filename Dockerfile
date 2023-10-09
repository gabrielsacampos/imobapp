FROM node

COPY . . 
COPY ./.env.prod ./.env

RUN npm ci
RUN npm run build
RUN npx prisma migrate deploy

RUN apt-get update && apt-get install -y redis-server

EXPOSE 6379

CMD ["npm", "run", "start:prod"]