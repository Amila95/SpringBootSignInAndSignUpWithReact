import React, { Component } from "react";
import { MDBTableEditable } from "mdbreact";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table
} from "reactstrap";

class MerchantComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      merchats: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/merchant-service/get-all-merchants")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  getBatches() {
    let classes = "badge m-2 badge-";
    classes += this.state.items.status = true ? "success" : "danger";
    return classes;
  }

  getStatus() {
    let text = (this.state.items.status = true ? "Active" : "InActive");
    return text;
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> Merchant List
                <button className="btn btn-success float-right">Add</button>
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Id No</th>
                      <th>Email Id</th>
                      <th>Name</th>
                      <th>ContactNo</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.items.map(row => (
                      <tr>
                        <td>{row.id}</td>
                        <td>{row.idNo}</td>
                        <td>{row.emailId}</td>
                        <td>{row.name}</td>
                        <td>{row.contactNo}</td>
                        <td>
                          <span className={this.getBatches()}>
                            {this.getStatus()}
                          </span>
                        </td>
                        <td>
                          {" "}
                          <i
                            className="cui-pencil icons font-2xl "
                            style={{ paddingLeft: 5, color: "blue" }}
                          />
                          <i
                            className="cui-note icons font-2xl"
                            style={{ paddingLeft: 25, color: "green" }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <nav>
                  <Pagination>
                    <PaginationItem>
                      <PaginationLink previous tag="button">
                        Prev
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem active>
                      <PaginationLink tag="button">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink tag="button">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink tag="button">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink tag="button">4</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink next tag="button">
                        Next
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default MerchantComponent;
