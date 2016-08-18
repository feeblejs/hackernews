import React from 'react'
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
      <div className="news-list">
        <ul>
          {stories.map(story => <Item key={story.id} story={story} />)}
        </ul>
      </div>
    </div>
  )
}
