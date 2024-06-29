import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Formik } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });




function BugAddContent() {

    <
  return (
    <div>
      <Container>
        <Row>
            <Col md= {2}>

            </Col>

        </Row>
      </Container>
    </div>
  )
}

export default BugAddContent
