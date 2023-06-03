import React from 'react';

import { format } from 'timeago.js';
import { BsPersonCircle } from 'react-icons/bs';


const Message = ({ message, own, scroll }) => {
    return (
      <div ref={scroll} className={`flex  ${own ? 'flex-row-reverse space-x-reverse' : 'flex-row'} space-x-2`}>
        <BsPersonCircle className='flex-none' />
        <div className='flex flex-col'>
          <div className={`flex  ${own ? 'flex-row-reverse bg-gray-200 ' : 'flex-row bg-blue-200'} space-x-2 rounded p-5`}>
            {message.text}
          </div>
          <div className='text-sm text-gray-500'>{format(message.createdAt)}</div>
        </div>
      </div>
    )
  
  };

export default Message