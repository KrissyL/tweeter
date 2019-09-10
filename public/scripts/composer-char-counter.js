$(document).ready(function() {
  // using keyup to evaluate the textarea for character counter
  $('#tweet-text').on('keyup', function() {
    let charCount = 140 - this.value.length;
    
    // decides when to turn '.negCounter' on and off
    if (charCount < 0) {
        $('.counter').toggleClass('negCounter', true);
    } else {
        $('.counter').toggleClass('negCounter', false);
    }
    $('.counter').text(`${charCount}`);
  });
});

