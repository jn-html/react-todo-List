import React, { Component } from 'react';
// import uuid from "uuid";
// import * as uuid from 'uuid';
import {v1 as uuid} from "uuid"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

// showing vs code github setup
class App extends Component {
  state = {
    items:[],
    id: uuid(),
    item:'',
    editItem: false
  };
  handleChange = (e) => {
    this.setState({
      item:e.target.value
    })
  }
  handleSubmit = e => {
    e.preventDefault();
    const newItem = {
      id:this.state.id,
      title:this.state.item
    }
    const updateItems = [...this.state.items, newItem];
    this.setState({
      items: updateItems,
      item: "",
      id: uuid(),
      editItem: false
    }, 
    // () => console.log(this.state)
    );
  };
  clearList = () => {
    // console.log('clear list');
    this.setState({
      items: []
    })
  }
  handleDelete = (id) => {
    // console.log(`handle delete ${id}`);
    const filteredItems = this.state.items.filter(item => item.id !== id);
    this.setState({
      items: filteredItems
    });
  }
  handleEdit = id => {
    // console.log(`handle edit ${id}`);
    const filteredItems = this.state.items.filter(item => item.id !== id);
    const selectedItem = this.state.items.find(item => item.id === id);
    // console.log(selectedItem);
    this.setState({
      items: filteredItems,
      item: selectedItem.title, 
      // ajouter pour revenir dans l'input
      id: id,
      editItem: true
    });
  }
  render() {
    // console.log(this.state); 

    return (
        <div className="container">
          <div className="row">
            <div className="col-10 mx-auto col-md-8 mt-5">
            <h3 className="text-capitalize text-center">
              todo
            </h3>
            <TodoInput item={this.state.item} handleChange={this.handleChange} 
            handleSubmit={this.handleSubmit} editItem={this.state.editItem}/>
            <TodoList items={this.state.items} clearList={this.clearList}
              handleDelete={this.handleDelete} handleEdit={this.handleEdit}/>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
