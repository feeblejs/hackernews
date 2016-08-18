import React, { Component } from 'react'
import { connect } from 'feeble'
import User from '../../../models/user'
import Item from './Item'

class DetailPage extends Component {
  componentWillMount() {
    const { dispatch, user, params: { id } } = this.props
    if (!user) {
      dispatch(User.fetchOne(id))
    }
  }

  render() {
    const { user } = this.props

    return (
      user ? <Item user={user} /> : null
    )
  }
}

export default connect((state, props) => ({
  user: User.select('one', props.params.id)
}))(DetailPage)
