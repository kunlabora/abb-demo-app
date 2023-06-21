import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class BooksController extends Controller {
  @service store;
  @service router;

  @action
  async createBook(title, isbn, authorId) {
    const record = await this.store.createRecord('book', {
      title: title,
      isbn: isbn,
      author: await this.getAuthorById(authorId),
    });
    await record.save();
    this.router.transitionTo('books');
  }
  async getAuthorById(id) {
    return this.store.peekRecord('author', id);
  }
}
