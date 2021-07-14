import {
  addNewUser,
  userLogin,
  makePost,
  makeComment,
  makeReply,
  getPosts,
  getPost,
  likePost,
  unlikePost,
} from '../controllers/controller';

const routes = (app) => {
  app.route('/be/getPosts/:page?').get(getPosts);
  app.route('/be/getPost/:id').get(getPost);
  app.route('/be/userLogin').post(userLogin);
  app.route('/be/createAccount').post(addNewUser);
  app.route('/be/newPost').post(makePost);
  app.route('/be/likePost').post(likePost);
  app.route('/be/unlikePost').post(unlikePost);
  app.route('/be/newComment').post(makeComment);
  app.route('/be/newReply').post(makeReply);

  app
    .route('/u/:userID')
    .get((req, res) =>
      res.send(`get request successful: ${req.params.userID}`)
    );
};

export default routes;
