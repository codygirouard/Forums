import express from 'express';
import routes from './routes/routes';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';

const PORT = process.env.PORT || 5000;

const app = express();

//mongoose connection to mongodb
mongoose.Promise = global.Promise;
mongoose
  .connect(
    'mongodb+srv://forums:cQxJICyIPTJ398LB@forums.2w49u.mongodb.net/forumsDB?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log('Connected to Database Successfully'))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(express.static(path.join(__dirname, '../client/build')));

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
