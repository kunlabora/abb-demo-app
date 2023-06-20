import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class BooksController extends Controller {
  @service store;
  @service router;

  @action
  async createBook(title, isbn) {
    const record = await this.store.createRecord('book', {
      title: title,
      isbn: isbn,
    });
    await record.save();
    this.router.transitionTo('books');
  }
}
