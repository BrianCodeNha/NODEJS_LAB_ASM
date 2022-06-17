import React from 'react'
import './Department.css'
import { useHistory} from 'react-router-dom'
import { Link } from 'react-router-dom'
export default function Department(props) {


  return (
    <div className='row fluid-container'>
      {props.department.map((depart) => (
        
        <div key={depart.id} className='col-12 col-md-6 col-lg-4' >
        <Link to={`/department/${depart.id}`}>
          <div className='card'>
            <h4 className='card-header'>{depart.name}</h4>
            <div className='card-text'>Số lượng nhân viên: {depart.numberOfStaff}</div>
          </div>
          </Link>
        </div>
        
      ))}
    </div>
  )
}
