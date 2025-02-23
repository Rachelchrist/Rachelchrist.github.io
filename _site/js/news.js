$(document).ready(function() {
  $.get("public_data/hero.csv", function(data) {
    var news = $.csv.toObjects(data);
    displaynews(news);
    $('.news-items').on('click', 'a', function() {
      let article = news[$(this).attr('href').slice(1)];

      // Populate modal 
      $('.img_news').attr('src', article.image_url);
      $('#articleModalLabel').text(article.topic);
      $('.article-title').text(article.topic);
 $('.article-date').text(article.date);
       $('.article-text').text(article.description);

      // Show modal
      $('#articleModal').modal('show');

    });
  });
});
function displaynews(news) {
  var newsectionfeatured = $(".featured");
  var newssectionnotfeatured = $('.notfeatured')
  featuredData = news[0]
  var featured = `                    <!-- Featured blog post-->

                        <div class="card mb-4">
                        <img class="card-img-top" src="${featuredData.image_url}" alt="..." />
                        <div class="card-body">
                            <div class="small text-muted">${featuredData.date}</div>
                            <h2 class="card-title"> ${featuredData.topic}</h2>
                            <a class="btn btn-secondary" href="#0">Read more →</a>
                        </div>
                    </div>
`
  for (let i = 1; i < 4; i++) {
    let article = news[i];
    articley = `
              <div style="background: url(${article.image_url})" class="borderer card-w-${i} card mb-4">
                <div class="card-body">
                  <div class="small text-muted">${article.date}</div>
                  <h2 class="card-title h4">${article.topic}</h2>
                  <a class="btn btn-secondary" href="#${i}">Read more →</a>
                </div>
              </div>
    `
    $(".side").append(articley)
  }

  for (let i = 1; i < news.length; i++) {
    let article = news[i];
    articley = `
    <div class="card-n-${i} col-md-4">
              <div style="background: url(${article.image_url})" class="borderer card mb-4">
                <div class="card-body">
                  <div class="small text-muted">${article.date}</div>
                  <h2 class="card-title h4">${article.topic}</h2>
                  <a class="btn btn-secondary" href="#${i}">Read more →</a>
                </div>
              </div>
              </div>
    `
    // articley = `
    // <div class="col">
    //     <div class="card card-cover h-80 overflow-hidden text-white bg-dark rounded-5 shadow-lg" style="background-image: url('${article.image_url}');">
    //       <div class="d-flex flex-column h-80 p-5 pb-3 text-white text-shadow-1">
    //         <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Short title, long jacket</h2>
    //         <ul class="d-flex list-unstyled mt-auto">
    //           <li class="d-flex align-items-center me-3">
    //             <svg class="bi me-2" width="1em" height="1em"><use xlink:href="#geo-fill"></use></svg>
    //             <small>${article.date}</small>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>`
    newssectionnotfeatured.append(articley)
  }
  newsectionfeatured.append(featured);
}