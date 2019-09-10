$(document).ready(function() {
  // using keyup to evaluate the textarea for character counter
  $('#tweet-text').on('keyup', function() {
    let charCount = 140 - this.value.length;
    $('.counter').text(`${charCount}`);
  });
});

