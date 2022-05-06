import React from 'react'
import { Link } from 'react-router-dom';
import { MessageContent } from 'semantic-ui-react';
import { MessageHeader } from 'semantic-ui-react';
import { Message,Icon } from 'semantic-ui-react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {confirm} from '../../actions/auth';

class ConfirmationPage extends React.Component {
    state={
        loading:true,
        success:false
    };

    componentDidMount(){
        this.props.confirm(this.props.match.params.token)
        .then(()=>this.setState({loading:false,success:true}))
        .catch(()=>this.setState({loading:false,success:false}));
    }

  render() {
      const {loading,success}=this.state;
    return (
      <div>
          {loading && (<Message icon>
              <Icon name='circle notched' loading/>
              <MessageHeader>Validating your Email</MessageHeader>
              </Message>
              )}
            {!loading && success && (<Message success icon>
                <Icon name="checkmark" />
                <MessageContent>
                <MessageHeader>Thankyou you.Yuor account has been verified..</MessageHeader>
                <Link to='/dashboard'>Go to your Dashboard</Link>
                </MessageContent>
            </Message>)}
                {!loading && !success && (<Message negative icon>
                    <Icon name='warning sign'/>
                    <MessageContent>
                        <MessageHeader>
                            Oops..Invalid Token it seems
                        </MessageHeader>
                    </MessageContent>
                </Message>)}

      </div>
    );
  }
}

ConfirmationPage.propTypes={
    confirm:PropTypes.func.isRequired,
    match:PropTypes.shape({
        params:PropTypes.shape({
            token:PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default connect(null,{confirm})(ConfirmationPage);