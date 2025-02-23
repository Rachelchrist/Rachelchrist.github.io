function styleSections() {
  const hash = window.location.hash.substring(1);

  const sections = document.querySelectorAll('section');

  const sectionsArray = Array.from(sections);

  sectionsArray.forEach((section, i) => {
    if (section.id.split(' ')[0] == hash ||
      section.classList[0] == 'footer') {
      // Show this section  
      section.style.display = 'block';
      section.style.setProperty('background', '#7639a4', 'important');
      section.style.setProperty('color', '#ffff', 'important');
    } else {
      section.style.display = 'none';
    }

  });
  const subSection = document.getElementById('sub');
  // Set !important background
  subSection.style.setProperty('background', 'white', 'important');
  subSection.style.setProperty('color', '#7639a4', 'important');
  subSection.style.display = 'block';
document.getElementById('nsub').style.setProperty('background', '#7639a4', 'important');
  document.getElementById('nsub').style.setProperty('color', 'white', 'important');

  if ('' == hash) {
    const reg = document.querySelector("#mission")
    // Set !important background
    reg.style.setProperty('color', 'white', 'important');
    reg.style.setProperty('background', '#7639a4', 'important');
    reg.style.display = 'block';
  }
}

styleSections();

window.addEventListener('hashchange', styleSections);

$(document).ready(function() {
  $.get("public_data/our-team.csv", function(data) {
    var team = $.csv.toObjects(data);
    teamMember(team);
    $('.card-cont').click(function() {
      const index = $(this).index();
  const member = team[index];
  $('#memberName').text(member.name);
  $('#memberRole').text(member.role);
  $('#memberImage').attr('src', member.image_url);
  $('#memberDetails').text(member.description);

  $('#memberModal').modal('show');
    })
  });
});
function teamMember(team) {
  var mcontainer = $("#members_container");
  team.forEach(function(member) {
    var card = `<div class="card-cont col-12 col-md-6 col-lg-3">
        <div class="card border-0 border-bottom border-primary shadow-sm overflow-hidden">
          <div class="card-body p-0">
            <figure class="m-0 p-0">
              <img class="img-fluid" loading="lazy" src="${member.image_url}" alt="">
              <figcaption class="m-0 p-4">
                <h4 class="mb-1">${member.name}</h4>
                <p class="text-secondary mb-0">${member.role}r</p>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>`
    mcontainer.append(card);
  })
}