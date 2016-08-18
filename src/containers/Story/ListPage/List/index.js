import React from 'react'
import Item from './Item'
import './style.css'

export default function List({ stories }) {
  return (
    <div className="news-view view">
      <div className="news-list-nav">
        <a className="disabled">&lt; prev</a>
        <span>1/25</span>
        <a href="/top/2">more &gt;</a>
      </div>
      <div className="news-list">
        <ul>
          {stories.map(story => <Item key={story.id} story={story} />)}
        </ul>
      </div>
    </div>
  )
}
