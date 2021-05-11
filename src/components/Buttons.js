import React from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';


// Component for Buttons
class Buttons extends React.Component {

    handleSelect = (evt) => {
      this.props.gridSize(evt);
    }
  
    render() {
      return (
        <div className="center">
          <ButtonToolbar>
            <Button className="btn btn-primary mr-1 mt-4" onClick={this.props.playButton}><i className="fa fa-play"></i></Button>
            <Button className="btn btn-primary mr-1 mt-4" onClick={this.props.pauseButton}><i className="fa fa-pause"></i></Button>
            <Button className="btn btn-primary mr-1 mt-4" onClick={this.props.clear}><i className="fa fa-refresh"></i></Button>
            <Button className="btn btn-primary mr-1 mt-4" onClick={this.props.slow}><i className="fa fa-backward"></i></Button>
            <Button className="btn btn-primary mr-1 mt-4" onClick={this.props.fast}><i className="fa fa-forward"></i></Button>
            <Button className="btn btn-primary mr-1 mt-4" onClick={this.props.seed}><i className="fa fa-random"></i></Button>
          </ButtonToolbar>
        </div>
      )
    }
}

export default Buttons;
