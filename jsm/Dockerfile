FROM node:14

ARG USERNAME=node

WORKDIR /home/$USERNAME

RUN apt update && npm install -g npm@latest

RUN curl https://getmic.ro | bash
RUN mv micro /usr/bin

# https://pnpm.io/installation
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

USER $USERNAME
