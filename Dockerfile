FROM oven/bun:latest as base
WORKDIR /usr/src/app

FROM base as install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM base as prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

ENV NODE_ENV production
RUN bun run build

FROM base as release
COPY --from=prerelase /app/.next/standalone ./
COPY --from=prerelease /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD HOSTNAME="0.0.0.0" bun run server.js
