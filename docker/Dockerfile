# Stage 1: development
FROM node:20 AS development

RUN apt-get update && apt-get install -y openssl=3.2.0

# create app directory
WORKDIR /app

# copy package.json and package-lock.json
COPY --chown=node:node package*.json ./

# install dependencies
RUN npm ci

# copy source code
COPY --chown=node:node . .

# Generate Prisma client
RUN npm run prisma:generate

# Use the node user instead of root
USER node

#------------------------------------------------------------
# Stage 2: build for production
FROM node:20-alpine AS builder

WORKDIR /app

COPY --chown=node:node package*.json ./

# The build process needs access to NestJS CLI, which is a dev dependency.
COPY --chown=node:node --from=development /app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV=production

# Install production dependencies overriding the previously copied node_modules:
RUN npm ci --only=production && \
    npm cache clean --force

USER node

# -----------------------------------------------------------
# Stage 3: production
FROM node:20-alpine AS production

WORKDIR /

COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist ./dist

# expose port 3000
EXPOSE 3000

# run the app
CMD ["npm", "run", "start:prod"]