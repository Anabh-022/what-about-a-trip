import React from 'react'

const Message = ({ message, createdAt, userName }) => {
  return (
    <div>
      <div>
        {userName}
      </div>
      <div>
        {message}
      </div>
      <span>{createdAt}</span>
    </div>
  )
}

export default Message
