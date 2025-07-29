import { useState } from 'react'
import Form from './Form';
import DisplayInfo from './DisplayInfo';


function App() {

  return (
    <div className='w-screen flex items-start p-10'>
      <Form/>
      <DisplayInfo/>
    </div>
  )
}

export default App;
