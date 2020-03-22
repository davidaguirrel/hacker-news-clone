function getPost(posts) {
  console.log('AQUI')
  for(let id of posts) {
    return Promise.all(
      fetchPost(id)
    ).then(data => console.log(data))
  }
}

export function fetchPost(id) {
  return fetch(`http://hacker-news.firebaseio.com/v0/item/${id}.json`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)
      return data
    })
}

export function fetchTopPosts() {
  const endpoint = 'http://hacker-news.firebaseio.com/v0/topstories.json'
  let posts = []

  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
        return data
    })
}