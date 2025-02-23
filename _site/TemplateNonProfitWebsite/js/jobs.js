let data = [];
let odata = [];

// Define the keys you want to display in the DataTable
const keysToDisplay = ["id", "title", "location", "company", "date"];

// Define a list of blacklisted keys for the modal
const modalBlacklistKeys = ["id"];

// 2. Fetch the JSON data from the file
fetch('public_data/jobs.json')
  .then(response => response.json())
  .then(jsonData => {
    odata = jsonData;

    // Modify the JSON data to include missing keys with empty string values
    data = jsonData.map(item => {
      const modifiedItem = {};
      keysToDisplay.forEach(key => {
        modifiedItem[key] = item.hasOwnProperty(key) ? item[key] : '';
      });
      return modifiedItem;
    });

    // Initialize the DataTable with the modified data and specified columns
    initializeDataTable(keysToDisplay);
  })
  .catch(error => {
    console.error('Error loading JSON data:', error);
  });

// Function to initialize DataTable with loaded data and specified columns
function initializeDataTable(columns) {
  const table = $('#jobsTable').DataTable({
    data: data,
    columns: columns.map(key => ({
      title: key.charAt(0).toUpperCase() + key.slice(1),
      data: key
    })),
    lengthChange: false, // Remove "Show entries" dropdown
    pageLength: 10, // Set page size
    language: {
      paginate: {
        next: 'Next', // Customize pagination labels
        previous: 'Previous',
      },
    },
  });

  // Add a click event listener to each row
  $('#jobsTable tbody').on('click', 'tr', function () {
    const rowIndex = table.row(this).index(); // Get the clicked row index
    displayRowDetailsInModal(odata[rowIndex]); // Pass the clicked JSON object
  });

  // Pagination styling
  $('.dataTables_wrapper .pagination li').css({
    color: '#fff',
    // other styles
  });

  // Custom search handler
  $('#searcher').on('input', function () {
    table.search(this.value).draw();
  });
}

// Function to display row details in the modal
function displayRowDetailsInModal(detailedData) {
  const modal = $('#myModal');
  const modalBody = modal.find('.modal-body');

  // Clear previous content
  modalBody.empty();

  // Iterate through the detailed data and create <div> for each key-value pair
  Object.keys(detailedData).forEach(key => {
    const value = detailedData[key];

    // Check if the key is blacklisted for the modal
    if (!modalBlacklistKeys.includes(key)) {
      // Create a <div> for each key-value pair
      const div = $('<div>');

      // Create a <p> tag for the key
      const keyTag = $('<p>').text(key.charAt(0).toUpperCase() + key.slice(1)+': ').addClass('titler');

      // Create a <p> tag for the value
      const valueTag = $('<p>').text(value);

      // Check if the key should have the "inline" class
      if (['title', 'location', 'company', 'date', 'contact'].includes(key)) {
        keyTag.addClass('inline');
        valueTag.addClass('inline');
      }

      // Append the key and value to the <div>
      div.append(keyTag, valueTag);

      // Append the <div> to the modal body
      modalBody.append(div);
    }
  });
  modal.find('.modal-title').html(          detailedData['title'].charAt(0).toUpperCase() + detailedData['title'].slice(1))

  // Show the modal
  modal.modal('show');
}
