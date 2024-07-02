import React from 'react'
import { CiLight } from 'react-icons/ci'

function ModeButton() {
  return (
        <button className='flex flex-col items-center gap-2'>
          <p className='text-xs font-bold'>Light Mode</p>
          <div className='bg-gray-200  p-1 w-20  rounded-full'>
            <div className=' bg-white w-5 flex justify-center rounded-full'>
              <CiLight />

            </div>
          </div>
        </button>
  )
}

export default ModeButton