import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux';
import { Message } from 'semantic-ui-react';
import ForgotPasswordPageForm from '../forms/ForgotPasswordForm';
import { resetPasswordRequest } from '../../actions/auth'; 

class ForgotPasswordPage extends React.Component {
    state={
        success:false
    };

    submit = data =>
    this.props.resetPasswordRequest(data)
    .then(()=>this.setState({success:true}));

  render() {
    return (
      <div>
          {this.state.success ? <Message>Email has been sent.</Message> : 
          <ForgotPasswordPageForm submit={this.submit}/>}
      </div>
    );
  }
}

ForgotPasswordPage.propTypes={
    resetPasswordRequest:PropTypes.func.isRequired
};

export default connect(null,{resetPasswordRequest})(ForgotPasswordPage);
