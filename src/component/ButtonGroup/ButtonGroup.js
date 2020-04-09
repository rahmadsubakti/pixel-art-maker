import React from 'react';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';
import { CompactPicker } from 'react-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faUndoAlt, faRedoAlt, faEraser, faDownload } from '@fortawesome/free-solid-svg-icons';
import './btn-group.css';

export class ButtonGroup extends React.Component {
	constructor(props) {
		super(props);
		//this.state = {background: this.props.currentColor, showPalette: false}
		this.state = {background: '#333333', showPalette: false}
		this.togglePalette = this.togglePalette.bind(this);
	}

	changeColor(color) {
		this.setState({background: color.hex, showPalette: false})
		this.props.getColor(color.hex);
	}

	togglePalette(e) {
		this.setState({showPalette: !this.state.showPalette})
	}

	render() {
		const color = {background: this.state.background}
		const { newArt, clearGrid, isUndo, handleUndo, isRedo, handleRedo, saveImage } = this.props;
		return (
			<div className="btn-group">

            	<button title="New Art" onClick={newArt}>
            		<FontAwesomeIcon icon={faFile} />
            	</button>

            	<div className="color-change">
            		<div className="color-palette">
            			{this.state.showPalette &&
            				<OutsideClickHandler onOutsideClick={this.togglePalette}> 
            					<CompactPicker 
            						color={this.state.background}
            						onChange={this.changeColor.bind(this)} 
            					/>
            				</OutsideClickHandler>
            			}
            		</div>
            		<button title="Change Color" onClick={this.togglePalette}>
            			<div className="color" style={color}></div>
            		</button>
            	</div>
            	
            	<button title="Clear Grid" onClick={clearGrid}>
            		<FontAwesomeIcon icon={faEraser} />
            	</button>
            	
            	<button title="Undo" onClick={handleUndo} disabled={isUndo}>
            		<FontAwesomeIcon icon={faUndoAlt} />
            	</button>
            	
            	<button title="Redo" onClick={handleRedo} disabled={isRedo}>
            		<FontAwesomeIcon icon={faRedoAlt} />
            	</button>
            	
            	<button title="Download to your Computer" onClick={saveImage}>
            		<FontAwesomeIcon icon={faDownload} />
            	</button>

          	</div>
        )
	}
}

function hexColorPropType(props, propName, componentName) {
	const value = props[propName];

	if (!value) {
		return new Error('Require value')
	}

	if (typeof value !== 'string' || value[0] !== '#') {
		return new Error(
				`Invalid prop ${propName} supplied to ${componentName}.
				Prop value must be a string hex color code`
			)
	}
	return null
}

ButtonGroup.propTypes = {
	newArt: PropTypes.func.isRequired,
	clearGrid: PropTypes.func.isRequired,
	isUndo: PropTypes.bool.isRequired,
	handleUndo: PropTypes.func.isRequired,
	isRedo: PropTypes.bool.isRequired,
	handleRedo: PropTypes.func.isRequired,
	saveImage: PropTypes.func.isRequired,
	currentColor: hexColorPropType,
}