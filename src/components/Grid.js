import React from 'react';


// Component for a single square on the grid
class Box extends React.Component {
  selectBox = () => {
    this.props.selectBox(this.props.row, this.props.col);
  }

  render() {
    return (
      <div 
        className={this.props.boxClass}
        id={this.props.id}
        onClick={this.selectBox}>
       </div>
    );
  }
}

// Component for container of all squares on the grid
class Grid extends React.Component {
    render() {
      const width = (this.props.cols * 19);
      var rowsArr = []
      var boxClass = "";
      for(var i = 0; i < this.props.rows; i++) {
        for (var j = 0; j < this.props.cols; j++) {
          let boxId = i + "_" + j;
  
          boxClass = this.props.gridFull[i][j] ? "box on" : "box off";
          rowsArr.push(
            <Box 
              boxClass={boxClass} 
              key={boxId} 
              boxId={boxId} 
              row={i} 
              col={j} 
              selectBox={this.props.selectBox}
            />
          );
        }
      }
    
      return (
        <div className="grid" style={{width: width}}>
          {rowsArr}
        </div>
      );
    }
}

export default Grid;
