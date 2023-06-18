import Component from '@glimmer/component';

export default class AwardFilterComponent extends Component {
  get results() {
    let { awards, query } = this.args;
    console.log(this.args);

    if (query) {
      awards = awards.filter((award) => award.year === query);
    }

    return awards;
  }
}
