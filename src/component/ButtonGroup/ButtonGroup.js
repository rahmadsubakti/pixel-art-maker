import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { CompactPicker } from 'react-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faUndoAlt, faRedoAlt, faEraser, faDownload } from '@fortawesome/free-solid-svg-icons';
import './btn-group.css';

export class ButtonGroup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {background: '#fff', showPalette: false}
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
		return (
			<div className="btn-group">

            	<button title="New Art" onClick={this.props.new}>
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
            	
            	<button title="Clear Grid" onClick={this.props.clearGrid}>
            		<FontAwesomeIcon icon={faEraser} />
            	</button>
            	
            	<button title="Undo" disabled={true}>
            		<FontAwesomeIcon icon={faUndoAlt} />
            	</button>
            	
            	<button title="Redo" disabled={true}>
            		<FontAwesomeIcon icon={faRedoAlt} />
            	</button>
            	
            	<button title="Download to your Computer" onClick={this.props.saveImage}>
            		<FontAwesomeIcon icon={faDownload} />
            	</button>

          	</div>
        )
	}
}