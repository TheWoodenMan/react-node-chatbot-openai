import React from 'react'
import './App.css'
import { useState } from 'react'
import Typing from './components/Typing'
import Header from './components/Header'
// import Chats from "./components/Chats";
import Form from './components/Form'

function App () {
  const [message, setMessage] = useState('')
  const [chats, setChats] = useState([])
  const [isTyping, setIsTyping] = useState(false)

  console.log(chats)

  const updateChat = async (e, message) => {
    e.preventDefault()

    if (!message) return

    console.log(message)

    setIsTyping(true)
    scrollTo(0, 1e10)

    let msgs = chats
    msgs.push({ role: 'user', content: message })
    setChats(msgs)

    setMessage('')

    const fetchedMessage = fetch('http://localhost:9000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chats
      })
    })
      .then(response => response.json())
      .then(data => {
        msgs.push(data.output)
        setChats(msgs)
        setIsTyping(false)
        scrollTo(0, 1e10)
      })
      .catch(error => {
        console.log(error)
      })
  }

  console.log('chats is', chats)

  const formProps = { message, setMessage, updateChat, setIsTyping }

  return (
    <>
      <Header isTyping={isTyping} />
      {/* <Chats chats={chats} /> */}
      <section>
        {chats && chats.length
          ? chats.map((chat, index) => (
              <div>
                <p
                  key={index}
                  className={chat.role === 'user' ? 'user_msg' : ''}
                >
                  <span>
                    <b>{chat.role.toUpperCase()}</b>
                  </span>
                  <span>:</span>
                  <span>{chat.content}</span>
                </p>
              </div>
            ))
          : ''}
      </section>
      {isTyping ? <Typing /> : <></>}
      <Form {...formProps} />
    </>
  )
}

export default App
