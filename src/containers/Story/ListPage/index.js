import React, { Component } from 'react'
import TransitionGroup from 'react-addons-css-transition-group'
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
        <TransitionGroup
          transitionName="slide-left"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          <List type={type} stories={stories} page={page} maxPage={maxPage} />
        </TransitionGroup>
      )
    }
  }

  return connect((state, props) => ({
    stories: Story.select('activeStories', props),
    maxPage: Story.select('maxPage'),
  }))(ListPage)
}
