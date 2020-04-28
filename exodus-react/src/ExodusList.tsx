import React, { Component } from 'react';

interface Props{
  createExodus: any,
  exodus: any,
  exodusArray: any
}
class ExodusList extends Component {

  constructor({ createExodus, exodus, exodusArray }: Props){
    super({ createExodus, exodus, exodusArray });
    this.state = {
      exodus: exodus,
      createExodus: createExodus,
      exodusArray: exodusArray,
      completed: exodus.completed
    }

    this.handleCompletedChange=this.handleCompletedChange.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
  }

  handleCompletedChange = (event: any) => {
    const exodus = this.state.exodus;
    let completed = event.target.value;
    exodus.completed = completed;
    this.setState{ exodus };
  }

  handleExodusChange = (event: any) => {

  }


  handleSubmit = (event: any) => {
    event.preventDefault();
    this.state.createExodus(event.target.value);
  }


  render() {
    return (
      <div id="content">
        <form onSubmit={this.handleSubmit} >
          <input 
            id="newExodus"
            onChange={this.handleChange}
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
                      this.props.toggleCompleted(this.state.exodus.name) }} />
                    <span className="content"> {this.state.exodus.content} </span>
                </label>
              </div>)
           })
          }
        </ul>
        <ul id="completedExodusList" className="list-unstyled">
        </ul>
      </div>
    );
  }
}

export default ExodusList;