import * as React from 'react';
import { Link } from 'react-router-dom';
import { Container, Col, Row } from 'reactstrap';

export const AppHeader: React.SFC = () => {
  return (
    <Container fluid={true} className="app-header">
      <Row noGutters={true}>
        <Col xs="auto" className="app-header__tab">
          <Link to="/">Home</Link>
        </Col>
        <Col xs="auto" className="app-header__tab">
          <Link to="/import">Import</Link>
        </Col>
        <Col />
        <Col xs="auto" className="app-header__user">
          User Login info here
        </Col>
      </Row>
    </Container>
  );
};
