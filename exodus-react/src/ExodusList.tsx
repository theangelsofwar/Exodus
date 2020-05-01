import React, { Component } from 'react';

interface Props {
  exodusArray: any,
  createExodus: any,
  toggleExodus: any
}
class ExodusList extends Component {
  constructor({ exodusArray, createExodus, toggleExodus }: Props, {
    
  }) {
    super({ exodusArray, createExodus, toggleExodus });
    this.state = {
      exodusArray: exodusArray,
      createExodus: createExodus, 
      toggleExodus: toggleExodus
    }
    this.handleCompletedChange=this.handleCompletedChange.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
  }

  handleCompletedChange = (event: any) => {
  
  }

  handleExodusChange = (event: any) => {
    this.setState({ [event.target.name] : event.target.value });
  }


  handleSubmit = (event: any) => {
    event.preventDefault();
    this.props.createExodus(event.target.value);
  }

  render() {
    return (
      <React.Fragment>
      <div id="content">
        <form onSubmit={this.handleSubmit} >
          <input 
            id="newExodus"
            onChange={this.handleExodusChange}
            type="text"
            className="form-control"
            placeholder="Execute Exodus"
            required />
          <input type="submit" hidden={true} />
        </form>
        <ul id="exodusList" className="list-unstyled">
          { this.state.exodusArray.map((exodus, key) => {
            return(
              <div id="exodusTemplate" className="exodusTemplate" key={key}>
                <label>
                  <input 
                    type="checkbox"
                    name={exodus.id}
                    defaultChecked={exodus.completed}
                    onChange={this.handleCompletedChange}
                    onClick={(event) => {
                      this.props.toggleCompleted(exodus.name) }} />
                    <span className="content"> {exodus.content} </span>
                </label>
              </div>)
           })
          }
        </ul>
        <ul id="completedExodusList" className="list-unstyled">
        </ul>
      </div>
      </React.Fragment>
    );
  }
}

export default ExodusList;