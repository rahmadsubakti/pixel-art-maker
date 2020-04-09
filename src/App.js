import React from 'react';
import { CompactPicker } from 'react-color';
import { Grid } from 'component/Grid/Grid';
import { ControlGroup } from 'component/ControlGroup/ControlGroup';
import { Modal } from 'component/Modal/Modal';
import { OptionGrid } from 'component/OptionGrid/OptionGrid';
import saveImage from 'utils/saveImage';
import createGrid from 'utils/genGrid';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.grid = [];
    this.state = {
      currentColor: '#ffffff',
      numberTiles: 0,
      showModal: true,
      name: 'Untitled',
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

  saveImageEvent() {
    const {grid, name} = this.state
    saveImage(grid, name)
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

  handleChange(e) {
    this.setState({numberTiles: parseInt(e.target.value)})
  }

  showModal() {
    this.setState({showModal: true})
  }

  confirmClick() {
    this.grid = createGrid(this.state.numberTiles, '#ffffff');
    this.setState({grid: this.grid, showModal: false, name: "Untitled"})
  }

  cancelClick() {
    this.setState({showModal: false})
  }

  changeName(e) {
    this.setState({name: e.target.value})
  }

  render() {
  	return (
      <React.Fragment>
        {this.state.showModal &&
          <Modal>
            <OptionGrid 
              numberTiles={this.state.numberTiles}
              onChange={this.handleChange.bind(this)}
              confirmClick={this.confirmClick.bind(this)}
              cancelClick={this.cancelClick.bind(this)}
            />
          </Modal>
        }
  		  <div className="grid-container">
          <Grid 
  				  grid={this.state.grid}
  				  color={this.state.currentColor}
  				  onMouseDown={this.mouseDown.bind(this)}
  				  onMouseUp={this.mouseUp.bind(this)}
  				  changeColor={this.changeTileColor.bind(this)}
  				  clickColor={this.clickTileColor.bind(this)}
  			 />
  		  </div>
        <ControlGroup
          new={this.showModal.bind(this)} 
          getColor={this.getColor.bind(this)}
          clearGrid={this.clearGrid.bind(this)}
          saveImage={this.saveImageEvent.bind(this)}
          changeName={this.changeName.bind(this)}
          name={this.state.name}
        />
      </React.Fragment>
  	)
  }
}

export default App;
