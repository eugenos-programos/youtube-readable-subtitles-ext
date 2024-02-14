document.addEventListener("DOMContentLoaded", function() {
    var button = document.getElementById("myButton");
    var urlInput = document.getElementById("urlInput");
    var outputDiv = document.getElementById("output");
  
    button.addEventListener("click", function() {
      var url = urlInput.value;
      if (url) {
        // Call a function with the URL and get some output
        var output = processData(url);
        outputDiv.textContent = output;
      } else {
        outputDiv.textContent = "Please enter a URL.";
      }
    });
  
    function processData(url) {
      return "URL: " + url;
    }
  });
    