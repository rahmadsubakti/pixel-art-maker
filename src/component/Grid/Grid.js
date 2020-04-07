import React from 'react'
import PropTypes from 'prop-types'
import './grid.css'

import createGrid from 'utils/genGrid';
import { Tile } from 'component/Tile/Tile';


export class Grid extends React.Component {
	constructor(props) {
		super(props)
		//this.down = false
		//this.changeColor = this.changeColor.bind(this);
		//this.clickColor= this.clickColor.bind(this);
	}

	render() {
		const grid = this.props.grid;
		return (
			<div onMouseUp={this.props.onMouseUp} onMouseDown={this.props.onMouseDown}>
				{grid.map((row, i) =>
					<div className="row" key={'row'+i}>
						{row.map((color, j) => 
							<Tile 
								onMouseEnter={this.props.changeColor} 
								bgColor={color} 
								onMouseDown={this.props.clickColor} 
								key={`tile${i}${j}`}
								value={`${i} ${j}`}
							/>
						)}
					</div>
				)}
			</div>
				

		)
	}
}

Grid.propTypes = {
	grid: PropTypes.array
}