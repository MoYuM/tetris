import React from 'react';
import './index.css';

interface Props {
  
}

const Wrapper: React.FunctionComponent<Props> = props => {
  return (
    <div className="wrapper">
      {props.children}
    </div>
  )
}

export default Wrapper;