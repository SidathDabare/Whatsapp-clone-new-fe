/** @format */
import io from "socket.io-client"
import React, { useState, useRef, useEffect } from "react"
import "../styles/ChatContainer.css"
import ListGroup from "react-bootstrap/ListGroup"
import Overlay from "react-bootstrap/Overlay"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  sendMessageAction,
  setSelectedChatMessagesAction,
} from "../redux/actions/index"
import { getDataForSpecificChat } from "../lib/apiFunctions"
import { v4 as uuidV4 } from "uuid"

const newSocket = io(process.env.REACT_APP_BE_URL, {
  transports: ["websocket"],
})

const ChatContainer = () => {
  const dispatch = useDispatch()

  const loggedInUser = useSelector((state) => state.profile.loggedInUser)
  const selectedChat = useSelector((state) => state.chat.selectedChat)
  console.log(selectedChat)

  // const filterdId = selectedChat.messages.filter(
  //   (msg) => msg.sender === loggedInUser._id
  // )
  //console.log(filterdId)

  const recipients = selectedChat?.members
  const messages = useSelector((state) => state.chat.selectedChatMessages)
  const [show, setShow] = useState(false)
  const [searchMessage, setSearchMessage] = useState(false)
  const [messageText, setMessageText] = useState("")

  const target = useRef(null)

  const sendMessage = () => {
    const messageData = {
      text: messageText,
      room: selectedChat._id,
      sender: loggedInUser._id,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    }
    newSocket.emit("send_message", messageData)
    dispatch(
      sendMessageAction({
        _id: uuidV4(),
        sender: messageData.sender,
        content: { text: messageData.text, media: "" },
      })
    )
  }
  useEffect(() => {
    if (selectedChat?._id) {
      getDataForSpecificChat(selectedChat._id).then((data) =>
        dispatch(setSelectedChatMessagesAction(data.messages))
      )
      newSocket.emit("join_room", selectedChat._id)
    }
  }, [selectedChat])

  useEffect(() => {
    if (selectedChat?._id) {
      getDataForSpecificChat(selectedChat._id).then((data) =>
        dispatch(setSelectedChatMessagesAction(data.messages))
      )
    }
    newSocket.emit("join_room", selectedChat?._id)
  }, [selectedChat, newSocket])

  useEffect(() => {
    newSocket.on("receive_message", (receivedMessage) => {
      console.log(selectedChat._id, receivedMessage.room)

      if (selectedChat._id === receivedMessage.room) {
        dispatch(
          sendMessageAction({
            _id: uuidV4(),
            sender: receivedMessage.sender,
            content: { text: receivedMessage.text, media: "" },
          })
        )
      }
    })
  }, [])

  return (
    <>
      <div
        className={
          !searchMessage
            ? "chat-container col-6 col-xs-6 col-md-8"
            : "chat-container col-6 col-xs-6 col-md-4"
        }>
        <div className='chat-container-nav d-flex align-items-center'>
          <div className='chat-container-profile-container d-flex align-items-center col-6'>
            <img
              src={
                loggedInUser && loggedInUser.avatar
                  ? loggedInUser.avatar
                  : "https://i.pinimg.com/736x/17/57/1c/17571cdf635b8156272109eaa9cb5900.jpg"
              }
              alt='chat-container-profile-pic'
              className='chat-container-profile-pic'
            />
            <h6 className='mx-3 mb-0 text-truncate'>
              {selectedChat?.members?.map((member) => (
                <span key={member._id}>{member?.username + " , "}</span>
              ))}
            </h6>
          </div>
          <div className='chat-container-nav col-6 d-flex align-items-center justify-content-end'>
            <i
              className='bi bi-search'
              ref={target}
              onClick={() => setSearchMessage(!searchMessage)}></i>

            <i
              className='bi bi-three-dots-vertical mx-3'
              ref={target}
              onClick={() => setShow(!show)}></i>
            <Overlay target={target.current} show={show} placement='bottom'>
              {({ placement, arrowProps, show: _show, popper, ...props }) => (
                <div
                  {...props}
                  style={{
                    position: "absolute",
                    backgroundColor: "#202c33",
                    padding: "2px 10px",
                    color: "white",
                    borderRadius: 2,
                    ...props.style,
                  }}>
                  <ListGroup className='chat-dropdown-list'>
                    <ListGroup.Item>
                      <Link to='/'>Contact Info</Link>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Link to='/'>Select messages</Link>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Link to='/'>Close chat</Link>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Link to='/'>Mute notifications</Link>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Link to='/'>Disappering message</Link>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Link to='/'>Clear messages</Link>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Link to='/'>Delete chat</Link>
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              )}
            </Overlay>
          </div>
        </div>
        <div className='chat-content'>
          <div>
            {messages?.map((message) => (
              <div className='chat-content-item' key={message._id}>
                {message.sender !== loggedInUser._id ? (
                  <div className='bg-danger ml-auto'>
                    {message.content.text}
                  </div>
                ) : (
                  <div className='bg-warning mr-auto'>
                    {message.content.text}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className='chat-input-container d-flex align-items-center justify-content-between'>
          <div
            className={
              !searchMessage
                ? "d-flex align-items-center justify-content-around col-1"
                : "d-flex align-items-center justify-content-around col-2"
            }>
            <i className='bi bi-emoji-smile icon-large'></i>
            <i className='bi bi-paperclip icon-large'></i>
          </div>
          <div
            className={
              !searchMessage
                ? "chat-input col-10 d-flex align-items-center"
                : "chat-input col-9 d-flex align-items-center"
            }>
            <form
              className='w-100'
              onSubmit={(e) => {
                e.preventDefault()
                sendMessage()
              }}>
              <input
                type='text'
                disabled={selectedChat ? false : true}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder='type...'
                className='chat-input-input col-12'
              />
            </form>
          </div>
          <div className='col-1 d-flex align-items-center justify-content-around'>
            <i className='bi bi-mic icon-large'></i>
          </div>
        </div>
      </div>
      <div
        className={
          !searchMessage
            ? "d-none"
            : "chat-container-show col-6 col-xs-6 col-md-4"
        }>
        <div className='chat-container-nav d-flex align-items-center col-12'>
          <div className='chat-container-profile-container d-flex align-items-center col-2 justify-content-center'>
            <i
              className='bi bi-x-lg'
              onClick={() => setSearchMessage(!searchMessage)}></i>
          </div>
          <div className='chat-container-nav col-10 d-flex align-items-center justify-content-start'>
            <h6 className='mx-3 mb-0'>Search Messages</h6>
          </div>
        </div>
        <div className='chat-container-show-message d-flex justify-content-between align-items-center px-3'>
          <div className='d-flex justify-content-between align-items-center'>
            <i className='bi bi-search'></i>
            <input type='text' placeholder='Search....' />
          </div>
        </div>
        <div className='search-message-content d-flex justify-content-around align-items-center'>
          <small>Search for messages with +39 564545154</small>
        </div>
      </div>
    </>
  )
}

export default ChatContainer
