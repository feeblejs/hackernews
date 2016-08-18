import React, { Component } from 'react'
import { connect } from 'feeble'
import storyFactory from '../../../models/story'
import List from './List'

export default function createListPage(type) {
  const Story = storyFactory(type)

  class ListPage extends Component {
    componentWillMount() {
      this.props.dispatch(Story.watch())
    }

    componentWillUnmount() {
      this.props.dispatch(Story.unwatch())
    }

    render() {
      const { stories, maxPage, params: { page } } = this.props

      return (
        <List type={type} stories={stories} page={page} maxPage={maxPage} />
      )
    }
  }

  return connect((state, props) => ({
    stories: Story.select('list', props),
    maxPage: Story.select('maxPage'),
  }))(ListPage)
}
