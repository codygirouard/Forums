import {
  addNewUser,
  verifyUser,
  makePost,
  makeComment,
  makeReply,
  getPosts,
} from '../controllers/controller';

const routes = (app) => {
  app.route('/be/verifyAccountInfo').get(verifyUser);
  app.route('/be/getPosts').get(getPosts);
  app.route('/be/createAccount').post(addNewUser);
  app.route('/be/newPost').post(makePost);
  app.route('/be/newComment').post(makeComment);
  app.route('/be/newReply').post(makeReply);

  app
    .route('/u/:userID')
    .get((req, res) =>
      res.send(`get request successful: ${req.params.userID}`)
    );
};

export default routes;
