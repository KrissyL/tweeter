/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json
const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

 $(document).ready(function() {
 
  const createTweetElement = function(data) {
      // create a new tweet
    const $tweet = 
    $("<article>").addClass("tweet")
    .append(
      $("<header>").append(
        ($("<aside>").addClass("hide").text(data.user.handle))
        )
      .append(
        (
          $("<figure>").append(`<img src=${data.user.avatars}>`)
          .append(data.user.name)
        )
      )
    )
    .append($("<p>").text(data.content.text))
    .append(
      $("<footer>").append(
        ($("<time>").text(data.created_at))
        .append(`<img src="/images/icons/tweet-icons.png">`)
      )
    );
    $('#tweets-container').append($tweet);
  }
  createTweetElement(data[0]);
  createTweetElement(data[1]);
})