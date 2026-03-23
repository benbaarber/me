FROM node:22-alpine AS build

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
RUN corepack enable && yarn install --immutable

COPY . .
RUN yarn build

FROM node:22-alpine

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
RUN corepack enable && yarn workspaces focus --production

COPY --from=build /app/dist ./dist

EXPOSE 8080

CMD ["node", "dist/main.js"]
