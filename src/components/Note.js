import classNames from 'classnames';
import React, {Component, PropTypes} from 'react';

import Icon from '../components/Icon';
import MarkdownEditor from '../components/MarkdownEditor';
import TagBar from '../components/TagBar';
import NoteEditor from '../components/NoteEditor';

class Note extends Component {
  static propTypes = {
		editMode: PropTypes.bool,
    note: PropTypes.object.isRequired,
		notebook: PropTypes.object.isRequired,
		allTags: PropTypes.arrayOf(PropTypes.string).isRequired,
    updateNote: PropTypes.func.isRequired,
		addNoteTag: PropTypes.func.isRequired,
		removeNoteTag: PropTypes.func.isRequired,
  };

  render() {
    const {
			editMode,
			addNoteTag,
      note,
			notebook,
			allTags,
			removeNoteTag,
    } = this.props;
    return (
      <div className='note'>
        <TagBar
					addNoteTag={addNoteTag}
					notebookTitle={notebook.title}
					noteId={note.noteId}
					noteTags={note.tags}
					allTags={allTags}
					removeNoteTag={removeNoteTag}
        />
        <NoteEditor
          active={!note.isMarkdown}
          note={note}
          onContentChange={this.handleContentChange}
          onTitleChange={this.handleTitlChange}
        />
        <MarkdownEditor
          active={note.isMarkdown}
          editMode={editMode}
          note={note}
        />
      </div>
    );
  }

  handleTitlChange = (title) => {
    this.props.updateNote({
      ...this.props.note,
      title,
    });
  };

  handleContentChange = (content) => {
    const note = {
      ...this.props.note,
      content,
    };
    this.props.updateNote(note);
  };
}

function getAbstract(content) {
  const div = document.createElement('div');
  div.innerHTML = html;
  const text = div.textContext || div.innerText || '';
  return text.substring(0, 100);
}

function getThumbnail(content) {

}


export default Note;
