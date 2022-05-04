import React from 'react';
import PropTypes from 'prop-types';
import {Form,Button,FormGroup,Message} from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';
import { MessageHeader } from 'semantic-ui-react';

class LoginForm extends React.Component{
    state={
        data:{
            email:'',
            password:''
        },
        loading:false,
        errors:{}
    };

    onChange=e=>this.setState({
        data:{...this.state.data, [e.target.name]:e.target.value}
    });

    onSubmit=()=>{
        const errors=this.validate(this.state.data);
        this.setState({errors});
        
        if(Object.keys(errors).length===0){
            this.setState({loading:true})
            this.props.submit(this.state.data)
            .catch(err=>this.setState({errors:err.response.data.errors,loading:false}));

        }
    };

    validate=data=>{
        const errors={};
        if(!Validator.isEmail(data.email)) 
        errors.email="Invalid Email";
        if(!data.password) 
        errors.password='Cant be blank';
        return errors;
    }

    render(){
        const {data,errors,loading}=this.state;
        return(
            
            <Form onSubmit={this.onSubmit} loading={loading}>
                {errors.global && (<Message negative>
                    <MessageHeader>Something went wrong</MessageHeader>
                    <p>{errors.global}</p>
                </Message>)}
                <FormGroup>
                    <label htmlFor=''>Email:</label>
                    <input type="email" id="email" value={data.email} onChange={this.onChange} name="email" placeholder='example@example.com'/>
                    {errors.email && <InlineError text={errors.email}/>}
                </FormGroup><br/>
                <FormGroup>
                    <label htmlFor=''>PassWord:</label>
                    <input type="password" id="password" value={data.password} onChange={this.onChange} name="password" placeholder='Make it secure'/>
                    {errors.password && <InlineError text={errors.password}/>}

                </FormGroup>
                <Button primary>Sign in</Button>
            </Form>
                )
    }
}
LoginForm.propTypes={
    submit:PropTypes.func.isRequired,

}

export default LoginForm;