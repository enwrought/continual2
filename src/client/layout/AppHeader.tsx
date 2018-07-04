import * as React from 'react';
import { Container, Col, Row } from 'reactstrap';

export class AppHeader extends React.PureComponent<{}, {}> {
  render() {
    return (
      <Container fluid={true} className="app-header">
        <Row noGutters={true}>
          <Col />
          <Col xs="auto" className="app-header__user">
            User Login info here
          </Col>
        </Row>
      </Container>
    );
  }
}
