const endpoint = 'https://hacker-news.firebaseio.com/v0'
const json = '.json?print=pretty'

export function fetchPost(id) {
  return fetch(`${endpoint}/item/${id}${json}`)
    .then((res) => {
      return res.json()
    })
    .then(data => {
      if(!data){
        throw new Error('There was an error fetching the post')
      }
      return data
    })
}

export function fetchTopPosts(type) {
  return fetch(`${endpoint}/${type}stories${json}`)
    .then((res) => res.json())
    .then((ids) => {
      if(!ids) {
        throw new Error('There was an error fetching posts')
      }
      return ids.slice(0, 50)
    })
    .then((ids) => {
      return Promise.all(ids.map(fetchPost))
        .then(posts => {
          return posts
        })
    })
}

export function getKids(ids) {
  return Promise.all(ids.map(fetchPost))
    .then(kids => {
      return kids
    })
}

export function fetchUser(userId) {
  return fetch(`${endpoint}/user/${userId}${json}`)
    .then((res) => res.json())
    .then((user) => {
      if(!user){
        throw new Error('There was an error fetching this user')
      }
      return user
    })
}

function filterNoComments(posts) {
  return posts.filter(post => post.type !== 'comment')
}

export function fetchPostsSubmitted(ids) {
  return Promise.all(ids.map(fetchPost))
    .then(posts => {
      return filterNoComments(posts)
    })
}


//   return fetch(endpoint)
//     .then((res) => res.json())
//     .then((data) => {
//         for(let i = 0; i < 3; i++){
//           fetchPost(data[i])
//             .then(result => {
//               console.log('result', JSON.stringify(result, null, 2))
//               posts.push(result)
//               // return posts
//             })
//         }
//         // console.log('posts', JSON.stringify(posts))
//         return posts
//     })
// }


