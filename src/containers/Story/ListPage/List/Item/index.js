import React from 'react'
import './style.css'

export default function Item({ story }) {
  return (
    <li className="news-item">
      <span className="score">{story.score}</span>
      <span className="title">
        <a href={story.url} target="_blank">{story.title}</a>
        <span className="host">(iamtrask.github.io)</span>
      </span>
      <br />
      <span className="meta">
        <span className="by">
          by <a href="/user/williamtrask" className="">{story.by}</a>
        </span>
        <span className="time">
          6 hours ago
        </span>
        <span className="comments-link">
          | <a href="/item/12309777" className="">{story.descendants} comments</a>
        </span>
      </span>
    </li>
  )
}
