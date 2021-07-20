import React from 'react';
const {Fragment} = React


function Children() {
    return(
        <label>
          navn barn:
          <input type="text"  />
        </label>
    );
}


function ChildrenField(props) {
   
  
    return (
        <Fragment>
        { [...Array(props.count)].map((_, i) => <Children key={i} />) }
        </Fragment>
      
    );
   
  }


  export default ChildrenField;