import React from 'react'
import UserSide from './../../Components/User/UserSide';
import UserAllAddress from '../../Components/User/UserAllAddress';

 

const UserAdressPage = () => {
  return (
    <div className='mt-2'>
      <div className='row'>
        <div className='col-3 col-sm-3 col-md-3 col-lg-2'>
          <UserSide />  
        </div>
        <div className='col-9 col-sm-9 col-md-9 col-lg-9'>
          <UserAllAddress/>
       
         </div>
      </div>
    </div>
  );
};

 

 



export default UserAdressPage