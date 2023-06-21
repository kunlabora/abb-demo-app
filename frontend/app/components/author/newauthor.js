import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class NewAuthorComponent extends Component {
  @tracked firstName;
  @tracked lastName;

  @action
  createAuthor() {
    this.args.createAuthor(this.firstName, this.lastName);
  }
}
