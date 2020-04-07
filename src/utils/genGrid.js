function createGrid(num, initVal) {
	return Array(num).fill(Array(num).fill(initVal));
}

export default createGrid;