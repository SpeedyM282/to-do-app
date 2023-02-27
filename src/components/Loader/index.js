import './style.scss';

function Loader({ display }) {
  const style = {
    display: display
  };

  return (
    <div style={style} className='loader__block' >
      <span className='loader'></span>
      {/* <span className='loader'></span>
      <span className='loader'></span> */}
    </div>
  );
}

export default Loader;