import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class BookRoute extends Route {
  @service store;

  async model() {
    return this.store.findAll('book', {
      include: 'author',
    });
  }
}
