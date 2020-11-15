import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import bootstrap from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import './App.css';
import TodoData from './TodoData';
import TodoItem from './Component/TodoItem';
import GroupBy from './Component/GroupBy';
import Modal from 'react-modal';




class App extends React.Component {

  constructor(){
    super()
    this.state = {
      todo:TodoData,
      search:"",
      priority:"",
      groups:"",
      searchbool:false,
      isOpen:false,
      currentTodo:{
          id:"",
          title:"",
          timestamp:"",
          color:"",
          completed:"",
          priority:""
      }

    }
    this.filterSearch = this.filterSearch.bind(this);
    this.filterPriority = this.filterPriority.bind(this);
    this.todoStatus = this.todoStatus.bind(this);
    this.filterGroups = this.filterGroups.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.handleInputColor = this.handleInputColor.bind(this);
    this.handleInputPriority = this.handleInputPriority.bind(this);
    this.handleInputTitle = this.handleInputTitle.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  filterSearch(e){
    console.log(e.target.value);

    this.setState({search:e.target.value});
    if(this.state.searchbool == false)
    {
      this.setState({searchbool:true})
    }else{
      this.setState({searchbool:false})
    }
  }

  filterPriority(e){
    console.log(e.target.value);
    
    this.setState({priority:e.target.value});
    if(this.state.searchbool == false)
    {
      this.setState({searchbool:true})
    }else{
      this.setState({searchbool:false})
    }
  }

  filterGroups(e){
    console.log(e.target.value);

    this.setState({groups:e.target.value.toLowerCase()});   
  }

  

  todoStatus(id){
      this.setState(preValue => {
        const updatedTodo = preValue.todo.map(item =>
          {
            if(item.id === id)
            {
              
               if(item.completed == true)
               {
                item.completed = false;
               }
              
            }
            return item;
          })
          return {
            todo:updatedTodo
          }
          
      })
      console.log("Changed",id,this.state.todo);
      
  }

  deleteTodo(id)
  {
    const deleteFiltered = this.state.todo.filter(item =>
      item.id !== id );
      
      this.setState({
        todo : deleteFiltered
        
      })

  }

  handleInputColor(e)
  {
    e.preventDefault();
   
    this.setState(
      {
        
        currentTodo:{
        ...this.state.currentTodo,
          color:e.target.value
        }
      }
    )   
  }

  handleInputPriority(e)
  {
    console.log(e.target.value);
    this.setState(
      {
        currentTodo:{
          ...this.state.currentTodo,
          priority:e.target.value.toLowerCase()
        }
      }
    )   
  }

  handleInputTitle(e)
  {
    
   
    this.setState(
      {
        currentTodo:{
          ...this.state.currentTodo,
          title:e.target.value,
          timestamp:Date.now(),
          completed:false
         

        }
      }
    ) 
    
    
  }

  addTodo(e){
    e.preventDefault();
    const newTodo = this.state.currentTodo;
    console.log(newTodo);



    if(newTodo.text !== ""){

        
        const newTodos = this.state.todo;
        newTodos.push(newTodo);

        console.log(newTodos);
        console.log("working");
        this.setState({
          todo:newTodos
          
        })
    }

  }

  render() {

    

    let filteredSearch = this.state.todo.filter((item) =>
      {
       
        if(this.state.priority == "All")
        {
          return item.title.toLowerCase().indexOf(this.state.
            search.toLowerCase()) !== -1
        }else{
          return item.title.toLowerCase().indexOf(this.state.
            search.toLowerCase()) !== -1 && item.priority.toLowerCase().indexOf(this.state.
              priority.toLowerCase()) !== -1 ;
        }

      }
    )

    
    let todoItem = filteredSearch.map(item =>
    
        <TodoItem key={item.id} item={item} todoStatus={this.todoStatus} btnName = {this.btnName} deleteTodo={this.deleteTodo} />
    )

    

   

    return (
      
     

      <div className="App">



                  <Modal style={{overlay:{backgroundColor:"gray"}}} isOpen={this.state.isOpen}>
                    <h2 style={{textAlign:"center"}}>Create New Todo</h2>
                    <form onSubmit={this.addTodo}>

                        <input style={{width:"500px",height:"50px"}} type="text" placeholder="Description" value={this.state.currentTodo.text} onChange={this.handleInputTitle}  />

                        <Row style={{padding:"20px"}}>

                          <Col sm={2}><h6>Priority &nbsp;</h6></Col>
                          <Col sm={2}>

                          

                          <select class="form-control" id="sel1" style={{width:"140px"}} value={this.state.currentTodo.priority} onChange={this.handleInputPriority} >
                                            
                                            <option name="priority">High</option>
                                            <option name="priority">Low</option>
                                            <option name="priority">Medium</option>
                                            
                                    </select>

                        
                        </Col>
                        <Col sm={5}><p style={{textAlign:"right"}}>Color Plate</p></Col>
                        <Col sm={3}>
                                      <select class="form-control" id="sel1" style={{width:"140px"}} value={this.state.currentTodo.color} onChange={this.handleInputColor}  >
                                            <option name="color">#0984e3</option>
                                            <option name="color">#6c5ce7</option>
                                            <option name="color">#fd79a8</option>
                                            <option name="color">#fdcb6e</option>
                                            <option name="color">#00b894</option>
                                    </select>
                        </Col>
                        </Row>
                        <Button type="submit" >Add</Button>

                    </form>
                    <br></br>
                    <br></br>
                    <Button onClick = {(e) => this.setState({isOpen:false})}>Close</Button>
                  </Modal>





                <Container style={{width:"500px",padding:"10px"}}>
                  <Row style={{padding:"10px"}}>
                    <Col sm={9}> 
                  <div class="md-form active-purple active-purple-2 mb-3" className="row">
                      <input class="form-control" type="text" placeholder="Search" aria-label="Search" onChange={this.filterSearch} value={this.state.search}   ></input>     
                  </div>
                  </Col>
                  <Col sm={3}>
                  <Button size="sm" variant="primary" onClick={(e) => this.setState({isOpen:true}) }    >Add New</Button>
                  </Col>
                  </Row>
                  

                  <Row >
                      <p>Filter By &nbsp;&nbsp;</p>
                      <h6>Priority &nbsp;</h6>                      
                                    <select class="form-control" id="sel1" style={{width:"100px"}} value={this.state.priority} onChange={this.filterPriority} >
                                            <option name="priority">All</option>
                                            <option name="priority">High</option>
                                            <option name="priority">Medium</option>
                                            <option name="priority">Low</option>
                                    </select>                     
                  </Row>
                  <br></br>
                  <Row>
                    
                    <Col sm={1}>
                      <ToggleButtonGroup type="checkbox"  >
                          <ToggleButton name="completed">Completed</ToggleButton>
                          <ToggleButton name="completed">Todo</ToggleButton>
                       </ToggleButtonGroup>
                    </Col> 
                    <Col sm={5}></Col>
                    <Col sm={3} style={{textAlign:"right"}}><h6>Group By</h6></Col>
                    <Col sm={3}>
                    
                                  <select class="form-control" id="sel1" style={{width:"100px"}} value={this.state.groups} onChange={this.filterGroups} >
                                          <option name="groups">none</option>
                                          <option name="groups">color</option>
                                          <option name="groups">timestamp</option>
                                          <option name="groups">priority</option>

                                  </select>
                    </Col>                 
                  </Row>

                  

                </Container>
                

                <br></br>
                {this.state.groups == 'none' || this.state.searchbool == true? todoItem: <GroupBy    filterGroups={this.filterGroups} deleteTodo={this.deleteTodo}   groups={this.state.groups} todo={this.state.todo} groupBy={this.groupBy}/>  }
               
      </div>
    );

  }
 
}

export default App;
