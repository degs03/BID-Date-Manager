import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2'
const DateList = () => {
    const [project, setProject] = useState([]);
    const [state, setState] = useState(''); //va a setear el estado al hacer onclick
    let fecha = moment(new Date()).format('l');
    console.log(fecha);
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })


    const changeState = async (item, status) => {
        item.status = status
        try {
            const res = await axios.put(`http://localhost:8000/api/date/${item._id}`, item) //el (,item), toma en cuenta, asi se actualiza 👍
            console.log(res);
            setState(item);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const respuesta = await axios.get('http://localhost:8000/api/date')
                setProject(respuesta.data);
            } catch (err) {
                console.log(err);
            }

        }

        getData();
    }, [state]);
    const delteDate = async (dateID) => {
        try {
            
            const respuesta = await axios.delete(`http://localhost:8000/api/date/${dateID}`)
            console.log(respuesta);

            swalWithBootstrapButtons.fire({
                title: 'Estas Seguro?',
                text: "No podras revertirlo!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si, borralo!',
                cancelButtonText: 'No, cancela!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    swalWithBootstrapButtons.fire(
                        'ELIMINADO!',
                        'Tu tarea fue eliminada.',
                        'success',
                        setProject(project.filter((project) => project._id != dateID))
                        )
                } else if(
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                        'CANCELADO',
                        'Tu tarea esta a salvo',
                        'error'
                    )
                }
            })

        } catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            <div className='d-flex justify-content-around'>
                <div className=' d-flex flex-column' style={{ height: '700px', overflow: 'auto', width: '22rem', border: '3px #c1c1c1 solid' }}>
                    <h2 className='text-center p-2' style={{ backgroundColor: '#a1c4f5' }}>Blacklog</h2>
                    {project.filter(project => project.status === "blacklog").map((project, idx) =>
                        <div className="card text-center mb-3" style={{ border: '2px #c1c1c1 solid', margin: '0 10px' }} key={idx}>
                            <div className="card-body">
                                <h5 className="card-title">{project.dateProject}</h5>
                                <p className="card-text" >
                                    {
                                        moment(project.dueDate).format('l') < fecha ?
                                            <p className='card-text' style={{ color: 'red' }}>Due: {moment(project.dueDate).format('l')}</p> :
                                            <p>Due: {moment(project.dueDate).format('l')}</p>
                                    }
                                </p>
                                <button className="btn btn-warning" style={{ color: 'white' }} onClick={() => changeState(project, 'inProgress')}>Start Project →</button>
                            </div>
                        </div>)}
                </div>
                <div className=' d-flex flex-column' style={{ height: '700px', overflow: 'auto', width: '22rem', border: '3px #c1c1c1 solid' }}>
                    <h2 className='text-center p-2' style={{ backgroundColor: '#ffe599' }}>In Progress</h2>
                    {project.filter(project => project.status === "inProgress").map((project, idx) =>
                        <div className="card text-center mb-3" style={{ border: '2px #c1c1c1 solid', margin: '0 10px' }} key={idx}>
                            <div className="card-body">
                                <h5 className="card-title">{project.dateProject}</h5>
                                <p className="card-text" >
                                    {
                                        moment(project.dueDate).format('l') < fecha ?
                                            <p className='card-text' style={{ color: 'red' }}>Due: {moment(project.dueDate).format('l')}</p> :
                                            <p>Due: {moment(project.dueDate).format('l')}</p>
                                    }
                                </p>
                                <button className="btn btn-success" onClick={() => changeState(project, 'completed')}>Move Project →</button>
                            </div>
                        </div>)}
                </div>
                <div className=' d-flex flex-column' style={{ height: '700px', overflow: 'auto', width: '22rem', border: '3px #c1c1c1 solid' }}>
                    <h2 className='text-center p-2' style={{ backgroundColor: '#b4d8a8' }}>Completed</h2>
                    {project.filter(project => project.status === "completed").map((project, idx) =>
                        <div className="card text-center mb-3" style={{ border: '2px #c1c1c1 solid', margin: '0 10px' }} key={idx}>
                            <div className="card-body">
                                <h5 className="card-title">{project.dateProject}</h5>
                                <p className="card-text" >
                                    {
                                        moment(project.dueDate).format('l') < fecha ?
                                            <p className='card-text' style={{ color: 'red' }}>Due: {moment(project.dueDate).format('l')}</p> :
                                            <p>Due: {moment(project.dueDate).format('l')}</p>
                                    }
                                </p>
                                <Link className="btn btn-danger" onClick={() => { delteDate(project._id) }}>X Remove Project</Link>
                            </div>
                        </div>)}
                </div>
            </div>
        </>
    )
}

export default DateList
