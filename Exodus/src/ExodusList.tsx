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
              this.task = input
            }}
            type="text"
            className="form-control"
            placeholder=""
        </form>
      </div>

    )
  }
}