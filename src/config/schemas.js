import { Schema, arrayOf } from 'normalizr'

const story = new Schema('story')

export default {
  STORY: story,
  STORY_ARRAY: arrayOf(story),
}
