import saveAs from 'file-saver'; 

function saveImage(grid, name) {
    const concat = (xs, ys) => xs.concat(ys);
    const hexToRGBA = hexStr => [
      parseInt(hexStr.substr(1,2), 16),
      parseInt(hexStr.substr(3,2), 16),
      parseInt(hexStr.substr(5,2), 16),
      255
    ];
    
    const length = grid.length;
    const flattenedRGB = grid
      .reduce(concat)
      .map(hexToRGBA)
      .reduce(concat);

    const cvs = document.createElement('canvas');
    cvs.width = cvs.height = length;
    const ctx = cvs.getContext('2d');
    const imgData = new ImageData(Uint8ClampedArray.from(flattenedRGB), length, length);
    ctx.putImageData(imgData, 0, 0);
    cvs.toBlob(blob => saveAs(blob, name + '.png'), 'image/png');
  }

export default saveImage