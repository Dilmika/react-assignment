import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import bootstrap from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

function GroupBy(props){

    const groupBy = (key,arr) => arr
      .reduce(
        (cache,product) => {
          const property = product[key]
          if(property in cache){
            return {...cache,[property]:cache[property].concat(product)}
          }
        
        return {...cache,[property]:[product]} 
          },
        {}
      )

   

    

   const Groupy =  Object.keys(groupBy(props.groups,props.todo)).map(cat => (
        <div>
           
            <h3 style={cat == 'undefined' ? {textAlign:"center",marginLeft:"-400px",color:"white"}:{textAlign:"center",marginLeft:"-400px"}}  >{cat}</h3>


            {groupBy(props.groups,props.todo)[cat].map(ord => (
            <div>
                <Container style={{width:"550px",fontSize:"15px",padding:"10px"}}>
                    <Card>
                        
                            <Card.Body>
                                <Row>
                                    <Col sm={1} style={{backgroundColor:ord.color}}></Col>
                                    
                                    <Col sm={11}>
                                                <Row>
                                                    <Col sm={3}><Card.Title style={{textAlign:"left"}}>{ord.priority}</Card.Title></Col>
                                                    <Col sm={4}><Col sm={4}><Button size="sm" variant="outline-primary" onClick={()=> props.deleteTodo(ord.id)}>Delete</Button></Col></Col>
                                                    <Col sm={5}><Button size="sm" variant="outline-primary" >{ord.completed == true ? "Completed":"Mark As Completed"}</Button></Col>
                                                    
                                                </Row>
                                                    
                                                <Card.Text style={{textAlign:"left"}}>
                                                    {ord.title}
                                                </Card.Text>
                                    </Col>            
                                </Row>
                            </Card.Body>
                    </Card>
                </Container>
                
            </div>
            ))}
        </div>
        ))
    return (
        <div>
            <div>
                {Groupy}
               
            </div>
        </div>
    )
}

export default GroupBy