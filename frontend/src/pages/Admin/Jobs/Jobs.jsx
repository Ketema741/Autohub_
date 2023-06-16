import React from 'react'
import ActiveJobs from './ActiveJobs'
import Applicants from './Applicants'
import Notification from '../Notification/Notification'

const Jobs = () => {
    return (
        <div>   
            <Notification />
            <ActiveJobs />
            <Applicants />
        </div>
    )
}

export default Jobs