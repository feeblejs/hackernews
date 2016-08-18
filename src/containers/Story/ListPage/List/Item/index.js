import React from 'react'
import { Link } from 'feeble/router'
import { host, timeAgo } from '../../../../../helpers'
import './style.css'

export default function Item({ story }) {
  let title= null
  if (story.url) {
    title = (
      <span className="title">
        <a href={story.url} target="_blank">{story.title}</a>
        <span className="host">({host(story.url)})</span>
      </span>
    )
  } else {
    title = (
      <span className="title">
        <Link to={`/item/${story.id}`}>{story.title}</Link>
      </span>
    )
  }

  let commentLink = null
  if (story.type !== 'job') {
    commentLink = (
      <span className="comments-link">
        | <Link to={`/item/${story.id}`}>{story.descendants} comments</Link>
      </span>
    )
  }

  let label = null
  if (story.type !== 'story') {
    label = <span className="label">{story.type}</span>
  }

  return (
    <li className="news-item">
      <span className="score">{story.score}</span>
      {title}
      <br />
      <span className="meta">
        <span className="by">
          by <Link to={`/user/${story.by}`} className="">{story.by}</Link>
        </span>
        <span className="time">
          {timeAgo(story.time)} ago
        </span>
        {commentLink}
        {label}
      </span>
    </li>
  )
}
