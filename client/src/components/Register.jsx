import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

axios.defaults.withCredentials = true;

const RegistrationErrores = Yup.object().shape({
    firstName: Yup.string()
        .min(3, "El Nombre debe tener como minimo 3 caracteres")
        .max(70, "No puede ser muy largo")
        .required('Requerido'),
    lastName: Yup.string()
        .min(3, "El Apellido debe tener como minimo 3 caracteres")
        .max(70, "No puede ser muy largo")
        .required('Requerido'),
    email: Yup.string()
        .min(3, "El Email debe tener como minimo 3 caracteres")
        .max(70, "No puede ser muy largo")
        .required('Requerido'),
    password: Yup.string()
        .min(8, "La contraseña debe tener como minimo 8 caracteres")
        .max(70, "No puede ser muy largo")
        .required('Requerido'),
    confirmPassword: Yup.string()
        .min(8, "La contraseña debe tener como minimo 8 caracteres")
        .max(70, "No puede ser muy largo")
        .required('Requerido'),

});

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
}
const Register = () => {
    const navigate = useNavigate()
    const onSubmitHandler = async (values, actions) => {
        try {
            const respuesta = await axios.post('http://localhost:8000/api/register', values)
            console.log(respuesta);
            actions.resetForm(initialValues);
            navigate('/register/login');
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <div className='container w-50' style={{border:'3px black solid', boxShadow:'20px 20px 0 #c1c1c1'}}>
                <h1 className='text-center'>Register</h1>
                <div className='d-flex justify-content-center container'>
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize={true}
                        onSubmit={onSubmitHandler}
                        validationSchema={RegistrationErrores} >
                        {({ errors, touched, isValid, dirty }) => (

                            <Form className='form-signup w-100' >
                                <div className='d-flex flex-column align-content-center p-5 ' >
                                    <div>
                                        <div className='align-items-center'>
                                            <p className='m-2'>First Name: </p>
                                            <Field name="firstName" type='text' className='form-control m-2' />
                                        </div>
                                        {touched.firstName && errors.firstName ? (<div className='ms-3 mt-1 mb-3 text-danger'>{errors.firstName}</div>) : null}
                                        <div className='align-items-center'>
                                            <p className='m-2'>Last Name: </p>
                                            <Field name="lastName" type='text' className='form-control m-2' />
                                        </div>
                                        {touched.lastName && errors.lastName ? (<div className='ms-3 mt-1 mb-3 text-danger'>{errors.lastName}</div>) : null}
                                        <div className='align-items-center'>
                                            <p className='m-2'>Email: </p>
                                            <Field name="email" type='email' className='form-control m-2' />
                                        </div>
                                        {touched.email && errors.email ? (<div className='ms-3 mt-1 mb-3 text-danger'>{errors.email}</div>) : null}
                                        <div className='align-items-center'>
                                            <p className='m-2'>Password: </p>
                                            <Field name="password" type='password' className='form-control m-2' />
                                        </div>
                                        {touched.password && errors.password ? (<div className='ms-3 mt-1 mb-3 text-danger'>{errors.password}</div>) : null}
                                        <div className='align-items-center'>
                                            <p className='m-2'>Confirm Password: </p>
                                            <Field name="confirmPassword" type='password' className='form-control m-2' />
                                        </div>
                                        {touched.confirmPassword && errors.confirmPassword ? (<div className='ms-3 mt-1 mb-3 text-danger'>{errors.confirmPassword}</div>) : null}
                                    </div>
                                    <button style={
                                        {
                                            backgroundColor: '#2a78e5',
                                            boxShadow: '4px 4px black',
                                            color: 'white',
                                            border: '2px solid black',
                                            textDecoration: 'none'
                                        }
                                    }
                                        className='d-flex justify-content-center mt-4'
                                        type='submit' disabled={!(isValid && dirty)}>Register</button>
                                    <Link to='/register/login' style={
                                        {
                                            backgroundColor: '#2a78e5',
                                            boxShadow: '4px 4px black',
                                            color: 'white',
                                            border: '2px solid black',
                                            textDecoration: 'none'
                                        }
                                    }
                                        className='d-flex justify-content-center mt-4'>Login</Link>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default Register;