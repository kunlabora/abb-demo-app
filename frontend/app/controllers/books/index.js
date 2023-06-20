import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class BooksController extends Controller {
  @service store;

  @action
  async deleteBook(id) {
    const book = await this.store.peekRecord('book', id);
    await book.destroyRecord({});
  }
}
