/** @format */

import React, { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loginUserDataActionWithThunk, setTokenAction } from "../redux/actions"

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logUsers, setLogUsers] = useState([])
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const logInUser = async () => {
    let response = await fetch(
      `${process.env.REACT_APP_BE_URL}/users/session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    )
    if(response.ok){
      let data = await response.json()
    console.log(data.token)
    dispatch(setTokenAction(data.token))
    localStorage.setItem("token", data.token)
      navigate("/")
    }
    
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    logInUser()
    
  }
  useEffect(() => {}, [])
  return (
    <Container>
      <Form className='mt-5 col-5 mx-auto'>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            // defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            // defaultValue={password}
            autoComplete='current-password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {/* <Form.Group className='mb-3' controlId='formBasicCheckbox'>
          <Form.Check type='checkbox' label='Check me out' />
        </Form.Group> */}
        <Button variant='primary' type='submit' onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default LoginPage
