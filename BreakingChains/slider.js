document.addEventListener("DOMContentLoaded", function() {
    var duration = 3000; // Duration in milliseconds
    var start = 0;
    var end = 50;
  
    var startTime = Date.now();
  
    function updatePos() {
      var currentTime = Date.now();
      var elapsed = currentTime - startTime;
  
      if (elapsed < duration) {
        var progress = elapsed / duration;
        var value = start + progress * (end - start);
        document.body.style.setProperty('--pos', value + '%');
        setTimeout(updatePos, 16); // Run the update every ~16 milliseconds for smooth animation
      } else {
        document.body.style.setProperty('--pos', end + '%'); // Ensure the final value is exactly 'end'
      }
    }
  
    // Start the animation when the page loads
    updatePos();
  });
  