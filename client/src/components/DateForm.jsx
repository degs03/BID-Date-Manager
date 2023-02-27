import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Swal from 'sweetalert2'
import Title from './Title';

const DateErrores = Yup.object().shape({
    dateProject: Yup.string()
        .min(3, "El Nombre del proyecto debe tener como minimo 3 caracteres")
        .max(70, "No puede ser muy largo")
        .required('Requerido'),
    status: Yup.string(),
    dueDate: Yup.date()
        .required('Requerido'),

});

const initialValues = {
    dateProject: '',
    status: 'blacklog',
    dueDate: ''
}
const DateForm = () => {
    const navigate = useNavigate()
    const onSubmitHandler = async (values, actions) => {
        try {
            const respuesta = await axios.post('http://localhost:8000/api/date', values)
            console.log(respuesta);
            actions.resetForm(initialValues);
            navigate('/date');
            if (respuesta.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'ENVIADO!!',
                    confirmButtonColor:'#2a77e8',
                    iconColor:'#2a77e8',
                    text: `Se ha agregado ${respuesta.data.dateProject} correctamente`
                })
            }
        } catch (err) {

        }
    }
    return (
        <div className='container'>
            <Title path='/register/login' text='LOGOUT' title='Project Manager'/>
            <Link className='d-flex justify-content-end w-75' style={{ padding: '20px 0' }} to='/date'>Back to the dahsboard</Link>
            <div className='d-flex justify-content-center container'>
                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    onSubmit={onSubmitHandler}
                    validationSchema={DateErrores} >
                    {({ errors, touched, isValid, dirty }) => (

                        <Form className='form-signup w-50' style={{ border: '3px black solid', position: 'relative' }}>
                            <h5 style={{ position: 'absolute', transform: 'translateX(10px) translateY(-15px)', backgroundColor: 'white', padding: '0 10px' }}>Plan a new project</h5>
                            <div className='d-flex flex-column align-content-center container p-5 ' >
                                <div>
                                    <div className='d-flex align-items-center'>
                                        <p className='m-2'>Project</p>
                                        <Field name="dateProject" type='text' className='form-control m-2' />
                                    </div>
                                    {touched.dateProject && errors.dateProject ? (<div className='ms-3 mt-1 mb-3 text-danger'>{errors.dateProject}</div>) : null}
                                    <div className='d-flex align-items-center'>
                                        <p className='m-2'>DueDate</p>
                                        <Field name="dueDate" type='date' className='form-control m-2' />
                                    </div>
                                    {touched.dueDate && errors.dueDate ? (<div className='ms-3 mt-1 mb-3 text-danger'>{errors.dueDate}</div>) : null}
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
                                    type='submit' disabled={!(isValid && dirty)}>Plan Project</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default DateForm;