import Entity from './entity'
import storyFactory from './story'

export default [
  Entity,
  storyFactory('top'),
  storyFactory('new'),
  storyFactory('show'),
  storyFactory('ask'),
  storyFactory('jobs'),
]
