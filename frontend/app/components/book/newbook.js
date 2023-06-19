import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class NewBookComponent extends Component {
  @tracked title;
  @tracked isbn;

  @action
  createBook() {
    this.args.createBooks(this.title, this.isbn);
  }
}
