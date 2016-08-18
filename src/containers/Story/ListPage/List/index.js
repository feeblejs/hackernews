import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Link } from 'feeble/router'
import Item from './Item'
import './style.css'

export default function List({ stories, page, maxPage }) {
  page = +(page || 1)

  let prev
  let more

  if (page > 1) {
    prev = <Link to={`/top/${page - 1}`}>&lt; prev</Link>
  } else {
    prev = <a className="disabled">&lt; prev</a>
  }

  if (page < maxPage) {
    more = <Link to={`/top/${page + 1}`}>more &gt;</Link>
  } else {
    more = <a className="disabled">more &gt;</a>
  }

  return (
    <div className="news-view view">
      <div className="news-list-nav">
        {prev}
        <span>{page || 1}/{maxPage}</span>
        {more}
      </div>
      <ReactCSSTransitionGroup
        transitionName="slide-left"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        <div className="news-list">
          <ul>
            <ReactCSSTransitionGroup
              transitionName="item"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
            >
              {stories.map(story => <Item key={story.id} story={story} />)}
            </ReactCSSTransitionGroup>
          </ul>
        </div>
      </ReactCSSTransitionGroup>
    </div>
  )
}
