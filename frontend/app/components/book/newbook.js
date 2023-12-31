import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class NewBookComponent extends Component {
  @tracked title;
  @tracked isbn;
  authorId = this.args.authors[0]?.id;

  @action
  createBook() {
    this.args.createBooks(this.title, this.isbn, this.authorId);
  }

  @action
  selectAuthor(event) {
    this.authorId = event.target.value;
  }
}
