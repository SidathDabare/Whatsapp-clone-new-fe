/** @format */

import React, { useState } from "react"
import "../styles/SingleProfileContainer.css"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedUserAction } from "../redux/actions"

const SingleProfileChat = (props) => {
  const { profile, setChatSelected, createGroup, setCreateGroup, changeChat } =
    props

  const dispatch = useDispatch()

  return (
    <div
      className={"single-profile d-flex px-3 py-2"}
      onClick={() => {
        changeChat(profile)
        console.log(profile.username)
        //createGroup.push(profile._id)
        setCreateGroup([...createGroup, profile])
        //setShowUsername([...showUsername, profile.username])
      }}>
      <div className='single-pro-picture col-2 d-flex align-items-center'>
        <img
          src={profile.avatar}
          alt='single-profile-pic'
          className='single-profile-pic'
        />
      </div>
      <div className='single-pro-center col-10'>
        <h6 className='mb-0 mt-2'>{profile.username}</h6>
        <p className='mb-0 text-truncate text-secondary'>{profile.email}</p>
      </div>
      {/* <div className='time-container col-2'>
        <small className='text-secondary'>yesterday</small>
        <i className='bi bi-chevron-down'></i>
      </div> */}
    </div>
  )
}

export default SingleProfileChat
