/** @format */

import axios from "axios"

export const getDataForLoggedInUser = async (token) => {
  const response = await axios.get(process.env.REACT_APP_BE_URL + "/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const getChats = async (token) => {
  let headers = {
    Authorization: `Bearer ${token}`,
    "Content-type": "application/json",
  }
  try {
    let resp = await fetch(process.env.REACT_APP_BE_URL + "/chat", {
      method: "GET",
      headers,
    })
    if (resp.ok) {
      let chats = await resp.json()

      return chats.MyChats
    } else {
      console.log("error")
    }
  } catch (error) {
    console.log(error)
  }
}

export const getDataForSpecificChat = async (chatId) => {
  const response = await axios.get(
    process.env.REACT_APP_BE_URL + "/chat/" + chatId
  )

  return response.data
}
export const getUsers = async () => {
  try {
    let resp = await fetch(process.env.REACT_APP_BE_URL + "/users")
    if (resp.ok) {
      let users = await resp.json()

      return users
    } else {
      console.log("error")
    }
  } catch (error) {
    console.log(error)
  }
}
