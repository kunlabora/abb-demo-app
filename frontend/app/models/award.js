import Model, { attr } from '@ember-data/model';

export default class AwardModel extends Model {
  @attr('string') category;
  @attr('number') year;
  @attr('string') university;
  @attr('string') motivation;
  @attr laureate;
}
