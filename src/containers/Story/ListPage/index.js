import React, { Component } from 'react'
import { connect } from 'feeble'
import Story from '../../../models/story'
import List from './List'

class ListPage extends Component {
  componentWillMount() {
    this.props.dispatch(Story.fetch())
  }

  render() {
    const { stories } = this.props

    return (
      <List stories={stories} />
    )
  }
}

export default connect(() => ({
  stories: Story.getState().data
}))(ListPage)
