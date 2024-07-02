import React from 'react'
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Formik, Field, Form } from 'formik';
import { FormSelect } from 'react-bootstrap';


let editable = true;

function validateTitle(value) {
    let error;
    if (!value){
        error = 'Required';
    }
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
    const [scenarioErrors, setscenarioErrors] = useState("");
    const [productErrors, setproductErrors] = useState("");
    const [enviornmentErrors, setenviornmentErrors] = useState("");
    const [testingErrors, settestingErrors] = useState("");
    const [rootcauseErrors, setrootErrors] = useState("");
    const [priorityErrors, setpriorityErrors] = useState("");
    const [assigneeErrors, setassigneeErrors] = useState("");
   

    function valudate(){
        toggleDisable();
        if(scenarioErrors === "base"|| scenarioErrors === ""){
            setscenarioErrors("Required");
            
        }
        if(productErrors === "base"|| productErrors === ""){
            setproductErrors("Required");
            
        }
        if(enviornmentErrors === "base"|| enviornmentErrors === ""){
            setenviornmentErrors("Required");
            
        }
        if(testingErrors === "base"|| testingErrors === ""){
            settestingErrors("Required");
            
        }
        if(rootcauseErrors === "base"|| rootcauseErrors === ""){
            setrootErrors("Required");
            
        }
        if(priorityErrors === "base"|| priorityErrors === ""){
            setpriorityErrors("Required");
            
        }
        if(assigneeErrors === "base"|| assigneeErrors === ""){
            setassigneeErrors("Required");
            
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
                    <button id="save" onClick = {valudate}type="submit">Save</button>
                    
                </Col>
            </Row>
        </Container>
     
     <Formik
       initialValues={{
         title: '',
         desc: '',
         user:'',
       }}
       
     >
       {({ errors, touched, isValidating }) => (
         <Form>
            <Container>
                <Row>
                    <Col md ={6}>
                        
                        <Field name = "title" id = "bugTitle" placeholder= "Bug Title" validate={validateTitle} />
                        
                        {errors.title && touched.title && <div>{errors.title}</div>}
                
                        
                        
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormSelect  onChange={changeScenario}  className = "drop" id="scenario" aria-label="Default select example">
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
                        <FormSelect onChange= {changeProduct} className = "drop"id = "product" aria-label="Default select example">
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
                        <FormSelect onChange={changeEnviornment}className = "drop" id = "enviornment"aria-label="Default select example">
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
                        <FormSelect onChange={changeTesting}className = "drop" id = "testing" aria-label="Default select example">
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
                        <FormSelect onChange={changeRootCause} className = "drop"id="rootcause" aria-label="Default select example">
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
                    <FormSelect onChange={changePriority} className = "drop"id="priority" aria-label="Default select example">
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
                        <FormSelect onChange={changeAssignee} className = "drop" id="assignee" aria-label="Default select example">
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
                        <Field className = "text" name = "desc" id = "desc" placeholder= "Description" validate={validateDesc} />
                            
                            {errors.desc && touched.desc && <div>{errors.desc}</div>}
                    </Col>
                    <Col>
                        <Field className = "text" name = "user" id = "user" placeholder= "User Data (Optional)" validate={validateUser} />
                            
                            {errors.user && touched.user && <div>{errors.user}</div>}
                    </Col>
                </Row>

                
           </Container>
         </Form>
       )}
     </Formik>
   </div>
  )
}

export default BugAddContent
