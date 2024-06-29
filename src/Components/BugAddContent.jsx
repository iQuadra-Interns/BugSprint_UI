import React from 'react'
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

    editable = !editable;
    bugTitle.disabled = !bugTitle.disabled;
    bugDesc.disabled = !bugDesc.disabled;
    bugUser.disabled = !bugUser.disabled;
    
    
}




function BugAddContent() {

    
  return (
    <div>
        <Container>
            <Row>
                <Col md = {2}>
                    <button>Back Arrow</button>
                </Col>
                <Col md = {2}>
                    <p>Create Bug</p>
                </Col>
                <Col md={{ span: 2, offset: 6 }}>
                    <button onClick={toggleDisable}>Save</button>
                </Col>
            </Row>
        </Container>
     
     <Formik
       initialValues={{
         title: '',
         desc: '',
         user:''
       }}
       
     >
       {({ errors, touched, isValidating }) => (
         <Form>
            <Container>
                <Row>
                    <Col md ={2}>
                        
                        <Field name = "title" id = "bugTitle" placeholder= "Bug Title" validate={validateTitle} />
                        
                        {errors.title && touched.title && <div>{errors.title}</div>}
                
                        
                        
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormSelect  aria-label="Default select example">
                            <option>Scenario</option>
                            <option>Closed</option>
                            <option>Fixed</option>
                            <option>Reopen</option>
                        </FormSelect>
                        
                    </Col>
                    <Col>
                        <FormSelect  aria-label="Default select example">
                            <option>Product Name</option>
                            <option>Closed</option>
                            <option>Fixed</option>
                            <option>Reopen</option>
                        </FormSelect>
                        
                    </Col>
                    <Col>
                        <FormSelect  aria-label="Default select example">
                            <option>Enviornment</option>
                            <option>Closed</option>
                            <option>Fixed</option>
                            <option>Reopen</option>
                        </FormSelect>
                        
                    </Col>
                    <Col>
                        <FormSelect  aria-label="Default select example">
                            <option>Testing Medium</option>
                            <option>Closed</option>
                            <option>Fixed</option>
                            <option>Reopen</option>
                        </FormSelect>
                        
                    </Col>
                    <Col>
                        <FormSelect  aria-label="Default select example">
                            <option>Root Cause Location</option>
                            <option>Closed</option>
                            <option>Fixed</option>
                            <option>Reopen</option>
                        </FormSelect>
                        
                    </Col>

                </Row>
                <Row>
                    <Col >
                    <FormSelect  aria-label="Default select example">
                            <option>Priority</option>
                            <option>Closed</option>
                            <option>Fixed</option>
                            <option>Reopen</option>
                        </FormSelect>
                    </Col>
                    <Col >
                        <FormSelect  aria-label="Default select example">
                            <option>Assignee</option>
                            <option>Closed</option>
                            <option>Fixed</option>
                            <option>Reopen</option>
                        </FormSelect>
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
                        <Field name = "desc" id = "desc" placeholder= "Description" validate={validateDesc} />
                            
                            {errors.desc && touched.desc && <div>{errors.desc}</div>}
                    </Col>
                    <Col>
                        <Field name = "user" id = "user" placeholder= "User Data (Optional)" validate={validateUser} />
                            
                            {errors.user && touched.user && <div>{errors.user}</div>}
                    </Col>
                </Row>

                <button type="submit">Submit</button>
           </Container>
         </Form>
       )}
     </Formik>
   </div>
  )
}

export default BugAddContent
