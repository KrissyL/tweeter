$(document).ready(function() {
  $('#new-tweet-form').on('submit', (() => {
    if ($('textarea').val() === "") { // prevents submission of empty strings
      alert("can't submit and empty Tweet, write something!");
    }
  }));
  
  // using keyup to evaluate the textarea for character counter
  $('#tweet-text').on('keyup', function() {
    let charCount = 140 - this.value.length;
    
    // decides when to turn '.negCounter' on and off
    if (charCount < 0) {
        $(this).siblings('.counter').toggleClass('negCounter', true);
        $('#new-tweet-form').on('submit', (() => { alert('Your tweet has too many characters!')}));// prevents a submit w/ too many chars
    } else {
        $(this).siblings('.counter').toggleClass('negCounter', false);
        
    }
    $(this).siblings('.counter').text(`${charCount}`);
  });
  
});