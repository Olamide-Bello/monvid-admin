import React, { useContext, useRef } from 'react'
import { useForm } from 'react-hook-form';
import { Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import './SignIn.css'
import { toast } from 'react-toastify';
import { GlobalContext } from '../GlobalContext.js';

function SignInModal({ setModal }) {
    const { logUser, handleUser } = useContext(GlobalContext)
    const dataRef = useRef(null)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const toggleModal = () => {
        setModal(false)
    }
    const OnSubmit = async (data) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Access-Control-Allow-Origin", "http://localhost:3001");
        const raw = JSON.stringify(data);
        console.log(raw)
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
            mode: 'cors'
        };
        const response = await fetch('http://localhost:3000/users/login', requestOptions)
        console.log(response)
        const result = await response.json()
        console.log(result)
        dataRef.current = result
        logUser(dataRef.current.token)
        handleUser(dataRef.current.user)
        toast.success("Welcome back!")
        setModal(false)

    }

    return (
        <div className='modal-container'>
            <div className='sign-in-modal'>
                <Container>
                    <div className='modal-header'>
                        <h1><strong>Welcome to Monvid</strong></h1>
                        <p><em>Sign in to shop for your hotel supplies</em></p>
                        <FontAwesomeIcon className='modal-exit' icon={faXmark} size='2x' onClick={toggleModal} />

                    </div>
                    <form onSubmit={handleSubmit(OnSubmit)}>
                        <div className='form-group'>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="enter your email here"
                                {...register("email",
                                    {
                                        required: "Email is required.",
                                        pattern: {
                                            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                            message: "Email is not valid."
                                        }
                                    })
                                }
                            />
                            {errors.email && <p className="errorMsg">{errors.email.message}</p>}
                        </div>
                        <div className='form-group'>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="enter your password"
                                {...register("password",
                                    {
                                        required: true, minLength: {
                                            value: 6,
                                            message: "Password should be at-least 6 characters."
                                        }
                                    })
                                }
                            />
                            {errors.password?.type === "required" && (<p className="errorMsg">Password is required.</p>)}
                            {errors.password && (<p className="errorMsg">{errors.password.message}</p>)}
                        </div>
                        <button type='submit' id='submit-btn'><strong>Sign in</strong></button>

                        <p><a href='/home'>Forgot password?</a></p>
                    </form>
                </Container>
            </div>
        </div>

    )
}

export default SignInModal