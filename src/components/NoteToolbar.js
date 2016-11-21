import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Icon from '../components/Icon';

class NoteToolbar extends Component {
  static propTypes = {
    editMode: PropTypes.bool,
		note: PropTypes.object.isRequired,
		notebookId: PropTypes.string.isRequired,
		notebookTitle: PropTypes.string,
    toggleEditMode: PropTypes.func,
  };

  renderEditModeButton = () => {
    if (this.props.toggleEditMode) {
      return (
        <div
          onClick={this.props.toggleEditMode}
          className={classNames('osx-button', {active: this.props.editMode})}
        >
          <Icon iconName="pencil" />
        </div>
      );
    }
    return null;
  }

	renderTag(tag) {
		return (
			<span className="tag" key={tag}>
				{tag}
			</span>
		);
	}

  render() {
    const {
			note,
			notebookId,
			notebookTitle,
      title,
      toggleEditMode,
    } = this.props;
    return (
      <div className="note-toolbar">
				<div className="notebook">
					<Icon iconName="repo" />
					<span className="title">{notebookTitle}</span>
				</div>
				<div className="tags">
					<Icon iconName="tag" />
					{note.tags ? note.tags.map(tag => this.renderTag(tag)) : null}
					<input placeholder="Click to add tag" />
				</div>

        <div className="toolbar-items">
          {this.renderEditModeButton()}
          <div className="btn btn-toolbar">
            <Icon iconName="history" />
          </div>
          <div className="btn btn-toolbar">
            <Icon iconName="trashcan" />
          </div>
        </div>
      </div>
    );
  }

  handleInputChange = (event) => {
    const input = event.currentTarget;
    this.props.onChanging(input.value);
  }
}

export default NoteToolbar;
