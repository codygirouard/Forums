import express from 'express';
import routes from './routes/routes';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 3001;

const app = express();

//mongoose connection to mongodb
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/forumsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app);

app.get('/', (req, res) => {
  res.send(`Node and express server running on port ${PORT}`);
});

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
