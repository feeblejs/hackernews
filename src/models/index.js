import Entity from './entity'
import storyFactory from './story'
import User from './user'

export default [
  Entity,
  storyFactory('top'),
  storyFactory('new'),
  storyFactory('show'),
  storyFactory('ask'),
  storyFactory('job'),
  User,
]
