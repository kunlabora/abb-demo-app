import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class BookAdapter extends JSONAPIAdapter {
  namespace = 'resources';
}
