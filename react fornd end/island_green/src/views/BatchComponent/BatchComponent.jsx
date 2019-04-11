import React, { Component } from "react";
import {
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

import "./BatchComponent.css";
import { Alert } from "reactstrap";
import TablePagination from "@material-ui/core/TablePagination";
import Tooltip from "@material-ui/core/Tooltip";
import { red } from "@material-ui/core/colors";

const numberValidator = RegExp(/^\.?\d*$/);

// let today = new Date();
// document.querySelector("#expiarydate").value = today;
// document.querySelector("#expiarydate").min = today;

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });
  Object.values(rest).forEach(val => val === "" && (valid = false));
  console.log(rest);
  return valid;
};

class BatchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      batches: [],
      products: [],
      id: "Auto Generated Id",
      color: "",
      size: "",
      manufactureDate: "",
      expiryDate: "",
      quantity: "",
      productId: "",
      productName: "select",
      createdBy: null,
      modifiedBy: null,
      createdDate: null,
      modifiedDate: null,
      btn: true,
      visible: false,
      formErrors: {
        color: "",
        size: "",
        manufactureDate: "",
        expiryDate: "",
        quantity: "",
        productId: ""
      },
      page: 0,
      rowsPerPage: 5
    };
  }

  componentDidMount() {
    this.loadAllBatches();
    this.loadAllProducts();
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  getCurrentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }

    today = yyyy + "-" + mm + "-" + dd;
    return today;
  }

  onDismiss = () => {
    this.setState({ visible: false });
  };

  resetField = () => {
    this.refs.color.value = "";
    this.refs.size.value = "";
    this.refs.manufacturedate.value = "";
    this.refs.quantity.value = "";
    this.refs.expirydate.value = "";
    this.refs.option.value = this.state.productName;
  };

  resetState = () => {
    this.setState({
      color: "",
      size: "",
      manufactureDate: "",
      expiryDate: "",
      quantity: "",
      productId: "",
      productName: "select"
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      const newBatch = {
        color: this.state.color,
        size: this.state.size,
        manufactureDate: this.state.manufactureDate,
        quantity: this.state.quantity,
        expiryDate: this.state.expiryDate,
        createdBy: "majutharan",
        createdDate: new Date(),
        modifiedBy: this.state.modifiedBy,
        modifiedDate: this.state.modifiedDate,
        product: {
          id: this.state.productId
        }
      };
      fetch("http://localhost:8080/batch-service/save-batch", {
        method: "post",
        body: JSON.stringify(newBatch),
        headers: {
          "content-type": "application/json",
          "cache-control": "no-cache"
        }
      }).then(res => {
        this.loadAllBatches();
        this.loadAllProducts();
        this.resetState();
        this.resetField();
      });
      console.log(newBatch);
      console.log("clicked!!");
      // console.log(`
      // color: ${this.state.color},
      // size: ${this.state.size},
      // manufactureDate: ${this.state.manufactureDate},
      // expiaryDate: ${this.state.expiryDate},
      // quantity: ${this.state.quantity},
      // productId: ${this.state.productId}
      // `);
    } else {
      console.log("form invalid!");
      this.setState({
        visible: true
      });
    }

    // if (
    //   this.refs.color.value === "" ||
    //   this.refs.size.value === "" ||
    //   this.refs.manufacturedate.value === "" ||
    //   this.refs.quantity.value === "" ||
    //   this.refs.expirydate.value === "" ||
    //   this.refs.option.value === ""
    // ) {
    //   e.preventDefault();
    // } else {
    //   console.log("successfully added!");
    // }
  };

  handleChange = e => {
    e.preventDefault();

    const { name, value } = e.target;
    let formErrors = this.state.formErrors;
    // console.log("Name: ", name);
    // console.log("value: ", value);

    switch (name) {
      case "color":
        formErrors.color =
          value.length < 2 && value.length > 0
            ? "color should be minimum 3 characters"
            : "";
        break;

      case "size":
        formErrors.size = numberValidator.test(value)
          ? ""
          : "size should be number";
        break;

      case "manufactureDate":
        formErrors.manufactureDate =
          value.length === "" ? "manufacturedate is required!" : "";
        break;

      case "expiryDate":
        formErrors.expiryDate =
          value.length === "mm/dd/yyyy" ? "expiarydate is required!" : "";
        break;

      case "quantity":
        formErrors.quantity = numberValidator.test(value)
          ? ""
          : "quantity should be number";
        break;

      case "productId":
        formErrors.productId = numberValidator.test(value)
          ? ""
          : "select product";
        break;

      default:
        break;
    }

    // console.log(formErrors);
    this.setState({ formErrors, [name]: value }, () => {
      console.log(this.state);
    });
  };

  loadAllBatches = () => {
    fetch("http://localhost:8080/batch-service/get-all-batches")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            batches: result
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
  };

  loadAllProducts = () => {
    fetch("http://localhost:8080/product-service/get-all-products")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            products: result
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
  };

  // saveBatches = () => {
  //   const newBatch = {
  //     color: this.refs.color.value,
  //     size: this.refs.size.value,
  //     manufactureDate: this.refs.manufacturedate.value,
  //     quantity: this.refs.quantity.value,
  //     expiryDate: this.refs.expirydate.value,
  //     product: {
  //       id: this.refs.option.value
  //     }
  //   };
  //   fetch("http://localhost:8080/batch-service/save-batch", {
  //     method: "post",
  //     body: JSON.stringify(newBatch),
  //     headers: {
  //       "content-type": "application/json",
  //       "cache-control": "no-cache"
  //     }
  //   }).then(
  //     function(response) {
  //       console.log(response);
  //     },
  //     this.loadAllBatches(),
  //     this.loadAllProducts()
  //   );
  //   console.log(newBatch);
  //   console.log("clicked!!");
  // };
  findBatch = id => {
    this.setState({
      btn: false
    });
    console.log("btn info", this.state.btn);
    fetch("http://localhost:8080/batch-service/get-batch?id=" + id)
      .then(res => res.json())
      .then(
        response => {
          this.setState(
            {
              id: response.id,
              color: response.color,
              size: response.size,
              manufactureDate: response.manufactureDate,
              expiryDate: response.expiryDate,
              quantity: response.quantity,
              productName: response.product.name,
              productId: response.product.id,
              createdBy: response.createdBy,
              modifiedBy: response.modifiedBy,
              createdDate: response.createdDate,
              modifiedDate: response.modifiedDate
            },
            () => {
              this.refs.color.value = response.color;
              this.refs.size.value = response.size;
              this.refs.manufacturedate.value = response.manufactureDate;
              this.refs.quantity.value = response.quantity;
              this.refs.expirydate.value = response.expiryDate;
              this.refs.option.value = response.product.id;
            }
          );
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
  };
  updateValues = id => {
    if (formValid(this.state)) {
      const updateBatch = {
        color: this.state.color,
        size: this.state.size,
        manufactureDate: this.state.manufactureDate,
        quantity: this.state.quantity,
        expiryDate: this.state.expiryDate,
        modifiedBy: "majutharan",
        modifiedDate: new Date(),
        createdBy: this.state.createdBy,
        createdDate: this.state.createdDate,
        product: {
          id: this.state.productId
        }
      };
      fetch("http://localhost:8080/batch-service/update-batch?id=" + id, {
        method: "put",
        body: JSON.stringify(updateBatch),
        headers: {
          "content-type": "application/json",
          "cache-control": "no-cache"
        }
      }).then(
        res => {
          this.loadAllBatches();
          this.loadAllProducts();
          // this.resetState();
          // this.resetField();
        },

        this.setState({
          btn: true
        })
        // ((this.refs.color.value = ""),
        // (this.refs.size.value = ""),
        // (this.refs.manufacturedate.value = ""),
        // (this.refs.quantity.value = ""),
        // (this.refs.expirydate.value = ""),
        // (this.refs.option.value = ""))
      );
      console.log(updateBatch);
      console.log("clicked!!");
    } else {
      this.setState({
        visible: true
      });
      console.log("invalid form");
    }
  };

  getBtn() {
    let button =
      this.state.btn === true ? (
        <button
          // onClick={this.saveBatches}
          onClick={this.handleSubmit}
          className="btn btn-success"
          style={{ width: 81, height: 33 }}
        >
          Add
        </button>
      ) : (
        <button
          onClick={() => {
            this.updateValues(this.state.id);
            this.resetState();
            this.resetField();
          }}
          className="btn btn-primary"
          style={{ width: 81, height: 33 }}
        >
          Edit
        </button>
      );
    return button;
  }

  getToolTip() {
    let colorTittle = "";
    let sizeTittle = "";
    let quantityTittle = "";
    let manufactureDateTittle = "";
    let expiaryDateTittle = "";
    let productTittle = "";

    colorTittle = this.state.formErrors.color.length > 0 && (
      <span class="badge badge-danger">Minimum 2 value</span>
    );

    sizeTittle = this.state.formErrors.size.length > 0 && (
      <span class="badge badge-danger">Value is number</span>
    );

    quantityTittle = this.state.formErrors.quantity.length > 0 && (
      <span class="badge badge-danger">Value is number</span>
    );

    manufactureDateTittle = this.state.formErrors.manufactureDate.length >
      0 && <span class="badge badge-danger">required</span>;

    expiaryDateTittle = this.state.formErrors.expiryDate.length > 0 && (
      <span class="badge badge-danger">required</span>
    );

    productTittle = this.state.formErrors.productId.length > 0 && (
      <span class="badge badge-danger">required</span>
    );

    let tittle = [];
    this.tittle = { colorTittle, sizeTittle, quantityTittle };
    return tittle;
  }

  render() {
    const { formErrors } = this.state;
    const { batches, rowsPerPage, page } = this.state;
    let tittle = this.getToolTip();
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, batches.length - page * rowsPerPage);
    let filteredBatches = this.state.batches.filter(color => {
      return (
        color.color.toLowerCase().indexOf(this.state.color.toLowerCase()) !==
          -1 &&
        color.size.indexOf(this.state.size) !== -1 &&
        color.quantity.indexOf(this.state.quantity) !== -1 &&
        color.manufactureDate.indexOf(this.state.manufactureDate) !== -1 &&
        color.expiryDate.indexOf(this.state.expiryDate) !== -1
      );
    });
    return (
      <div>
        <Alert
          color="danger"
          isOpen={this.state.visible}
          toggle={this.onDismiss}
        >
          All fields are required!
        </Alert>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> Batch List
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Color {this.tittle.colorTittle}</th>
                      <th>Size {this.tittle.sizeTittle}</th>
                      <th>Manufacture Date</th>
                      <th>Quantity {this.tittle.quantityTittle}</th>
                      <th>Expiry Date</th>
                      <th>Product</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          style={{ borderRadius: 5, boxShadow: 0 }}
                          type="text"
                          name="id"
                          value={this.state.id}
                          disabled
                        />
                      </td>

                      <td>
                        <input
                          className={
                            formErrors.color.length > 0 ? "error" : null
                          }
                          style={{ borderRadius: 5, boxShadow: 0 }}
                          type="text"
                          name="color"
                          ref="color"
                          defaultValue={this.state.color}
                          onChange={this.handleChange}
                        />
                        {/* {formErrors.color.length > 0 && (
                          <span className="errorMessage">
                            {formErrors.color}
                          </span>
                        )} */}
                      </td>
                      <td>
                        <input
                          className={
                            formErrors.size.length > 0 ? "error" : null
                          }
                          style={{ borderRadius: 5, boxShadow: 0 }}
                          type="text"
                          name="size"
                          ref="size"
                          defaultValue={this.state.size}
                          onChange={this.handleChange}
                        />
                        {/* {formErrors.size.length > 0 && (
                          <span className="errorMessage">
                            {formErrors.size}
                          </span>
                        )} */}
                      </td>
                      <td>
                        <input
                          id="manufacturedate"
                          className={
                            formErrors.manufactureDate.length > 0
                              ? "error"
                              : null
                          }
                          style={{ borderRadius: 5, boxShadow: 0 }}
                          type="date"
                          name="manufactureDate"
                          ref="manufacturedate"
                          max={this.getCurrentDate()}
                          defaultValue={this.state.manufactureDate}
                          onChange={this.handleChange}
                        />
                        {/* {formErrors.manufactureDate.length > 0 && (
                          <span className="errorMessage">
                            {formErrors.manufactureDate}
                          </span>
                        )} */}
                      </td>
                      <td>
                        <input
                          className={
                            formErrors.quantity.length > 0 ? "error" : null
                          }
                          style={{ borderRadius: 5, boxShadow: 0 }}
                          type="text"
                          name="quantity"
                          ref="quantity"
                          defaultValue={this.state.quantity}
                          onChange={this.handleChange}
                        />
                        {/* {formErrors.quantity.length > 0 && (
                          <span className="errorMessage">
                            {formErrors.quantity}
                          </span>
                        )} */}
                      </td>
                      <td>
                        <input
                          id="expiarydate"
                          className={
                            formErrors.expiryDate.length > 0 ? "error" : null
                          }
                          style={{ borderRadius: 5, boxShadow: 0 }}
                          type="date"
                          name="expiryDate"
                          ref="expirydate"
                          min={this.getCurrentDate()}
                          defaultValue={this.state.expiryDate}
                          onChange={this.handleChange}
                        />
                        {/* {formErrors.expiryDate.length > 0 && (
                          <span className="errorMessage">
                            {formErrors.expiryDate}
                          </span>
                        )} */}
                      </td>
                      <td>
                        <select
                          className={
                            formErrors.productId.length > 0 ? "error" : null
                          }
                          style={{ borderRadius: 5, boxShadow: 0 }}
                          ref="option"
                          name="productId"
                          onChange={this.handleChange}
                        >
                          <option value={this.state.productId}>
                            {this.state.productName}
                          </option>
                          {this.state.products.map(option => (
                            <option
                              ref="productName"
                              key={option.id}
                              value={option.id}
                              // onChange={this.setState.product.id}
                            >
                              {option.name}
                            </option>
                          ))}
                        </select>
                        {/* {formErrors.productId.length > 0 && (
                          <span className="errorMessage">
                            {formErrors.productId}
                          </span>
                        )} */}
                      </td>
                      <td>{this.getBtn()}</td>
                    </tr>
                    {filteredBatches
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map(row => (
                        <tr key={row.id}>
                          <td>{row.id}</td>

                          <td>{row.color}</td>
                          <td>{row.size}</td>
                          <td>{row.manufactureDate}</td>
                          <td>{row.quantity}</td>
                          <td>{row.expiryDate}</td>
                          <td>{row.product.name}</td>
                          <td>
                            {" "}
                            <a
                              onClick={() => {
                                this.findBatch(row.id);
                              }}
                            >
                              <i
                                className="cui-note icons font-2xl"
                                style={{ paddingLeft: 25, color: "green" }}
                              />
                            </a>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
                <nav>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={3}
                    count={batches.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      native: true
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    // ActionsComponent={TablePaginationActionsWrapped}
                  />
                </nav>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default BatchComponent;
