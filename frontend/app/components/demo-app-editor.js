import Component from '@glimmer/component';
import { Schema } from '@lblod/ember-rdfa-editor';
import { action } from '@ember/object';
import {
  block_rdfa,
  doc,
  hard_break,
  horizontal_rule,
  invisible_rdfa,
  paragraph,
  repaired_block,
  text,
} from '@lblod/ember-rdfa-editor/nodes';
import { tracked } from '@glimmer/tracking';
import {
  tableKeymap,
  tableNodes,
  tablePlugin,
} from '@lblod/ember-rdfa-editor/plugins/table';
import { link, linkView } from '@lblod/ember-rdfa-editor/plugins/link';
import {
  bullet_list,
  list_item,
  ordered_list,
} from '@lblod/ember-rdfa-editor/plugins/list';
import { placeholder } from '@lblod/ember-rdfa-editor/plugins/placeholder';
import { heading } from '@lblod/ember-rdfa-editor/plugins/heading';
import { blockquote } from '@lblod/ember-rdfa-editor/plugins/blockquote';
import { code_block } from '@lblod/ember-rdfa-editor/plugins/code';
import { image } from '@lblod/ember-rdfa-editor/plugins/image';
import { inline_rdfa } from '@lblod/ember-rdfa-editor/marks';
import {
  em,
  strikethrough,
  strong,
  subscript,
  superscript,
  underline,
} from '@lblod/ember-rdfa-editor/plugins/text-style';

export default class DemoAppEditorComponent extends Component {
  schema = new Schema({
    nodes: {
      doc,
      paragraph,

      repaired_block,

      list_item,
      ordered_list,
      bullet_list,
      placeholder,
      ...tableNodes({ tableGroup: 'block', cellContent: 'block+' }),
      heading,
      blockquote,

      horizontal_rule,
      code_block,

      text,

      image,

      hard_break,
      invisible_rdfa,
      block_rdfa,
      link: link(this.linkOptions),
    },
    marks: {
      inline_rdfa,
      em,
      strong,
      underline,
      strikethrough,
      subscript,
      superscript,
    },
  });
  @tracked
  controller;

  @tracked plugins = [tablePlugin, tableKeymap];
  @tracked nodeViews = (controller) => {
    return {
      link: linkView(this.linkOptions)(controller),
    };
  };

  get linkOptions() {
    return {
      interactive: true,
    };
  }
  @action
  onEditorInit(controller) {
    this.controller = controller;
    const content = this.controller.htmlContent;
    this.controller.setHtmlContent('<p>Hello World</p>');
  }
}
