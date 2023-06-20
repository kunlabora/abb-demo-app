import EmberRouter from '@ember/routing/router';
import config from 'frontend/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('awards', function () {
    this.route('detail', { path: '/:award_id' });
  });
  this.route('books', function () {
    this.route('new');
  });
});
