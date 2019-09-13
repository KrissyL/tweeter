/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => { //will not run any code until the document is loaded
  loadTweets();
  showNewTweet();
  fetchTweets();
  hideError();
})

//hides the error message once the user hits a key
const hideError = function() {
  if ($('.error:visible')) {
    $('textarea').on('keyup', (() => {
      $('.error').slideUp(200);
    }))
  }
};

//function to show new-tweet on arrow click
const showNewTweet = function() {
  $('.arrow').on('click', (() => {
    $('.new-tweet').slideToggle(400);
  }))
};

// check Tweet for character length before submitting
const submitCheck = function() {
  if ($.trim($("textarea").val()) === "") { //trim the textarea to prevent submissions that are only whitespace
    $('.error-message').text("Your Tweet is empty, please write something");
  } else if ($('textarea').val().length > 140) {
    $('.error-message').text("You've written too many characters, please shorten your Tweet");
  } else {
    return false;
  }
  $('.error').css('display', 'flex');
  return true;
};

//get all tweets from the db
const fetchTweets = function() {
  const form = $('#new-tweet-form');
  form.on('submit', (evt) => {
    evt.preventDefault();
    
    if (submitCheck()) {
      $('.error').slideDown(300);
    }
    else {  
      $.ajax({
      url: '/tweets',
      type: 'POST',
      data: form.serialize()
    })
    .then(loadTweets)
  }
  });
}

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
    .append($("<header>")
      .append(
      ($("<aside>").addClass("hide").text(data.user.handle))//appended inside header
      )
      .append(
        ($("<figure>").append(`<img src=${data.user.avatars}>`)//appended inside header
        .append(data.user.name))//user name with avatar centered to it
      )
    )
    .append($("<p>").text(data.content.text))//tweet text
    .append($("<footer>")
      .append(
        ($("<time>").text(convertDate(data.created_at)))//time it was posted at (to be modified)
        .append($(`<img class="hide" src="/images/icons/tweet-icons.png">`))//dummy icons that appear on mouse over
      )
    );
        $('#tweets-container').prepend($tweet);//add new tweet to the tweets-container in index.html
}          

//gets the date from the timestamp
const convertDate = function(timestamp) {
  const currentTime = new Date (); //current date
  const convertCurrent = currentTime.getTime(); //converted to timestamp
  
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;
  
  const timeSince = convertCurrent - timestamp;

  if (timeSince < minute) {
        return Math.round(timeSince/1000) + ' seconds ago';   
  }
  else if (timeSince < hour) {
        return Math.round(timeSince/minute) + ' minutes ago';   
  }
  else if (timeSince < day ) {
        return Math.round(timeSince/hour) + ' hours ago';   
  }
  else if (timeSince < month) {
      return 'approximately ' + Math.round(timeSince/day) + ' days ago';   
  }
  else if (timeSince < year) {
      return 'approximately ' + Math.round(timeSince/month) + ' months ago';   
  }
  else {
      return 'approximately ' + Math.round(timeSince/year ) + ' years ago';   
  }  
}
