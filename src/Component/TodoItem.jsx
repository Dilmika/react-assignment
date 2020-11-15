import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import bootstrap from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';




function TodoItem(props){

  

    return (
        <div>
            <div>
                <Container style={{width:"550px",fontSize:"15px",padding:"10px"}}>
                    <Card>
                        
                            <Card.Body>
                                <Row>
                                    <Col sm={1} style={{backgroundColor:props.item.color,}}></Col>
                                    
                                    <Col sm={11}>
                                                <Row>
                                                    <Col sm={3}><Card.Title style={{textAlign:"left"}}>{props.item.priority}</Card.Title></Col>
                                                    <Col sm={4}><Button size="sm" variant="outline-primary" onClick={()=> props.deleteTodo(props.item.id)}   >Delete</Button></Col>
                                                     <Col sm={5}><Button size="sm" variant="outline-primary" onClick={() => props.todoStatus(props.item.id)}  >{props.item.completed == true ? "Completd":"Mark As Completed"}</Button></Col>
                                                    
                                                </Row>
                                                    
                                                <Card.Text style={{textAlign:"left"}}>
                                                    {props.item.title}
                                                </Card.Text>
                                    </Col>            
                                </Row>
                            </Card.Body>
                    </Card>
                </Container>
            </div>
        </div>
    )
}

export default TodoItem