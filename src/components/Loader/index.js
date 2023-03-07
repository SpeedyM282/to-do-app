import './style.scss';

const Loader = ({ isSpinner, isDark }) => {
  const loaderBlockStyle = {
    width: isSpinner && '24px',
    height: isSpinner && '24px'
  };

  const spanClassName = (
    isSpinner && isDark ?
      'loader-spinner loader-dark' :
      isSpinner ?
        'loader-spinner' :
        'loader'
  );

  return (
    <div style={loaderBlockStyle} className='loader__block' >
      <span
        className={spanClassName}
      ></span>
    </div>
  );
}

export default Loader;