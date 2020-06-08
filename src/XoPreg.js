import React, { Component } from "react";
import XoPregItems from "./XoPregItems";
import "./XoPreg.css";

class XoPreg extends Component { 
    constructor(props){
        super(props);
        this.state = {
            items:[]
        };
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);

    }
    addItem(e){
        if (this._inputElement.value !== "") {
            var newItem = {
                text: this._inputElement.value,
                key: Date.now()
            };
            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(newItem)
                };
            });
        }
        this._inputElement.value = "";
        console.log(this.state.items);
        e.preventDefault();
    }

    deleteItem(key){
        var filteredItems = this.state.items.filter(function (item){
            return (item.key !== key)
        });

        this.setState({
            items: filteredItems
        });
    }
    render() {
        return (
            <div className="XoPregMain">
                <div className="header">
                    <form onSubmit={this.addItem}>
                        <input ref={(a) => this._inputElement = a}
                                    placeholder="Insira a atividade">
                        </input>
                        <button type="submit">Adicionar</button>
                    </form>
                </div>
                <XoPregItems entries={this.state.items}
                                    delete={this.deleteItem}/>
            </div>

        );
    }
}

export default XoPreg;
