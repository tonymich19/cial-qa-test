FROM cypress/included:15.11.0

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

CMD ["npx", "cypress", "run"]