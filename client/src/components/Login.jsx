import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import Title from './Title';

axios.defaults.withCredentials = true;

const LoginErrores = Yup.object().shape({
    email: Yup.string()
        .min(3, "El Email debe tener como minimo 3 caracteres")
        .max(70, "No puede ser muy largo")
        .required('Requerido'),
    password: Yup.string()
        .min(8, "La contraseña debe tener como minimo 8 caracteres")
        .max(70, "No puede ser muy largo")
        .required('Requerido')

});

const initialValues = {
    email: '',
    password: ''
}
const Login = () => {
    const navigate = useNavigate()
    const onSubmitHandler = async (values, actions) => {
        try {
            const respuesta = await axios.post('http://localhost:8000/api/register/login', values)
            console.log(respuesta);
            navigate('/date');
            if (respuesta.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'LOGIN!!',
                    confirmButtonColor:'#2a77e8',
                    iconColor:'#2a77e8',
                    text: `Se ha logueado correctamente`
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='container'>
            <Title path='/' text='REGISTRARSE' title='Login'/>
            <div className='d-flex justify-content-center container w-50' style={{border:'3px black solid', boxShadow:'20px 20px 0 #c1c1c1'}}>
                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    onSubmit={onSubmitHandler}
                    validationSchema={LoginErrores} >
                    {({ errors, touched, isValid, dirty }) => (

                        <Form className='form-signup w-100' >
                            <div className='d-flex flex-column align-content-center container p-5 ' >
                                <div>
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
                                    type='submit' disabled={!(isValid && dirty)}>Login</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Login;