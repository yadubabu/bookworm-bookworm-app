import React from 'react';
import PropTypes from 'prop-types';
import {Form,Button,FormGroup} from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

class ResetPasswordForm extends React.Component{
    state={
        data:{
           token:this.props.token,
           password:'',
           passwordConfirmation:''
        },
        loading:false,
        errors:{}
    };

    onChange=e=>this.setState({
        data:{...this.state.data, [e.target.name]:e.target.value}
    });

    onSubmit=(e)=>{
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
        if(!data.password) errors.password='Cant be blank';
        if(data.password !== data.passwordConfirmation) 
        errors.password='Password must match';
        return errors;
    }

    render(){
        const {data,errors,loading}=this.state;
        return(
            
            <Form onSubmit={this.onSubmit} loading={loading}>
               <FormGroup error={!!errors.password}>
                    <label htmlFor='password'>New PassWord:</label>
                    <input 
                    type="password" 
                    id="password" 
                    value={data.password} 
                    onChange={this.onChange} 
                    name="password" 
                    placeholder='your new password'/>
                    {errors.password && <InlineError text={errors.password}/>}
                </FormGroup>
                <FormGroup error={!!errors.passwordConfirmation}>
                    <label htmlFor='passwordConfirmation'>Confirm your Password:</label>
                    <input 
                    type="password" 
                    id="passwordConfirmation" 
                    value={data.passwordConfirmation} 
                    onChange={this.onChange} 
                    name="passwordConfirmation" 
                    placeholder='Type it Again'/>
                    {errors.passwordConfirmation && <InlineError text={errors.passwordConfirmation}/>}
                </FormGroup>
                <br/>
                <Button primary>Reset PassWord</Button>
            </Form>
                )
    }
}
ResetPasswordForm.propTypes={
    submit:PropTypes.func.isRequired,
    token:PropTypes.string.isRequired
}

export default ResetPasswordForm;