import React, { Component } from "react";
import FlipMove from "react-flip-move";

class XoPregItems extends Component {
    constructor(props) {
        super(props);

        this.createTasks = this.createTasks.bind(this);
    }

    createTasks(item) {
        return <li onClick={() => this.delete(item.key)}
        key={item.key}>{item.text}</li>
    }

    delete(key){
        this.props.delete(key);
    }
    // xopr todo 
    render() {
        var xoprEntries = this.props.entries; 
        var listItems = xoprEntries.map(this.createTasks);

        return(
          <ul className="theList">
            <FlipMove duration={250} easing="ease-out">
              {listItems}
            </FlipMove>
          </ul>  
        );
    }
}

export default XoPregItems;
