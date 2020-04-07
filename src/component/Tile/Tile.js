import React from 'react';
import PropTypes from 'prop-types';

import './tile.css';

export function Tile(props) {
	const bgColor = {background: props.bgColor}
	return (
		<div 
			className="tile" 
			onMouseEnter={props.onMouseEnter} 
			onMouseDown={props.onMouseDown}
			style={bgColor}
			value={props.value}
		>
		</div>
		)
}

Tile.propTypes = {
	onMouseEnter: PropTypes.func,
	onMouseDown: PropTypes.func,
	bgColor: PropTypes.string,
}