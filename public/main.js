const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
  // Send PUT Request here
  fetch('/quotes', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: "Paul",
      quote: "Yoooo"
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(response => {
    window.location.reload(true)
  })
})

const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

deleteButton.addEventListener('click', _ => {
  fetch('/quotes', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Paul'
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(data => {
      window.location.reload()
    })
    .then(response => { // Response from app
      if (response === 'No quote to delete') {
        messageDiv.textContent = 'No Paul quote to delete'
      } else {
        window.location.reload(true)
      }
    })
    .catch(error => console.error(error))
})