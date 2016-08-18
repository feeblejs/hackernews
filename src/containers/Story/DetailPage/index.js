import React, { Component } from 'react'
import { connect } from 'feeble'
import storyFactory from '../../../models/story'
import Item from './Item'

const Story = storyFactory('top')

class DetailPage extends Component {
  componentWillMount() {
    const { dispatch, story, params: { id } }  = this.props
    if (!story) {
      dispatch(Story.fetchOne(id))
    }
  }

  render () {
    const { story } = this.props

    return story ? <Item story={story} /> : null
  }
}

export default connect((state, props) => ({
  story: Story.select('one', props)
}))(DetailPage)
