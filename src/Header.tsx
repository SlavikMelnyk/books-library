import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <>
   <div className="flex justify-center gap-10 bg-cyan-500 p-2">
    <div className="bg-buttonColor rounded p-2">
   <Link to='/authors'>Authors List</Link>

    </div>
    <div className="bg-buttonColor rounded p-2">

    <Link to='/'>Books List</Link>
    </div>
   </div>
    </>
  )
}
