FROM node

COPY . . 
COPY ./.env.prod ./.env

RUN npm ci
RUN npm run build
RUN npx prisma migrate deploy


CMD ["npm", "run", "start:prod"]