import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Form,FormGroup,Button} from 'semantic-ui-react';
import isEmail from 'validator/lib/isEmail';
import InlineError from '../messages/InlineError';

 class SignupForm extends React.Component {
    state={
        data:{
            email:'',
            password:''
        },
        loading:false,
        errors:{}
    };

    onChange=e=>
    this.setState({...this.state,
        data:{...this.state.data,[e.target.name]:e.target.value}
    });

    onSubmit=e=>{
        e.preventDefault();
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

        if(!isEmail(data.email)) errors.email='Invalid email';
        if(!data.password) errors.password='Cant be blank';
        return errors;
    }

    render() {
        const {data,errors,loading}=this.state;

    return (
      
          <Form onSubmit={this.onSubmit} loading={loading}>
                <FormGroup error={!!errors.email}>
                    <label htmlFor='email'>Email:</label>
                    <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={data.email} 
                    onChange={this.onChange} 
                    placeholder='email@email.com'
                    />
                    {errors.email && <InlineError text={errors.email}/>}
                </FormGroup><br/>
                <FormGroup error={!!errors.password}>
                    <label htmlFor='password'>PassWord:</label>
                    <input 
                    type="password" 
                    id="password" 
                    value={data.password} 
                    onChange={this.onChange} 
                    name="password" 
                    placeholder='Make it secure'/>
                    {errors.password && <InlineError text={errors.password}/>}
                </FormGroup>
                <br/>
                <Button primary>Sign Up</Button>
            </Form>
    
    );
  }
}
SignupForm.propTypes={
    submit:PropTypes.func.isRequired
}

export default SignupForm;