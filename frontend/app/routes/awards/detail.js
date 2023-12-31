import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AwardsRoute extends Route {
  @service store;

  async model(params) {
    return this.store.findRecord('award', params.award_id);
  }
}
