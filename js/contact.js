const APILINK = '';

function UploadFile() {

    // Create a FormData object to send the form data
    var formData = new FormData(document.getElementById('apply-form'));

    // Make an AJAX request to your server-side script
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
