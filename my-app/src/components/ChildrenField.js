import React, {useState} from 'react';
const {Fragment} = React


function Children(props) {
    return(
        <p>{props.name}</p>
    );
}

function newList(name, children) {
    var newLi = [...children];
    newLi.push(name);
    return newLi;
}


function ChildrenField(props) {
   const [children, setChildren] = useState([]);
   var name = "";
   if(props.children.length > 0 && props.children !== children){
    setChildren(props.children);
   }

    return (
        <Fragment>
        { [...Array(children.length)].map((_, i) => <Children key={i} name={children[i]} />) }
        <label>
          Navn på barn:
          <input type="text"  onChange={(event) => name = event.target.value} />
        </label>
        <button onClick={() => {setChildren(newList(name, children));}}>Legg til</button>
        </Fragment>
    );
   
  }


  export default ChildrenField;