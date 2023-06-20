import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class BooksController extends Controller {
  @service store;

  @action
  async createBook(title, isbn) {
    const record = await this.store.createRecord('book', {
      title: title,
      isbn: isbn,
    });
    await record.save();
  }

  @action
  async deleteBook(id) {
    const book = await this.store.peekRecord('book', id);
    await book.destroyRecord({});
  }
}
