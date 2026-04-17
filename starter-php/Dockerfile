FROM php:8.3-cli-alpine

RUN apk add --no-cache bash curl \
  && curl -fsSL https://psysh.org/psysh -o /usr/local/bin/psysh \
  && chmod +x /usr/local/bin/psysh

WORKDIR /app

CMD ["tail", "-f", "/dev/null"]
