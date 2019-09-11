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

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      createTweetElement(tweet);
    }
  };
 
  const createTweetElement = function(data) {
      // create a new tweet
    const $tweet = 
    $("<article>").addClass("tweet")
    .append(
      $("<header>").append(
        ($("<aside>").addClass("hide").text(data.user.handle))//appended inside header
        )
      .append(
        (
          $("<figure>").append(`<img src=${data.user.avatars}>`)//appended inside header
          .append(data.user.name)//user name with avatar centered to it
        )
      )
    )
    .append($("<p>").text(data.content.text))//tweet text
    .append(
      $("<footer>").append(
        ($("<time>").text(data.created_at))//time it was posted at (to be modified)
        .append(`<img src="/images/icons/tweet-icons.png">`)
      )
    );
    $('#tweets-container').append($tweet);
  }
  renderTweets(data);
})