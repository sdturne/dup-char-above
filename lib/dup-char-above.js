'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register the command that performs the duplicate action
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'dup-char-above:duplicate': () => this.duplicate()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  duplicate() {
    const editor = atom.workspace.getActiveTextEditor()
    if (editor) {
      // Get our current location in the buffer
      point = editor.getCursorBufferPosition();
      // If we have at least one line above us
      if (point.row > 0) {
        // Retrieve the text of the line above us
        lineAbove = editor.lineTextForBufferRow(point.row - 1);
        // If that line is long enough to have a character above us
        if (point.column < lineAbove.length) {
          // Extract that character
          char = lineAbove.charAt(point.column);
          // And insert it at the current cursor location
          editor.insertText(char);
        }
      }
    }
    return;
  }

};
