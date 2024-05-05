import React from 'react'

function Logout() {
  localStorage.removeItem('token')
  window.location.href = '/admin'
  return (
    <div>logout</div>
  )
}

export default Logout