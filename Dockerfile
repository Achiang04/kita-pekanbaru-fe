# Step 1: Use official Node.js image as base
FROM node:18-alpine AS build

# Step 2: Set working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and yarn.lock for caching dependencies
COPY package.json yarn.lock ./

# Step 4: Install dependencies using Yarn
RUN yarn install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the Next.js app
RUN yarn build

# Step 7: Use a smaller image for production environment
FROM node:18-alpine

# Step 8: Set working directory inside the container
WORKDIR /app

# Step 9: Copy the build output from the build stage
COPY --from=build /app ./

# Step 10: Expose the port Next.js will run on
EXPOSE 3000

# Step 11: Run the app in production mode
CMD ["yarn", "start"]
