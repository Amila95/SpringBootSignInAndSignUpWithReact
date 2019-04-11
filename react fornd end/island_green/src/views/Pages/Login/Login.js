import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody,CardFooter ,CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import {connect} from 'react-redux';
import {loginUser} from '../../../action/authAction';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import classnames from 'classnames';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';


class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      errors: {}
    } 
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const userData = {
      
      username: this.state.username,
      password: this.state.password,
      
    };


   this.props.loginUser(userData);
   
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
      this.props.loginUser(postData, this.props.history);
  
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

    const { errors } = this.state ;
   

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.onSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text"   className={classnames({'is-invalid form-control': errors.username})} placeholder="Username" autoComplete="email" name="username" value={this.state.username} onChange={this.onChange}/>
                        {errors.username && (<div className="invalid-feedback">{errors.username}</div>)}
                      </InputGroup>

                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password"  className={classnames({'is-invalid form-control': errors.password})} placeholder="Password" autoComplete="current-password" name="password" value={this.state.password} onChange={this.onChange} />
                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                  <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span><FacebookLogin
        appId="1188398228005933"
        cssClass="btn-facebook mb-1"
        fields="name,email,picture"
        textButton="Facebook"
        callback={responseFacebook}
      /></span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button  ><span><GoogleLogin
              clientId="483254916027-2nf6nm1i9qt6p4brst2cmgdmkefdcets.apps.googleusercontent.com"
              buttonText="Google"
              onSuccess={regitserGoogle}
              onFailure={regitserGoogle}/></span></Button>
                    </Col>
                  </Row>
                </CardFooter>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                 
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Login.propTypes ={
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps =(state) =>({
  auth:state.auth,
  errors:state.errors
})

export default connect (mapStateToProps,{loginUser})(withRouter(Login));
