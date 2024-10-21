import React, { useState } from 'react';
import { Container, Row, Col, Button, Alert, FormSelect } from 'react-bootstrap';
import "./CreateBug.css";

let editable = true;

function toggleDisable(){
    const fields = ["bugTitle", "desc", "user", "scenario", "product", "enviornment", "testing", "rootcause", "priority", "assignee"];
    fields.forEach(id => {
        const element = document.getElementById(id);
        element.disabled = !element.disabled;
    });
    editable = !editable;
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
        let isValid = true;
        
        const checkRequired = (id, setError) => {
            const element = document.getElementById(id);
            if (element.value === "" || element.value === "base") {
                setError("Required");
                isValid = false;
            } else {
                setError("");
            }
        };

        checkRequired("bugTitle", settitleErrors);
        checkRequired("desc", setdescErrors);
        checkRequired("user", setuserErrors);
        checkRequired("scenario", setscenarioErrors);
        checkRequired("product", setproductErrors);
        checkRequired("enviornment", setenviornmentErrors);
        checkRequired("testing", settestingErrors);
        checkRequired("rootcause", setrootErrors);
        checkRequired("priority", setpriorityErrors);
        checkRequired("assignee", setassigneeErrors);

        if(isValid){
            toggleDisable();
            handleSubmit();
        }
    }

    async function handleSubmit() {
        const payload = {
            product_id: document.getElementById("product").value,
            environment_id: document.getElementById("enviornment").value,
            scenario_id: document.getElementById("scenario").value,
            testing_medium: document.getElementById("testing").value,
            description: document.getElementById("desc").value,
            user_data: document.getElementById("user").value,
            priority_id: document.getElementById("priority").value,
            reported_by: 1, // Assuming the current user ID is 1
            assignee_id: document.getElementById("assignee").value,
            root_cause_location: document.getElementById("rootcause").value,
            root_cause: "Some root cause", // Replace with actual value
            resolution: "In Progress", // Replace with actual value
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
                setSuccessMessage(result.status.message || "Bug successfully added!");
                setErrorMessage("");
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
                        <div><p className="error">{titleErrors}</p></div>
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
                        <div><p className="error">{scenarioErrors}</p></div>
                    </Col>
                    <Col>
                        <FormSelect onChange={() => setproductErrors("")} className="drop" id="product" aria-label="Default select example">
                            <option value="base">Product Name</option>
                            <option value="Closed">Closed</option>
                            <option value="Fixed">Fixed</option>
                            <option value="Reopen">Reopen</option>
                        </FormSelect>
                        <div><p className="error">{productErrors}</p></div>
                    </Col>
                    <Col>
                        <FormSelect onChange={() => setenviornmentErrors("")} className="drop" id="enviornment" aria-label="Default select example">
                            <option value="base">Environment</option>
                            <option value="Closed">Closed</option>
                            <option value="Fixed">Fixed</option>
                            <option value="Reopen">Reopen</option>
                        </FormSelect>
                        <div><p className="error">{enviornmentErrors}</p></div>
                    </Col>
                    <Col>
                        <FormSelect onChange={() => settestingErrors("")} className="drop" id="testing" aria-label="Default select example">
                            <option value="base">Testing Medium</option>
                            <option value="Closed">Closed</option>
                            <option value="Fixed">Fixed</option>
                            <option value="Reopen">Reopen</option>
                        </FormSelect>
                        <div><p className="error">{testingErrors}</p></div>
                    </Col>
                    <Col>
                        <FormSelect onChange={() => setrootErrors("")} className="drop" id="rootcause" aria-label="Default select example">
                            <option value="base">Root Cause Location</option>
                            <option value="Closed">Closed</option>
                            <option value="Fixed">Fixed</option>
                            <option value="Reopen">Reopen</option>
                        </FormSelect>
                        <div><p className="error">{rootcauseErrors}</p></div>
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
                        <div><p className="error">{priorityErrors}</p></div>
                    </Col>
                    <Col>
                        <FormSelect onChange={() => setassigneeErrors("")} className="drop" id="assignee" aria-label="Default select example">
                            <option value="base">Assignee</option>
                            <option value="Closed">Closed</option>
                            <option value="Fixed">Fixed</option>
                            <option value="Reopen">Reopen</option>
                        </FormSelect>
                        <div><p className="error">{assigneeErrors}</p></div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <input onChange={() => setdescErrors("")} className="text" id="desc" placeholder="Description"></input>
                        <div><p className="error">{descErrors}</p></div>
                    </Col>
                    <Col>
                        <input onChange={() => setuserErrors("")} className="text" id="user" placeholder="User Data (Optional)"></input>
                        <div><p className="error">{userErrors}</p></div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default CreateBug;
