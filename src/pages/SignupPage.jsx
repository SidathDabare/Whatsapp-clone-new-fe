/** @format */

import React, { useState } from "react"
import { Container } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

const SignupPage = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [avatar, setAvatar] = useState("")

  const addNewUser = async () => {
    let url = `${process.env.REACT_APP_BE_URL}/users/account`
    // let imagePath = await addImage(imageUrl)
    // console.log(imagePath)

    try {
      let res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          username,
          email,
          password,
          avatar,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      let data = await res.json()
      console.log(data)

      return data
    } catch (error) {
      console.log(error)
    }
  }

  const addImage = async (e) => {
    const str = e.target.files[0]
    let url = `${process.env.REACT_APP_BE_URL}/files/cloudinary`
    var formData = new FormData()
    formData.append("image", str)
    var requestOptions = {
      method: "POST",
      body: formData,
    }
    try {
      let res = await fetch(url, requestOptions)
      let data = await res.json()
      console.log(data)
      setAvatar(data.url)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addNewUser()
  }
  return (
    <Container>
      <Form className='mt-5 col-5 mx-auto'>
        <Form.Group className='mb-3'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter username'
            // defaultValue={email}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
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
        <Form.Group className='mb-3'>
          <Form.Label>Avatar</Form.Label>
          <Form.Control
            type='text'
            placeholder='Image Url'
            defaultValue={avatar}
            //onChange={(e) => setAvatar(e.target.value)}
          />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label className='my-0'>Image file</Form.Label>
          <Form.Control
            className='py-0'
            size='sm'
            type='file'
            onChange={addImage}
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

export default SignupPage
