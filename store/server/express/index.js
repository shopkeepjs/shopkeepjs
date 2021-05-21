const { app } = require('./src/app');

const hostname = process.env.HOSTNAME || 'http://localhost';
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening: ${hostname}:${port}`);
});
