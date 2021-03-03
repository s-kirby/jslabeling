function getRadio(radioID) {
  // Finds the value of a radio

  // Get radios by ID
  let radios = document.getElementsByName(radioID)

  // Iterate over radios to extract checked value
  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      return radios[i].value;
    }
  }
  // No radio was checked in browser
  return null;
}


var labelForm =  document.getElementById('label-form');
var messageDiv = document.getElementById('msg-space');

labelForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  // Send POST request to update labels for this sample.
  fetch('/label', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      hasCars: getRadio('car-label'),
      hasRain: getRadio('rain-label'),
      sampleID: document.getElementById('target-sample').alt
    })
  })
  .catch(error => console.error(error));
})
