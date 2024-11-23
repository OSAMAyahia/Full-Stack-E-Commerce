import React from 'react'

const DiscountCard = () => {
  return (
    <div className=' ms-5 me-5' style={{ maxWidth:"89%"}} >
           <div className='row my-5 d-flex align-items-center justify-content-between' style={{background:"#989392" }}>
        <div className="col-6 "> 
        <div className="  ">
    <img src="https://raw.githubusercontent.com/bakrgit/08-ecommerce-design-only/refs/heads/master/src/images/labtop.png"   style={{height:"110px", width:"100%" , objectFit:"contain"}} className="card-img-top" alt="..."/>
     
    
      
  </div>
   
    </div>
        <div className="col-6 "> 
        <div className="  ">
<h1 style={{color:"#ffffff"}}>Discount up to 50%</h1>     
    
      
  </div>
   
    </div>
         
   
    </div>

    </div>
  )
}

export default DiscountCard
