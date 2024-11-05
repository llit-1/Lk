import React from 'react'
import Skeleton from '@mui/material/Skeleton';

interface ExchangeSlotCardLoadingProps {
    index: number;
}

const ExchangeSlotCardLoading: React.FC<ExchangeSlotCardLoadingProps> = ({ index }) => {
  return (
    <div className='slot' key={index}>
        <Skeleton animation="wave" variant="text" width="60%" height={35} style={{ marginBottom: '10px', marginLeft: "10px"}} />
        <Skeleton animation="wave" variant="rectangular" height={20} width="60%" style={{ margin: '7px 10px', borderRadius: "5px"}} />
        <Skeleton animation="wave" variant="rectangular" height={19} width="70%" style={{ margin: '10px 10px 7px 10px', borderRadius: "5px"}}/>
        
        <div className='slot_info slot_bottom'>
            <Skeleton animation="wave" variant="rectangular" width="32%" height={35} style={{borderRadius: "5px"}} />
            <Skeleton animation="wave" variant="rectangular" width="22%" height={35} style={{borderRadius: "5px"}} />
        </div>
    </div>
    )
  
}

export default ExchangeSlotCardLoading