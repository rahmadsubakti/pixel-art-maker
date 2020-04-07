import React from 'react';
import { ButtonGroup } from 'component/ButtonGroup/ButtonGroup';
import './control.css'

export class ControlGroup extends React.Component {
	render() {
		return (
			<div className="control-container">

				<ButtonGroup 
					getColor={this.props.getColor}
					clearGrid={this.props.clearGrid}
					saveImage={this.props.saveImage} 
				/>

          		<div className="name-container">
            		<input type="text" defaultValue="Untitled" />
          		</div>
        	</div>
		)
	}
}