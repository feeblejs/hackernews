import React, { PropTypes } from 'react';
import TransitionGroup from 'react-addons-css-transition-group'
import { Link } from 'feeble/router'
import './style.css'
import logo from './logo.png'

export default function App({ children }) {
  return (
    <div id="app">
      <div className="header">
        <div className="inner">
          <Link to="/">
            <img src={logo} alt="logo" className="logo" />
          </Link>
          <Link to="/top" activeClassName="router-link-active">Top</Link>
          <Link to="/new" activeClassName="router-link-active">New</Link>
          <Link to="/show" activeClassName="router-link-active">Show</Link>
          <Link to="/ask" activeClassName="router-link-active">Ask</Link>
          <Link to="/job" activeClassName="router-link-active">Jobs</Link>
          <a href="https://github.com/feeblejs/hackernews" target="_blank" className="github">
            Built with Feeble
          </a>
        </div>
      </div>
      <TransitionGroup
        transitionName="fade"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        {children}
      </TransitionGroup>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.element.isRequired,
}
