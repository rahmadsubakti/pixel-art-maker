import React from 'react';
import { CompactPicker } from 'react-color';
import { Grid } from 'component/Grid/Grid';
import { ControlGroup } from 'component/ControlGroup/ControlGroup'
import createGrid from 'utils/genGrid';
import saveAs from 'file-saver'; 
import logo from './logo.svg';
import './App.css';

// How to import font awesome from react component
// Without editing index.html
class App extends React.Component {
  /*constructor(props) {
    super(props);
    this.grid = createGrid(16, '#fff');
    this.state = {grid: this.grid, currentColor: '#fff'};
    this.changeCurrentColor = this.changeCurrentColor.bind(this);
    this.down = false;
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.changeTileColor = this.changeTileColor.bind(this);
    this.clickTileColor = this.clickTileColor.bind(this);
    this.changeColor = this.changeColor.bind(this);
  }*/
  constructor(props) {
    super(props);
    this.grid = createGrid(16, '#ffffff') // make 16 into dynamic number
    this.state = {
      currentColor: '#ffffff',
      grid: this.grid
    }
    this.down = false;
    this.changeColor = this.changeColor.bind(this);
  }

  getColor(color) {
    this.setState({currentColor: color})
  }

  clearGrid() {
    this.setState({grid: this.grid});
  }

  saveImage() {
    const concat = (xs, ys) => xs.concat(ys);
    const hexToRGBA = hexStr => [
      parseInt(hexStr.substr(1,2), 16),
      parseInt(hexStr.substr(3,2), 16),
      parseInt(hexStr.substr(5,2), 16),
      255
    ];

    const grid = this.state.grid;

    const flattenedRGB = grid
      .reduce(concat)
      .map(hexToRGBA)
      .reduce(concat);

    const cvs = document.createElement('canvas');
    cvs.width = cvs.height = 16; // dynamic, depend on number of tiles
    const ctx = cvs.getContext('2d');
    const imgData = new ImageData(Uint8ClampedArray.from(flattenedRGB), 16, 16);
    ctx.putImageData(imgData, 0, 0);
    cvs.toBlob(blob => saveAs(blob, 'output.png'), 'image/png'); //output.png is filename, depend on input text
  }
  /*
  changeCurrentColor(color) {
  	this.setState({currentColor: color.hex})
  }*/

  changeColor(e) {
  	let [row, col] = e.target.getAttribute('value').split(' ')
		row = parseInt(row);
		col = parseInt(col);
		const grid = [...this.state.grid]
		const rowArr = [...grid[row]]
		rowArr[col] = this.state.currentColor;

		grid[row] = rowArr;
		this.setState({grid: grid})
  }

  mouseDown(e) {
  	e.preventDefault()
  	this.down = true
  }

  mouseUp(e) {
  	e.preventDefault()
  	this.down = false
  }

  changeTileColor(e) {
		if (this.down) {
			this.changeColor(e)
		}
	}

	clickTileColor(e) {
		this.changeColor(e)
	}

  render() {
  	return (
      <React.Fragment>
  		  <div className="grid-container">
          <Grid 
  				  grid={this.state.grid}
  				  color='red'
  				  onMouseDown={this.mouseDown.bind(this)}
  				  onMouseUp={this.mouseUp.bind(this)}
  				  changeColor={this.changeTileColor.bind(this)}
  				  clickColor={this.clickTileColor.bind(this)}
  			 />
  		  </div>
        <ControlGroup 
          getColor={this.getColor.bind(this)}
          clearGrid={this.clearGrid.bind(this)}
          saveImage={this.saveImage.bind(this)}
        />
      </React.Fragment>
  	)
  }
}

export default App;
