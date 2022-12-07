import React from 'react'
import './Contact.scss'
import { Col, Container, Form, Row } from 'reactstrap'
import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { useRef } from 'react'
import { notification } from 'antd'
import styled from 'styled-components'
import { contactConfig } from './ContactData'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

const StyledContactForm = styled.div`
  width: 600px;
  form {
    display: flex;
    /* align-items: flex-start; */
    flex-direction: column;
    /* width: 100%; */
    /* font-size: 16px; */
    input {
      /* width: 100%; */
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);
      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }
    textarea {
      /* max-width: 100%;
      min-width: 100%;
      width: 100%; */
      max-height: 100px;
      min-height: 100px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);
      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }
    label {
      margin-top: 1rem;
    }
    input[type='submit'] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
    }
    p {
      margin: 0;
      padding: 0;
      margin-bottom: 0.5rem;
      color: red;
      font-size: 12px;
    }
    @media screen and (max-width: 940px) {
      label {
        margin-left: 80px;
      }
      input {
        width: 100%;
        margin-left: 80px;
      }
      textarea {
        width: 100%;
        margin-left: 80px;
        margin-right: 80px;
      }
    }

    @media screen and (max-width: 760px) {
      label {
        margin-left: 80px;
      }
      input {
        width: 76%;
        margin-left: 80px;
      }
      textarea {
        width: 76%;
        margin-left: 80px;
        margin-right: 80px;
      }
    }
  }
`
const Contact = () => {
  const [userData, setUserData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    user_address: '',
    user_message: '',
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
  })

  const form = useRef()

  const [formStatus, setFormStatus] = useState('')

  // let name, value
  const postUserData = (e) => {
    // name = e.target.name
    // value = e.target.value
    const value = e.target.value
    console.log(value)

    setUserData({ ...userData, [e.target.name]: value })
  }

  const submitData = (e) => {
    e.preventDefault()
    console.log('ádasdfasdfsdf')
    console.log(e)
    // console.log(data)

    emailjs
      .sendForm(
        'service_1le5p0v',
        'template_ctivqk9',
        form.current,
        'sH-BtKX2IhCv87mcn',
      )
      .then(
        (res) => {
          console.log('SUCCESS!', res.status)
          console.log(res.text)
          setUserData({
            user_name: '',
            user_email: '',
            user_phone: '',
            user_address: '',
            user_message: '',
          })
          console.log('message sent')
          setFormStatus('SUCCESS')
        },
        (error) => {
          console.log('FAILED...', error)
        },
      )
    e.target.reset()

    // const { name, email, phone, address, message } = userData
    // let conFom = {
    //   name: name.value,
    //   email: email.value,
    //   phone: phone.value,
    //   address: address.value,
    //   message: message.value,
    // }
    // console.log(conFom)
  }

  useEffect(() => {
    if (formStatus === 'SUCCESS') {
      setTimeout(() => {
        setFormStatus('')
      }, 3000)
    }
  }, [formStatus])

  const renderAlert = () =>
    notification.success({
      message: `You send message success!!!`,
    })
  // <div className="px-4 py-3 leading-normal text-blue-700 bg-blue-100 rounded mb-5 text-center">
  //   <p>your message submitted successfully</p>
  // </div>
  return (
    <Container>
      <Row className="mb-5 mt-3">
        <Col lg="8">
          <h1 className="contact__title">Contact Us</h1>
        </Col>
      </Row>

      <Row className="sec__sp">
        <Col lg="6" className="mb-5">
          <h3 className="color_sec py-4">Get in touch</h3>
          <address>
            <strong>Email:</strong>
            <a href={`mailto:${contactConfig.OUR_EMAIL}`}>
              {contactConfig.OUR_EMAIL}
            </a>{' '}
            <br />
            <br />
            {contactConfig.hasOwnProperty('OUR_PHONE') ? (
              <p>
                <strong>Phone:</strong> {contactConfig.OUR_PHONE}
              </p>
            ) : (
              ''
            )}
          </address>
          <p>{contactConfig.description}</p>
        </Col>

        <Col lg="6" md="6" sm="3" className="mb-5">
          {' '}
          <StyledContactForm>
            <form ref={form} onSubmit={submitData}>
              {formStatus && renderAlert()}
              <label>Name</label>
              <input
                type="text"
                name="user_name"
                onChange={postUserData}
                value={userData.name}
                required
                {...register('user_name', {
                  required: 'Username is required...',
                  minLength: {
                    value: 3,
                    message: 'Username must be atleast 3 characters long...',
                  },
                  maxLength: {
                    value: 30,
                    message: 'Username must be atmost 30 characters long...',
                  },
                })}
                placeholder="Enter your name"
              />
              <p>{errors.user_name?.message}</p>
              <label>Email</label>
              <input
                type="email"
                name="user_email"
                onChange={postUserData}
                value={userData.email}
                required
                {...register('user_email', {
                  required: 'Email is required...',
                  pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Email must be valid',
                  },
                })}
                placeholder="Enter your email"
              />
              <p>{errors.user_email?.message}</p>
              <label>Phone</label>
              <input
                type="number"
                name="user_phone"
                onChange={postUserData}
                value={userData.phone}
                required
                {...register('user_phone', {
                  required: 'Phone is required...',
                  pattern: {
                    value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                    message: 'Phone must be valid',
                  },
                })}
                placeholder="Enter your phone"
              />
              <p>{errors.user_phone?.message}</p>
              <label>Address</label>
              <input
                type="text"
                name="user_address"
                onChange={postUserData}
                value={userData.address}
                required
                {...register('user_address', {
                  required: 'Address is required...',
                })}
                placeholder="Enter your address"
              />
              <p>{errors.user_address?.message}</p>
              <label>Message</label>
              <textarea
                name="user_message"
                onChange={postUserData}
                value={userData.message}
                required
                {...register('user_message', {
                  required: 'Message is required...',
                  minLength: {
                    value: 10,
                    message: 'Minimum Required length is 10',
                  },
                  maxLength: {
                    value: 100,
                    message: 'Maximum allowed length is 100 ',
                  },
                })}
                placeholder="Enter your message"
              />
              <p>{errors.user_message?.message}</p>
              <input type="submit" value="Send Message" />
            </form>
          </StyledContactForm>
        </Col>
      </Row>
    </Container>
  )
}

export default Contact