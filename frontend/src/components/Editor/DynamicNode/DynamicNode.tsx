import { memo, useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

export default memo((data:any)=> {
    // console.log(data);

  return (
    <>
      {data.id==='0' ? '' : <Handle type="target" position={Position.Top} />}
      <div className='custom-node'>
      <img src={data.data.Path.Path} alt="" />
            <p>{data.data.Path.Name}</p>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
})

