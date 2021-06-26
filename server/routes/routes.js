import {
  addNewUser,
  verifyUser,
  makePost,
  makeComment,
  makeReply,
  getPosts,
  getPost,
} from '../controllers/controller';

const routes = (app) => {
  app.route('/be/verifyAccountInfo').get(verifyUser);
  app.route('/be/getPosts/:page?').get(getPosts);
  app.route('/be/getPost/:id').get(getPost);
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
