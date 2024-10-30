FROM node:22.9.0-slim

RUN npm install -g @nestjs/cli

RUN mkdir /nestjs-grabpass
WORKDIR /nestjs-grabpass
