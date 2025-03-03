const APILINK = '';
$(document).ready(function() {
  $.get("component/footer.html", function(data) {
    $(".footer").prepend(data);
  });
  $.get("component/nav.html?v=1", function(data) {
    $("header").prepend(data);
  });
});
$.ajax({
  url: "component/signup.html",
  async: false,
  success: function(data) {
    $(".sub").prepend(data);
  }
});
$(document).ready(function() {
  // Element should exist here
  $(".nsub").click(function() {
    var email = $("#email").val();
    if (email == '') {
      return
    } else {
      var formData = new FormData(document.getElementById('apply-forms'));

      // Make an AJAX request to your server-side script
      fetch(APILINK, {
        method: 'POST',
        body: formData,
      })
        .then(function(response) {
          if (response.ok) {
            // Display a success message
            const modal = new bootstrap.Modal(document.getElementById('submitModal'));
            modal.show();
            // Clear the form fields
            document.getElementById('apply-forms').reset();
          } else {
            // Handle the error if the submission fails
            alert('Form submission failed');
          }
        })
    }
  });

});