import React from 'react';
import './option-grid.css';

export function OptionGrid({numberTiles, onChange, confirmClick, cancelClick}) {
    return (
      <React.Fragment>
					<p>Choose number of tiles:</p>
        	<select value={numberTiles} onChange={onChange}>
            <option value="0">Choose...</option>
            <option value="8">8x8</option>
            <option value="16">16x16</option>
            <option value="24">24x24</option>
            <option value="32">32x32</option>
          </select>
          <br />
          <button onClick={confirmClick} disabled={numberTiles === 0}>Apply</button>
          <button onClick={cancelClick}>Cancel</button>
			</React.Fragment>
    )
}