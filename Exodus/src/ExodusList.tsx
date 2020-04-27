import React, { Component } from 'react';

class ExodusList extends Component {
  render() {
    return (
      <div id="content">
        <form onSubmit={(event) => {
          event.preventDefault()
          this.props.createExodus(this.exodus.value)
        }} >
          <input 
            id="newExodus"
            ref={(input) => {
              this.exodus = input
            }}
            type="text"
            className="form-control"
            placeholder="Execute Exodus"
            required />
          <input type="submit" hidden={true} />
        </form>
        <ul id="exodusList" className="exodusList>
          { this.props.exodusList.map((exodus, key) => {
            return(
              <div className="checkbox" key={key}>
                <label>
                  <input 
                    type="checkbox"
                    name={exodus.id}
                    defaultChecked={exodus.completed}
                    ref={(input) => {
                      this.checkbox = input
                    }}
                    onClick={(event) => {
                      this.props.toggleCompleted(this.checkbox.name) }} />
                    <span className="content"> {exodus.content} </span>
                </label>
              </div> 
            )
          })}
        </ul>
        <ul id="completedExodusList" className="list-unstyled">
        </ul>
      </div>
    );
  }
}

export default ExodusList;