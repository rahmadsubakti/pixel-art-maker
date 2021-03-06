import React from 'react';
import { Grid } from 'component/Grid/Grid';
import { ControlGroup } from 'component/ControlGroup/ControlGroup';
import { Modal } from 'component/Modal/Modal';
import { OptionGrid } from 'component/OptionGrid/OptionGrid';
import saveImage from 'utils/saveImage';
import createGrid from 'utils/genGrid';
import { addToUndoStack, undo, redo } from 'utils/undoRedo';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.grid = [];
    this.state = {
      currentColor: '#333333',
      numberTiles: 0,
      showModal: true,
      name: 'Untitled',
      grid: this.grid,
    }
    this.undoStack = [];
    this.redoStack = [];
    this.down = false;
    this.changeColor = this.changeColor.bind(this);
  }

  getColor(color) {
    this.setState({currentColor: color})
  }

  clearGrid() {
    addToUndoStack(this.grid, this.undoStack, this.redoStack)
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
  	this.down = false;
    const { grid } = this.state;
    addToUndoStack(grid, this.undoStack, this.redoStack);
    this.setState({})
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
    this.undoStack.push(this.grid);
    this.setState({
      grid: this.grid, 
      showModal: false, 
      name: "Untitled",
    })
  }

  cancelClick() {
    this.setState({showModal: false})
  }

  changeName(e) {
    this.setState({name: e.target.value})
  }

  handleUndo() {
    const lastEl = undo(this.undoStack, this.redoStack);
    this.setState({grid: lastEl});
  }

  handleRedo() {
    const lastEl = redo(this.undoStack, this.redoStack);
    this.setState({grid: lastEl});
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
  				  onMouseDown={this.mouseDown.bind(this)}
  				  onMouseUp={this.mouseUp.bind(this)}
  				  changeColor={this.changeTileColor.bind(this)}
  				  clickColor={this.clickTileColor.bind(this)}
  			 />
  		  </div>
        <ControlGroup
          newArt={this.showModal.bind(this)}
          currentColor={this.state.currentColor} 
          getColor={this.getColor.bind(this)}
          clearGrid={this.clearGrid.bind(this)}
          isUndo={this.undoStack.length < 2}
          handleUndo={this.handleUndo.bind(this)}
          isRedo={this.redoStack.length === 0}
          handleRedo={this.handleRedo.bind(this)}
          saveImage={this.saveImageEvent.bind(this)}
          changeName={this.changeName.bind(this)}
          name={this.state.name}
        />
      </React.Fragment>
  	)
  }
}

export default App;
