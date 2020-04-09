import React from 'react'
import PropTypes from 'prop-types'
import './grid.css'

import { Tile } from 'component/Tile/Tile';

export function Grid(props) {
	const { grid, onMouseUp, onMouseDown, changeColor, clickColor } = props;
	return (
			<div onMouseUp={onMouseUp} onMouseDown={onMouseDown}>
				{grid.map((row, i) =>
					<div className="row" key={'row'+i}>
						{row.map((color, j) => 
							<Tile 
								onMouseEnter={changeColor} 
								bgColor={color} 
								onMouseDown={clickColor} 
								key={`tile${i}${j}`}
								value={`${i} ${j}`}
							/>
						)}
					</div>
				)}
			</div>
	)
}

Grid.propTypes = {
	grid: PropTypes.array.isRequired,
	onMouseUp: PropTypes.func.isRequired,
	onMouseDown: PropTypes.func.isRequired,
	changeColor: PropTypes.func.isRequired,
	clickColor: PropTypes.func.isRequired
}