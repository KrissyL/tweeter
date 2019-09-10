$(document).ready(function() {
  // using keyup to evaluate the textarea for character counter
  $('#tweet-text').on('keyup', function() {
    console.log(this.value); // log the key values in textarea
  });
});

