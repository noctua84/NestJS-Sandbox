# Stage 1: Build the app
FROM node:18 AS builder

WORKDIR /app

# copy package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# copy source code
COPY . .

# build the app
RUN npm run build

#------------------------------------------------------------
# Stage 2: Run the app
FROM node:18-slim

WORKDIR /app

# copy package.json and package-lock.json
COPY package*.json ./

RUN npm install --only=production

# copy build from stage 1
COPY --from=builder /app/dist ./dist

# expose port 3000
EXPOSE 3000

# run the app
CMD ["npm", "run", "start:prod"]