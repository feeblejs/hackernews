import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './style.css';

export default function App({ children }) {
  return (
    <div id="app">
      <div className="header">
        <div className="inner">
          <a href="/">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAIAAADYYG7QAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0QwQUQ3MDQ1ODRDMTFFNjg3RTY4OTk2MDI5RjY0NEEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0QwQUQ3MDM1ODRDMTFFNjg3RTY4OTk2MDI5RjY0NEEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkIxQUFERjk1ODRCMTFFNkEzNzlDMEVFOEY2NTE3RDEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RkIxQUFERkE1ODRCMTFFNkEzNzlDMEVFOEY2NTE3RDEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6R9N1XAAADmklEQVR42uxZW0hUQRj+zrrrqizqakmWuV0gMBQlpOihkOgC9qIF4kOPQSAYlIW59tCF6qGgBKGgoDJpJbQrlaEo2YumgmhiopUt5L1Myk1dPaeZWXV3jmue3bMuG+ywHM7+M2fmO9/3z//PzBEkSUIgFQ0CrAQcIK3zdqALbTWI0EMQ/Dc+cRjbFNL2IT5pEaC2ZzhdhET/siYCVuDqFXeAIowUzTrAjwRBmh/ajWREKQ1DI/jdjV2cJDjLPJhl/1ZacpHSca+Z94DFRWDeuvgRwSeASJPfwCjfO0GzBtABs0uQPgzY5x9xoIkDwoEZlYBIR0PAnsPYnoOJH3PepwvD935YzAgF/ckKGXIMyC2AKQX2ybleDEbUlqKlATFL86oUEHnjPivycuRVnY14+xybGBMLJYS9wIZk5F6Tt79jVqKHZvnARahubUb5KXlV7gU6/NQizyCkZBfIG986ip5exC5Dj7JZRiRYC1Rex2gfZzelYud+fHPpQ8NcbWM8dh/hWvZ34/Vd2ondJ9OevFMkYBNRYZZXZRVRFewu+o4De49B4LWxFGFShGF5ehTHITKVEoBqC760cPatGdi2CwPMFYl8P4F4Aw7yen1qRP0TrHc3H70HJLEZS673T8qrsospQ9PsfojRE2bgGpQX0qteET2eRGoHSU3v0F7N2VMPIC0NI0RTwKhFZj5X21GLpgaasGeVjqMYkMR0IVHndr686tBZ6vgEU0YOYkxc1b3j9CmtUno8zGVk1HjgQy9qbnL2HdnYvIW6c9YZzv6+Cm1dNKDPeDCIh8mVNF8NPDqHqV+cNT0LyUlISHEJYCIsxYhi6WUFs/0sA/R5GI8vc/bMPJjLOAthsaPbU3q8Wn6ITLinNzA+6DTGmpCY7vw7PYHK80riso8ARZOQM4mHhUu2eVWCryOUS9E/CzSHd78og7XdTa1tDBWXKD0z3vTtFSAihIG9/YMTbmqrLmLUBqM3eqlYwpLoTLJBYx1aX3L2wR68KaH8ebtBV7Gm1jJRZKqND2NWpIlC9D8gkcWYiGjOqNNDp1GeKFZi1+Hjw5PgviwIKAhInvzDIzlLVBxdXauYeVpVgFYB9aXorIPIdh5CCP6MQS+q6VIdIJLRPjahucm5hw9lG0sV4UkdIDtbihj5MKmKIJWABLXD/18HVpI0d8rkz+KQ2OVrgpZb6Vn9zprjWJgMveAFzm8dgXFwLgQ/vvxvgP4KMAC8TAc1j4IsCQAAAABJRU5ErkJggg==" alt="logo" className="logo" />
          </a>
          <a href="/top" className="router-link-active">Top</a>
          <a href="/new" className="">New</a>
          <a href="/show" className="">Show</a>
          <a href="/ask" className="">Ask</a>
          <a href="/job" className="">Jobs</a>
          <a href="https://github.com/feeble/feeble-hackernews" target="_blank" className="github">
            Built with Feeble
          </a>
        </div>
      </div>
      <ReactCSSTransitionGroup
        transitionName="fade"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        {children}
      </ReactCSSTransitionGroup>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.element.isRequired,
}
