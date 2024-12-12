$(document).ready(function() {
  $.get("public_data/hero.csv", function(data) {
    var news = $.csv.toObjects(data);
    displaynews(news);
  });
});
function displaynews(news) {
  var newsection = $("#work");
  // topic,image_url,description,date
  news.forEach((article, i) => {
    article = `      <div class="accordion accordion-flush" id="accordionNews">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#flush-collapse${i}" aria-expanded="false" aria-controls="flush-collapse${i}">
              ${article.topic} - ${article.date}
            </button>
          </h2>
          <div id="flush-collapse${i}" class="accordion-collapse collapse" data-bs-parent="#accordionNews">
            <div class="accordion-body">
              <div class='accordion-info'>
              <img src='${article.image_url}'
                class='img_news'>
                <div class='little_data'>
              <h1 class='name'>${article.topic}</h1>
              <h2 class='date'>${article.date}</h2>
                </div>
              </div>
              <p>${article.description}</p>
            </div>
          </div>
        </div>
      </div>
`
    newsection.append(article);

  })
}