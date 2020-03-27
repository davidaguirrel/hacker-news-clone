const endpoint = 'http://hacker-news.firebaseio.com/v0'
const json = '.json?print=pretty'

export function fetchPost(id) {
  return fetch(`http://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
    .then((res) => {
      return res.json()
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

// function filterNoUrl(posts) {
//   return posts.filter(post => !post.url)
// }

export function getKids(ids) {
  return Promise.all(ids.map(fetchPost))
    .then(kids => kids)
}

export function fetchUser(userId) {
  const endpoint = `http://hacker-news.firebaseio.com/v0/user/${userId}.json?print=pretty`

  return fetch(endpoint)
    .then((res) => res.json())
    .then((user) => {
      return user
      // return Promise.all(user.submitted.map(fetchPost))
      //   .then(posts => {
      //     return filterNoComments(posts)
      //   })
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


