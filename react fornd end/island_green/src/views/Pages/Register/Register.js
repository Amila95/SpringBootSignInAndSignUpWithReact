import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
// import axios from "axios";
import classnames from "classnames";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {registerUser} from '../../../action/authAction';
import FacebookRegistation from 'react-facebook-login';
import GoogleRegistation from 'react-google-login';


class Register extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      // email: "",
      password: "",
      confirmPassword: "",
      errors: {}
    } 
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      // email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };

    this.props.registerUser(newUser, this.props.history);

    // axios.post('http://localhost:8080/api/users/register',newUser)
    
    // .then(res => console.log(res.data))
    // .catch(err => this.setState({errors: err.response.data}));
  }

    onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }
    register(res, type) {
      let postData;
      if (type === 'facebook' && res.email) {
        postData = {
          username: res.email,
          provider: type,
          // email: res.email,
          provider_id: res.id,
          token: res.accessToken,
          provider_pic: res.picture.data.url,
          // password:"amila"
        };
      }
  
      if (type === 'google' && res.w3.U3) {
        postData = {
          username: res.w3.U3,
          provider: type,
          // email: res.w3.U3,
          provider_id: res.El,
          token: res.Zi.access_token,
          provider_pic: res.w3.Paa,
          // password:"amila"
        };
      }
  
      // if (postData) {
      //   PostData('registerSocial', postData).then((result) => {
      //     let responseJson = result;
      //     sessionStorage.setItem("userData", JSON.stringify(responseJson));
      //     this.setState({redirect: true});
      //   });
      // } else {}
      this.props.registerUser(postData, this.props.history);
  
    }
    

  render() {
    const responseFacebook = (response) => {
      console.log("facebook console");
      console.log(response);
      this.register(response, 'facebook');
    }
    const regitserGoogle = (response) => {
      console.log("google console");
      console.log(response);
      this.register(response, 'google');
    }

    const {errors} = this.state ;
    return (
      <div className="app flex-row align-items-center">
      
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.onSubmit}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    {/* <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Username" autoComplete="username" name="username" value={this.state.name} onChange={this.onChange}/>
                    </InputGroup> */}
                    <InputGroup  className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text"  className={classnames({'is-invalid form-control': errors.username})}placeholder="Email" autoComplete="email" name="username" value={this.state.username} onChange={this.onChange}/>
                    {errors.username && (<div className="invalid-feedback">{errors.username}</div>)}
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" className={classnames({'is-invalid form-control': errors.password})}
                      placeholder="Password" autoComplete="new-password" name="password" value={this.state.Password} onChange={this.onChange} />
                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" className={classnames({'is-invalid form-control': errors.confirmPassword})}
                      placeholder="Repeat password" autoComplete="new-password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.onChange}/>
                    {errors.confirmPassword && (<div className="invalid-feedback">{errors.confirmPassword}</div>)}
                    </InputGroup>
                    <Button color="success" block>Create Account</Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                   
                  
                       <Button className="btn-facebook mb-1" block><span>  <FacebookRegistation
        appId="1188398228005933"
        autoLoad={false}
        cssClass="btn-facebook mb-1"
        textButton="Facebook"
        fields="name,email,picture"
        callback={responseFacebook}
      /></span></Button> 
                    </Col>
                    <Col xs="12" sm="6">
                      <Button  block><span><GoogleRegistation
              clientId="483254916027-2nf6nm1i9qt6p4brst2cmgdmkefdcets.apps.googleusercontent.com"
              buttonText="Google"
              onSuccess={regitserGoogle}
              onFailure={regitserGoogle}/></span></Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Register.propTypes={
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state)=>({
  auth:state.auth,
  errors: state.errors
})

export default connect(mapStateToProps,{registerUser})(withRouter(Register));
