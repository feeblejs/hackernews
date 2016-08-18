import firebase from 'firebase'

const db = firebase.initializeApp({
  databaseURL: 'https://hacker-news.firebaseio.com',
}).database()

function fetch(path) {
  return new Promise(resolve => {
    db.ref(`/v0/${path}`).once('value', function(snapshot) {
      resolve(snapshot.val())
    })
  })
}

export function fetchIdsByType(type) {
  return fetch(`${type}stories`)
}

export function fetchStory(id) {
  return fetch(`item/${id}`)
}

export function fetchStorys(ids) {
  return Promise.all(ids.map(id => fetchStory(id)))
}
