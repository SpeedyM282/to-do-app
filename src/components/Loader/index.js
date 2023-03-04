import './style.scss';

const Loader = ({ display, isSpinner, isDark }) => {
  const style = {
    display: display,
    width: isSpinner && '24px',
    height: isSpinner && '24px'
  };

  return (
    <div style={style} className='loader__block' >
      <span
        className={
          isSpinner && isDark ?
            'loader-spinner dark-color' :
            isSpinner ?
              'loader-spinner' :
              'loader'
        }
      ></span>
    </div>
  );
}

export default Loader;