import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class AuthorsController extends Controller {
  @service store;
  @service router;

  @action
  async createAuthor(firstName, lastName) {
    const record = await this.store.createRecord('author', {
      firstName: firstName,
      lastName: lastName,
    });
    try {
      await record.save();
    } catch (e) {
      alert('Name fields cannot be empty!');
      this.store.deleteRecord(record);
      return;
    }
    this.router.transitionTo('books.new');
  }
}
