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

RUN apt-get update && apt-get install -y curl && \
  curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb -o cloudflared.deb && \
  dpkg -i cloudflared.deb && \
  rm cloudflared.deb && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

COPY --from=prerelease /usr/src/app/public ./public
COPY --from=prerelease /usr/src/app/.next/standalone ./
COPY --from=prerelease /usr/src/app/.next/static ./.next/static

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000
ENV PORT 3000

ENTRYPOINT ["/entrypoint.sh"]
