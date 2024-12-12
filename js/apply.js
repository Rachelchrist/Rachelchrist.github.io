const APILINK = '';
// Fetch jobs data 
fetch('public_data/jobs.json')
  .then(response => response.json())
  .then(data => {

    const jobs = data;

    // Get job ID
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get('index');

    // Find job
    const job = jobs.find(j => j.id == jobId);

    if (job) {
      document.getElementById("JobTitle").value = job.title;
      document.getElementById('selected-job').innerHTML = `
    <h2 style="display: inline;">Applying for: </h2><h3 style="display: inline;">${job.title}</h3>
    <h4 style="display: inline;">| Date: ${job.date}</h4>
    
  `;
    }

  });
function UploadFile() {
  var reader = new FileReader();
  var file = document.getElementById('resume').files[0];
  reader.onload = function() {
    document.getElementById('fileContent').value = reader.result;
    document.getElementById('filename').value = file.name;

    var formData = new FormData(document.getElementById('apply-form'));

    // Make an AJAX request to your google sheet storage
    fetch(APILINK, {
      method: 'POST',
      body: formData,
    })
      .then(function(response) {
        if (response.ok) {
          // Display a success message
          const modal = new bootstrap.Modal(document.getElementById('submitModal1'));
            modal.show();

          // Clear the form fields
          document.getElementById('apply-form').reset();
        } else {
          // Handle the error if the submission fails
          alert('Form submission failed');
        }
      })
      .catch(function(error) {
        console.error('Error:', error);
        alert('An error occurred while submitting the form. Please try again.');
      });
  }
  reader.readAsDataURL(file);
}
