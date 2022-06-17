import React, { useState } from 'react'

export default function Test() {

    const [increse, setIncrese] = useState(0);

    let value = ''

    const handleSubmit = (e) => {
        e.preventDefault()
        
    }

  return (
    <div>
    <form onSubmit={handleSubmit}>
        <input type='text' name='set' />
        <button type='submit'>show</button>
    </form>
    <p>{value}</p>
    </div>
  )
}
