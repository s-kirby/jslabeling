document.getElementById('submit-sample').addEventListener('submit', (evt) => {
  evt.preventDefault();
  
  // Send PUT request to update label.
  fetch('/label', {
    method: 'post',
    headers: {'Conent-Type': 'application/json'},
    body: JSON.stringify({
      carLabel: document.getElementById('submit-sample')
    })
  })
})
