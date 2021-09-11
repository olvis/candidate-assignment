import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Row, Button, Col} from "react-bootstrap";
import { AppProvider } from './Contexts/AppContex';
import { Main } from './Components/Main';
import { Message } from './Components/Message';

export const App : React.FC = () => {
  return (
    <>
    <AppProvider>
      <Container  className="mt-3">
        <Row>
          <Col><Message /></Col>
        </Row>
        <Row>
          <Col><Main /></Col>
        </Row>
      </Container>
    </AppProvider>
    </>
    
  );
}
