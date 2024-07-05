import React from 'react'
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FormSelect } from 'react-bootstrap';


let editable = true;

function validateTitle(value) {
    console.log("happened");
    console.log(value);
    let error;
    if (!value){
        error = 'Required';
    
    }
    console.log(error)
    return error;
}
function validateDesc(value) {
    let error;
    if (!value){
        error = 'Required';
    }
    return error;
}
function validateUser(value) {
    let error;
    if (!value){
        error = 'Required';
    }
    return error;
}

function toggleDisable(){
    const bugTitle = document.getElementById("bugTitle");
    const bugDesc = document.getElementById("desc");
    const bugUser = document.getElementById("user");
    const scenario = document.getElementById("scenario");
    const product = document.getElementById("product");
    const enviornment = document.getElementById("enviornment");
    const testing = document.getElementById("testing");
    const rootcause = document.getElementById("rootcause");
    const priority = document.getElementById("priority");
    const assignee = document.getElementById("assignee");
        


    editable = !editable;
    bugTitle.disabled = !bugTitle.disabled;
    bugDesc.disabled = !bugDesc.disabled;
    bugUser.disabled = !bugUser.disabled;
    scenario.disabled = !scenario.disabled;
    product.disabled = !product.disabled;
    enviornment.disabled = !enviornment.disabled;
    testing.disabled = !testing.disabled;
    rootcause.disabled = !rootcause.disabled;
    priority.disabled = !priority.disabled;
    assignee.disabled = !assignee.disabled;

    //go back to original page after
    
}






