// This script enables cross-origin height communication for blog posts in iframes
// It should be added to your blog posts or can be included conditionally based on URL parameters

// Check if we're in an iframe and if the resize parameter is present
(function() {
  // Only run this script when inside an iframe
  if (window.self !== window.top && (
    // Check if this is meant to be in an iframe
    window.location.search.includes('_iframe=true') || 
    // Allow manual inclusion of the script for testing
    window.junedangIframeResize === true
  )) {
    // Function to measure and send height
    function reportHeight() {
      // Get document height
      const height = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      
      // Send message to parent window
      window.parent.postMessage({
        type: 'resize-iframe',
        height: height
      }, '*');
    }
    
    // Report height when loaded
    window.addEventListener('load', reportHeight);
    
    // Report height on resize
    window.addEventListener('resize', reportHeight);
    
    // Report height after images load
    document.addEventListener('DOMContentLoaded', function() {
      const images = document.querySelectorAll('img');
      let loadedImages = 0;
      const totalImages = images.length;
      
      // If no images, just report height
      if (totalImages === 0) {
        reportHeight();
      }
      
      // Report height after each image loads
      images.forEach(function(img) {
        if (img.complete) {
          loadedImages++;
          if (loadedImages === totalImages) {
            reportHeight();
          }
        } else {
          img.addEventListener('load', function() {
            loadedImages++;
            if (loadedImages === totalImages) {
              reportHeight();
            }
            reportHeight(); // Report after each image too
          });
          
          // Also count images that fail to load
          img.addEventListener('error', function() {
            loadedImages++;
            if (loadedImages === totalImages) {
              reportHeight();
            }
          });
        }
      });
    });
    
    // Initial report
    reportHeight();
    
    // Report periodically for dynamic content changes
    setInterval(reportHeight, 1000);
    
    // Report on any DOM mutations (for dynamic content)
    if (window.MutationObserver) {
      const observer = new MutationObserver(function(mutations) {
        reportHeight();
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true
      });
    }
    
    // Add event listener for custom events that might trigger a resize
    document.addEventListener('junedangResize', reportHeight);
    
    console.log('Junedang iframe resize script initialized');
  }
})();