import React from 'react'
import propTypes from 'prop-types'

const Chats = ({ chats }) => {
  console.log(chats)
  return (
    <>
      <section>
        {chats && chats.length ? chats.map((chat, i) => {
          <div key={i} className={chat.role === "user" ? "user_msg" : ""}>
              <p>
                <b>{chat.role.toUpperCase()}</b>
              </p>
              <p>:</p>
              <p>{chat.content}</p>
          </div>
        }) : ""}
      </section>
    </>
  )
}

Chats.propTypes = {
  chats: propTypes.array
}

export default Chats
