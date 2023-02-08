/** @format */

import React from "react"
import "../styles/SingleChatComponent.css"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedChatAction} from "../redux/actions"
import { newSocket } from "../pages/HomePage"

const SingleChatComponent = ({
  profile,
  setChatSelected,
  changeChat,
  chatItem,
}) => {


  const dispatch = useDispatch()
  const selectedChat = useSelector( state => state.chat.selectedChat)

  
  return (
    <div
      className='single-profile d-flex px-3 py-2'
      onClick={() => {
        changeChat(chatItem)
        dispatch(setSelectedChatAction(chatItem))
      }}>
      <div className='single-pro-picture col-2 d-flex align-items-center'>
        <img
          src='https://i.pinimg.com/736x/17/57/1c/17571cdf635b8156272109eaa9cb5900.jpg'
          alt='single-profile-pic'
          className='single-profile-pic'
        />
      </div>
      <div className='single-pro-center col-8 d-flex text-truncate'>
        {chatItem.members.map((user, i) => (
          <h6 key={i} className='mb-0 mt-2 text-truncate'>
            <span>{user.username + ", "}</span>
          </h6>
        ))}
      </div>
      <div className='time-container col-2'>
        <small className='text-secondary'>yesterday</small>
        <i className='bi bi-chevron-down'></i>
      </div>
    </div>
  )
}

export default SingleChatComponent
