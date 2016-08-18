import React, { Component } from 'react'
import { connect } from 'feeble'
import Story from '../../../models/story'
import List from './List'

class ListPage extends Component {
  componentWillMount() {
    this.props.dispatch(Story.fetch())
  }

  render() {
    const { stories, maxPage, params: { page } } = this.props

    return (
      <List stories={stories} page={page} maxPage={maxPage} />
    )
  }
}

export default connect((state, props) => ({
  stories: Story.select('activeStories', props),
  maxPage: Story.select('maxPage'),
}))(ListPage)
