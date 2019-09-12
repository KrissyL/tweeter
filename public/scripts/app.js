/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => { //will not run any code until the document is loaded
  const form = $('#new-tweet-form');
  form.on('submit', (evt) => {
    evt.preventDefault();

      $.ajax({
      url: '/tweets',
      type: 'POST',
      data: form.serialize()
    })
    .then(loadTweets)
  });
})

//loads all tweets plus the newly created tweet
const loadTweets = function() {
  $.ajax({ //get request to call all tweets
    url: '/tweets'
  })
  .then(renderTweets);
}

//renders all tweets
const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      createTweetElement(tweet);
    }
  };

//create a new tweet
const createTweetElement = function(data) {
  //template for all new tweets
  const $tweet = 
  $("<article>").addClass("tweet")
  .append(
    $("<header>")
      .append(
      ($("<aside>").addClass("hide").text(data.user.handle))//appended inside header
      )
    .append(
      ($("<figure>").append(`<img src=${data.user.avatars}>`)//appended inside header
      .append(data.user.name))//user name with avatar centered to it
    )
  )
  .append($("<p>").text(data.content.text))//tweet text
  .append(
    $("<footer>").append(
      ($("<time>").text(data.created_at))//time it was posted at (to be modified)
      .append(`<img src="/images/icons/tweet-icons.png">`)
    )
  );
  $('#tweets-container').append($tweet);//add new tweet to the tweets-container in index.html
}


