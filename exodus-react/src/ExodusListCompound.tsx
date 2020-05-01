import React, { useState, useEffect, useContext } from 'react';

const initialState: any = {
  exodusArray: [],
  createExodus: any,
  toggleExodus: any,
}
const ExodusListCompound = (props: any) => {
  const [exodusArray, setExodusArray] = useState([]);
  const [createExodus, setCreateExodus] = useState({});
  const [toggleExodus, setToggleExodus] = useState({});
  // const context = useContext(App);

  const handleCompletedChange = (event: any) => {
    
  }

  const handleExodusChange = (event: any) => {
    // this.setState({ [event.target.name] : event.target.value });
  }


  const handleSubmit = (event: any) => {
    event.preventDefault();
    props.createExodus(event.target.value);
  }


    return(
      <div id="content">
        <form onSubmit={handleSubmit} >
          <input 
            id="newExodus"
            onChange={handleExodusChange}
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
                    onChange={handleCompletedChange}
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
    )
}

export default ExodusListCompound;