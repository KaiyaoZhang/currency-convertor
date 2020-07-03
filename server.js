const app = require('./app');

const port = process.env.PORT = 8001 || 3001;

const server = app.listen(port, '127.0.0.1', () => {
    console.log(`App is running on port ${port}`);
});