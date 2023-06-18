import {tracked} from "@glimmer/tracking";
import Controller from "@ember/controller";
import {service} from "@ember/service";
import {action} from "@ember/object";

export default class AwardsController extends Controller {
  @service store;

  @tracked year;
  @tracked awards = this.model;

  @action
  async filterData() {
    this.awards = await this.store.query('award', {year: this.year});
  }
}
