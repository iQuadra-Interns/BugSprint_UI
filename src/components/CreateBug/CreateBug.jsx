import React, { useState } from 'react';
import { Container, Row, Col, Button, Alert, FormSelect } from 'react-bootstrap';
import "./CreateBug.css";

let editable = true;

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
}

function CreateBug() {
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
    
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function validate(){
        let boo = true;
        
        const bugTitle = document.getElementById("bugTitle");
        let titleValue = bugTitle.value;
        if(titleValue === ""){
            settitleErrors("Required");
            boo = false;
        }

        const bugDesc = document.getElementById("desc");
        let description = bugDesc.value;
        if(description === ""){
            setdescErrors("Required");
            boo = false;
        }

        const bugUser = document.getElementById("user");
        let user = bugUser.value;
        if(user === ""){
            setuserErrors("Required");
            boo = false;
        }

        const scenarioElement = document.getElementById("scenario");
        let scenarioValue = scenarioElement.value;
        if(scenarioValue === "base" || scenarioValue === ""){
            setscenarioErrors("Required");
            boo = false;
        }

        const productElement = document.getElementById("product");
        let productValue = productElement.value;
        if(productValue === "base" || productValue === ""){
            setproductErrors("Required");
            boo = false;
        }

        const enviornmentElement = document.getElementById("enviornment");
        let enviornmentValue = enviornmentElement.value;
        if(enviornmentValue === "base" || enviornmentValue === ""){
            setenviornmentErrors("Required");
            boo = false;
        }

        const testingElement = document.getElementById("testing");
        let testingValue = testingElement.value;
        if(testingValue === "base" || testingValue === ""){
            settestingErrors("Required");
            boo = false;
        }

        const rootcauseElement = document.getElementById("rootcause");
        let rootcauseValue = rootcauseElement.value;
        if(rootcauseValue === "base" || rootcauseValue === ""){
            setrootErrors("Required");
            boo = false;
        }

        const priorityElement = document.getElementById("priority");
        let priorityValue = priorityElement.value;
        if(priorityValue === "base" || priorityValue === ""){
            setpriorityErrors("Required");
            boo = false;
        }

        const assigneeElement = document.getElementById("assignee");
        let assigneeValue = assigneeElement.value;
        if(assigneeValue === "base" || assigneeValue === ""){
            setassigneeErrors("Required");
            boo = false;
        }

        if(boo){
            toggleDisable();
            handleSubmit(); // Call the submit function here
        }
    }

    async function handleSubmit() {
        const bugTitle = document.getElementById("bugTitle").value;
        const bugDesc = document.getElementById("desc").value;
        const bugUser = document.getElementById("user").value;
        const scenario = document.getElementById("scenario").value;
        const product = document.getElementById("product").value;
        const enviornment = document.getElementById("enviornment").value;
        const testing = document.getElementById("testing").value;
        const rootcause = document.getElementById("rootcause").value;
        const priority = document.getElementById("priority").value;
        const assignee = document.getElementById("assignee").value;

        const payload = {
            product_id: product,
            environment_id: enviornment,
            scenario_id: scenario,
            testing_medium: testing,
            description: bugDesc,
            user_data: bugUser,
            priority_id: priority,
            reported_by: 1, // Assuming the current user ID is 1
            assignee_id: assignee,
            root_cause_location: rootcause,
            root_cause: "Some root cause", // Add the root cause
            resolution: "In Progress", // Add the resolution
            status: 0
        };

        try {
            const response = await fetch('https://esayaabfpizs3huhtuo6hevhia0parjp.lambda-url.us-east-1.on.aws/api/add-bug', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result);
                if (result.status.status === false) {
                    setSuccessMessage(result.status.message || "Bug successfully added!");
                    setErrorMessage("");  // Clear the error message on success
                } else {
                    setErrorMessage(result.status.message || "Operation failed");
                    setSuccessMessage("");
                }
            } else {
                setErrorMessage("Error adding bug, please try again.");
                setSuccessMessage("");
            }
        } catch (error) {
            setErrorMessage("Error: " + error.message);
            setSuccessMessage("");
        }
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col md={2}>
                        <button id="backArrow"> &larr;</button>
                    </Col>
                    <Col md={2}>
                        <p id="create">Create Bug</p>
                    </Col>
                    <Col md={{ span: 2, offset: 6 }}>
                        <button id="save" onClick={validate} type="submit">Save</button>
                    </Col>
                </Row>
            </Container>

            {/* Display success or error message */}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <Container>
                <Row>
                    <Col md={6}>
                        <input onChange={() => settitleErrors("")} id="bugTitle" type="text" placeholder="Bug Title" className="text"></input>
                        <div>
                            <p>{titleErrors}</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormSelect onChange={() => setscenarioErrors("")} className="drop" id="scenario" aria-label="Default select example">
                            <option value="base">Scenario</option>
                            <option value="Closed">Closed</option>
                            <option value="Fixed">Fixed</option>
                            <option value="Reopen">Reopen</option>
                        </FormSelect>
                        <div>
                            <p>{scenarioErrors}</p>
                        </div>
                    </Col>
                    <Col>
                        <FormSelect onChange={() => setproductErrors("")} className="drop" id="product" aria-label="Default select example">
                            <option value="base">Product Name</option>
                            <option value="Closed">Closed</option>
                            <option value="Fixed">Fixed</option>
                            <option value="Reopen">Reopen</option>
                        </FormSelect>
                        <div>
                            <p>{productErrors}</p>
                        </div>
                    </Col>
                    <Col>
                        <FormSelect onChange={() => setenviornmentErrors("")} className="drop" id="enviornment" aria-label="Default select example">
                            <option value="base">Environment</option>
                            <option value="Closed">Closed</option>
                            <option value="Fixed">Fixed</option>
                            <option value="Reopen">Reopen</option>
                        </FormSelect>
                        <div>
                            <p>{enviornmentErrors}</p>
                        </div>
                    </Col>
                    <Col>
                        <FormSelect onChange={() => settestingErrors("")} className="drop" id="testing" aria-label="Default select example">
                            <option value="base">Testing Medium</option>
                            <option value="Closed">Closed</option>
                            <option value="Fixed">Fixed</option>
                            <option value="Reopen">Reopen</option>
                        </FormSelect>
                        <div>
                            <p>{testingErrors}</p>
                        </div>
                    </Col>
                    <Col>
                        <FormSelect onChange={() => setrootErrors("")} className="drop" id="rootcause" aria-label="Default select example">
                            <option value="base">Root Cause Location</option>
                            <option value="Closed">Closed</option>
                            <option value="Fixed">Fixed</option>
                            <option value="Reopen">Reopen</option>
                        </FormSelect>
                        <div>
                            <p>{rootcauseErrors}</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormSelect onChange={() => setpriorityErrors("")} className="drop" id="priority" aria-label="Default select example">
                            <option value="base">Priority</option>
                            <option value="Closed">Closed</option>
                            <option value="Fixed">Fixed</option>
                            <option value="Reopen">Reopen</option>
                        </FormSelect>
                        <div>
                            <p>{priorityErrors}</p>
                        </div>
                    </Col>
                    <Col>
                        <FormSelect onChange={() => setassigneeErrors("")} className="drop" id="assignee" aria-label="Default select example">
                            <option value="base">Assignee</option>
                            <option value="Closed">Closed</option>
                            <option value="Fixed">Fixed</option>
                            <option value="Reopen">Reopen</option>
                        </FormSelect>
                        <div>
                            <p>{assigneeErrors}</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <input onChange={() => setdescErrors("")} className="text" id="desc" placeholder="Description"></input>
                        <div>
                            <p>{descErrors}</p>
                        </div>
                    </Col>
                    <Col>
                        <input onChange={() => setuserErrors("")} className="text" id="user" placeholder="User Data (Optional)"></input>
                        <div>
                            <p>{userErrors}</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default CreateBug;
