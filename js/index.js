// Truncate text to max words
function truncate(text, maxWords) {
  let words = text.split(' ');
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(' ') + '...';
  } else {
    return text;
  }
}

$(document).ready(function() {
  $.get("public_data/hero.csv", function(data) {
    var hero = $.csv.toObjects(data);
    displayhero(hero);
    
  });
});
function displayhero(hero) {
  var herobar = $("#hero");

  herodata = hero[0]
  // herobar.css('background-image', 'url(' + herodata.image_url + ')');

  let truncatedDesc = truncate(herodata.description, 55);
  var herodetail = `<div class="row">
            <div class="section_split_img col-md-6">
            <img src="${herodata.image_url}" class="img-fluid rounded" alt="Our mission">
          </div>
          <div class="section_split_info col-md-6">
            <h2>${herodata.topic}</h2>
            <p>${truncatedDesc}</p>
          </div>
        </div>
      <a href="/our-work.html" class="more_button btn btn-primary btn-lg">Read More</a>
        `;

  herobar.append(herodetail);
}