function BugAddContent() {
    const [buttons, setButtons] = useState("Edit");
    const [titleErrors, settitleErrors] = useState("");
    const [descErrors, setdescErrors] = useState("");
    const [userErrors, setuserErrors] = useState("");
    const [scenarioErrors, setscenarioErrors] = useState("");
    const [productErrors, setproductErrors] = useState("");
    const [enviornmentErrors, setenviornmentErrors] = useState("");
    const [testingErrors, settestingErrors] = useState("");
    const [rootcauseErrors, setrootErrors] = useState("");
    const [priorityErrors, setpriorityErrors] = useState("");
    const [assigneeErrors, setassigneeErrors] = useState("");
    
   

    function valudate(){
        if(buttons != "Edit"){
            let boo = true;
            const bugTitle = document.getElementById("bugTitle");
            let titleValue = bugTitle.value;
            if(titleValue === ""){
                settitleErrors("Required");
                if(boo){
                    boo=false;

                }
                
            }
            const bugDesc = document.getElementById("desc");
            let description = bugDesc.value;
            if(description === ""){
                setdescErrors("Required");
                if(boo){
                    boo=false;

                }
                
            }

        
            const bugUser = document.getElementById("user");
            let user = bugUser.value;
            if(user === ""){
                setuserErrors("Required");
                if(boo){
                    boo=false;

                }
                
            }
        
            
            
            const scenarioElement = document.getElementById("scenario");
            let scenarioValue = scenarioElement.value;
            if(scenarioValue === "base"|| scenarioValue === ""){
                setscenarioErrors("Required");
                if(boo){
                    boo=false;

                }
                
            }
            const productElement = document.getElementById("product");
            let productValue = productElement.value;
            if(productValue === "base"|| productValue === ""){
                setproductErrors("Required");
                if(boo){
                    boo=false;

                }
                
                
            }
            const enviornmentElement = document.getElementById("enviornment");
            let enviornmentValue = enviornmentElement.value;
            if(enviornmentValue === "base"|| enviornmentValue === ""){
                setenviornmentErrors("Required");
                if(boo){
                    boo=false;

                }
                
                
            }
            const testingElement = document.getElementById("testing");
            let testingValue = testingElement.value;
            if(testingValue === "base"|| testingValue === ""){
                settestingErrors("Required");
                if(boo){
                    boo=false;

                }
                
                
            }
            const rootcauseElement = document.getElementById("rootcause");
            let rootcauseValue = rootcauseElement.value;
            if(rootcauseValue === "base"|| rootcauseValue === ""){
                setrootErrors("Required");
                if(boo){
                    boo=false;

                }
                
                
            }
            const priorityElement = document.getElementById("priority");
            let priorityValue = priorityElement.value;
            if(priorityValue === "base"|| priorityValue === ""){
                setpriorityErrors("Required");
                if(boo){
                    boo=false;

                }
                
                
            }
            const assigneeElement = document.getElementById("assignee");
            let assigneeValue = assigneeElement.value;
            if(assigneeValue === "base"|| assigneeValue === ""){
                setassigneeErrors("Required");
                if(boo){
                    boo=false;

                }
                
                
            }
            if(boo){
                toggleDisable();
                
                setButtons("Edit");

            }
            
           
        }
        else{
            toggleDisable();
            setButtons("Save");
        }
            
            

    }
    
    function changeTitle(){
        const bugTitle = document.getElementById("bugTitle");
        let titleValue = bugTitle.value;
        if(titleValue === ""){
            settitleErrors("Required");
            
        }
        else{
            settitleErrors("");
        
        }
    }
    function changeDesc(){
        const bugDesc = document.getElementById("desc");
        let description = bugDesc.value;
        if(description === ""){
            setdescErrors("Required");
            
        }
        else{
            setdescErrors("");
        
        }
    }
    function changeUser(){
        const bugUser = document.getElementById("user");
        let user = bugUser.value;
        if(user === ""){
            setuserErrors("Required");
            
        }
        else{
            setuserErrors("");
        
        }
    }
    function changeScenario(){
        
    

    

        const scenarioElement = document.getElementById("scenario");
        let scenarioValue = scenarioElement.value;
        if(scenarioValue === "base"|| scenarioValue === ""){
            setscenarioErrors("Required");
            
        }
        else{
            setscenarioErrors("");
        
        }
    
    }
    function changeProduct(){
        const productElement = document.getElementById("product");
        let productValue = productElement.value;
        if(productValue === "base"|| productValue === ""){
            setproductErrors("Required");
            
        }
        else{
            setproductErrors("");
        
        }
    }
    function changeEnviornment(){
        const enviornmentElement = document.getElementById("enviornment");
        let enviornmentValue = enviornmentElement.value;
        if(enviornmentValue === "base"|| enviornmentValue === ""){
            setenviornmentErrors("Required");
            
        }
        else{
            setenviornmentErrors("");
        
        }
    }
    function changeTesting(){
        const testingElement = document.getElementById("testing");
        let testingValue = testingElement.value;
        if(testingValue === "base"|| testingValue === ""){
            settestingErrors("Required");
            
        }
        else{
            settestingErrors("");
        
        }
    }
    function changeRootCause(){
        const rootcauseElement = document.getElementById("rootcause");
        let rootcauseValue = rootcauseElement.value;
        if(rootcauseValue === "base"|| rootcauseValue === ""){
            setrootErrors("Required");
            
        }
        else{
            setrootErrors("");
        
        }
    }
    function changePriority(){
        const priorityElement = document.getElementById("priority");
        let priorityValue = priorityElement.value;
        if(priorityValue === "base"|| priorityValue === ""){
            setpriorityErrors("Required");
            
        }
        else{
            setpriorityErrors("");
        
        }
    }
    function changeAssignee(){
        const assigneeElement = document.getElementById("assignee");
        let assigneeValue = assigneeElement.value;
        if(assigneeValue === "base"|| assigneeValue === ""){
            setassigneeErrors("Required");
            
        }
        else{
            setassigneeErrors("");
        
        }
    }



    
  return (
    <div>
        
     
     
            <Container>
            <Row>
                <Col md = {2}>
                    <button id = "backArrow"> &larr;</button>
                </Col>
                <Col md = {2}>
                    <p id = "create">Create Bug</p>
                    
                    
                </Col>
                <Col md={{ span: 2, offset: 6 }}>
                    <button id="save" onClick = {valudate}type="submit">{buttons}</button>
                    
                    
                </Col>
            </Row>
        </Container>
            <Container>
                <Row>
                    <Col md ={6}>
                        
                        
                        <input disabled onChange= {changeTitle}id= "bugTitle" type = "text" placeholder = "Bug Title"className = "text"></input>
                        
                        <div>
                            <p>{titleErrors}</p>
                        </div>
                
                        
                        
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormSelect disabled onChange={changeScenario}  className = "drop" id="scenario" aria-label="Default select example">
                            <option value = "base">Scenario</option>
                            <option value = "Closed">Closed</option>
                            <option value = "fixed">Fixed</option>
                            <option value = "reopen">Reopen</option>
                        </FormSelect>
                        <div>
                            <p>{scenarioErrors}</p>
                        </div>
                        
                    </Col>
                    <Col>
                        <FormSelect disabled onChange= {changeProduct} className = "drop"id = "product" aria-label="Default select example">
                            <option value = "base">Product Name</option>
                            <option value = "Closed">Closed</option>
                            <option value = "fixed">Fixed</option>
                            <option value = "reopen">Reopen</option>
                        </FormSelect>
                        <div>
                            <p>{productErrors}</p>
                        </div>
                        
                    </Col>
                    <Col>
                        <FormSelect  disabled onChange={changeEnviornment}className = "drop" id = "enviornment"aria-label="Default select example">
                            <option value = "base">Enviornment</option>
                            <option value = "Closed">Closed</option>
                            <option value = "fixed">Fixed</option>
                            <option value = "reopen">Reopen</option>
                        </FormSelect>
                        <div>
                            <p>{enviornmentErrors}</p>
                        </div>
                        
                    </Col>
                    <Col>
                        <FormSelect disabled onChange={changeTesting}className = "drop" id = "testing" aria-label="Default select example">
                            <option value = "base">Testing Medium</option>
                            <option value = "Closed">Closed</option>
                            <option value = "fixed">Fixed</option>
                            <option value = "reopen">Reopen</option>
                        </FormSelect>
                        <div>
                            <p>{testingErrors}</p>
                        </div>
                        
                    </Col>
                    <Col>
                        <FormSelect disabled onChange={changeRootCause} className = "drop"id="rootcause" aria-label="Default select example">
                            <option value = "base">Root Cause Location</option>
                            <option value = "Closed">Closed</option>
                            <option value = "fixed">Fixed</option>
                            <option value = "reopen">Reopen</option>
                        </FormSelect>
                        <div>
                            <p>{rootcauseErrors}</p>
                        </div>
                        
                    </Col>

                </Row>
                <Row>
                    <Col >
                    <FormSelect disabled onChange={changePriority} className = "drop"id="priority" aria-label="Default select example">
                            <option value = "base">Priority</option>
                            <option value = "Closed">Closed</option>
                            <option value = "fixed">Fixed</option>
                            <option value = "reopen">Reopen</option>
                        </FormSelect>
                        <div>
                            <p>{priorityErrors}</p>
                        </div>
                    </Col>
                    <Col >
                        <FormSelect disabled onChange={changeAssignee} className = "drop" id="assignee" aria-label="Default select example">
                            <option value = "base">Assignee</option>
                            <option value = "Closed">Closed</option>
                            <option value = "fixed">Fixed</option>
                            <option value = "reopen">Reopen</option>
                        </FormSelect>
                        <div>
                            <p>{assigneeErrors}</p>
                        </div>
                    </Col>
                    <Col>
                    </Col>
                    <Col>
                    </Col>
                    <Col>
                    </Col>
                    
                </Row>
                <Row>
                    <Col>

                        <input disabled onChange={changeDesc}className = "text" id = "desc" placeholder= "Description"></input>
                        <div>
                            <p>{descErrors}</p>
                        </div>
                    </Col>
                    <Col>
                        
                        <input disabled onChange = {changeUser}className = "text" id = "user" placeholder= "User Data (Optional)"></input>
                        <div>
                            <p>{userErrors}</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <hr/>
                    <Row>
                        <Col md = {{span:4, offset: 2}}>
                            <p>
                                Comments
                            </p>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col md = {{span:1, offset: 2}}>
                            <img id="profiles" src = "https://via.placeholder.com/150" alt = "profile" ></img>
                        </Col>
                        <Col md = {5}>
                            <input id = "commentButton" className = "comment" placeholder = "Add a comment                 "></input>
                            <i id = "commentButton" className="fas fa-paper-plane" src="plane.png" ></i>
                        </Col>
                    </Row>
                    <Row>
                        <Col md = {{span:6, offset: 2}}>
                           <Container id= "actualComments">
                                <Row>
                                    <Col md = {2}>
                                        <img id="profiles" src = "https://via.placeholder.com/150" alt = "profile"></img>
                                    </Col>
                                    <Col md = {2}>
                                        <p id = "name">Names</p>
                                    </Col>
                                    <Col md = {{offset: 3}}>
                                        <p id= "time">
                                        2024-06-21 || 15:23:13 
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p id="comment">
                                        Great find guys, although I think there might be some alternative to fix this issue. Lets try to close this ASAP!
                                        </p>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                    <Row>
                        <Col md = {{span:6, offset: 2}}>
                            <Container>
                                    <Row>
                                        <Col md = {2}>
                                            <img id="profiles" src = "https://via.placeholder.com/150" alt = "profile"></img>
                                        </Col>
                                        <Col md = {2}>
                                            <p id = "name">Names</p>
                                        </Col>
                                        <Col md = {{ offset: 3}}>
                                            <p id= "time">
                                            2024-06-21 || 15:23:13 
                                            </p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <p id= "comment">
                                            Great find guys, although I think there might be some alternative to fix this issue. Lets try to close this ASAP! Great find guys, although I think there might be some alternative to fix this issue. Lets try to close this ASAP!
                                            </p>
                                        </Col>
                                    </Row>
                                </Container>
                            </Col>
                    </Row>
                    

                </Row>

                
           </Container>
    
   </div>
  )
}

export default BugAddContent
