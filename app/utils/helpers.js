export function formatDate(time) {
  const date = new Date(time * 1000)
    .toLocaleDateString('en-US', {
      hour: 'numeric',
      minute: 'numeric'
    })

  return date
}