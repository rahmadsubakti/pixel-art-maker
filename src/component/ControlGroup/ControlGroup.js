import React from 'react';
import { ButtonGroup } from 'component/ButtonGroup/ButtonGroup';
import './control.css'

export class ControlGroup extends React.Component {
	render() {
		return (
			<div className="control-container">

				<ButtonGroup 
					new={this.props.new}
					getColor={this.props.getColor}
					clearGrid={this.props.clearGrid}
					isUndo={this.props.isUndo}
					handleUndo={this.props.handleUndo}
					isRedo={this.props.isRedo}
					handleRedo={this.props.handleRedo}
					saveImage={this.props.saveImage}
				/>

          		<div className="name-container">
            		<input type="text" value={this.props.name} onChange={this.props.changeName} />
          		</div>
        	</div>
		)
	}
}