window.addEventListener('DOMContentLoaded', () => {
    const urlForm = document.getElementById('urlForm');
    const urlInput = document.getElementById('urlInput');
    const resultContainer = document.getElementById('resultContainer');
  
    urlForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const url = urlInput.value.trim();
      if (url === '') {
        alert('Please enter a valid URL.');
        return;
      }
  
      // Display loading animation
      resultContainer.innerHTML = `
        <div class="middle">
          <div class="bar bar1"></div>
          <div class="bar bar2"></div>
          <div class="bar bar3"></div>
          <div class="bar bar4"></div>
          <div class="bar bar5"></div>
          <div class="bar bar6"></div>
          <div class="bar bar7"></div>
          <div class="bar bar8"></div>
        </div>
      `;
  
      simulatePageLoad(url)
        .then((result) => {
          // Remove loading animation and display the result
          resultContainer.innerHTML = '';
          displayResult(result);
        })
        .catch((error) => {
          console.error('An error occurred during the page load test:', error);
        });
    });
  
    function simulatePageLoad(url) {
      return new Promise((resolve) => {
        // Simulate page load by waiting for a random amount of time (1-5 seconds)
        const randomDelay = Math.floor(Math.random() * 4000) + 1000;
        setTimeout(() => {
          const lcp = Math.random() * 3000 + 1000;
          const fid = Math.random() * 500 + 100;
          const cls = Math.random() * 0.1;
          const speedIndex = Math.random() * 5000 + 1000;
          const totalBlockingTime = Math.random() * 300 + 100;
          const viewTreemap = 'https://example.com/treemap';
          const imageLoadingSpeed = Math.random() * 200 + 100;
  
          const result = {
            url: url,
            lcp: lcp.toFixed(2),
            fid: fid.toFixed(2),
            cls: cls.toFixed(2),
            speedIndex: speedIndex.toFixed(2),
            totalBlockingTime: totalBlockingTime.toFixed(2),
            viewTreemap: viewTreemap,
            imageLoadingSpeed: imageLoadingSpeed.toFixed(2),
          };
  
          resolve(result);
        }, randomDelay);
      });
    }
  
    function displayResult(result) {
      resultContainer.innerHTML = `
        <h3>Results for URL: ${result.url}</h3>
        <div class="result-section">
          <p>Largest Contentful Paint: ${result.lcp}ms</p>
          <p>First Input Delay: ${result.fid}ms</p>
          <p>Cumulative Layout Shift: ${result.cls}</p>
        </div>
        <div class="result-section">
          <p>Speed Index: ${result.speedIndex}</p>
          <p>Total Blocking Time: ${result.totalBlockingTime}ms</p>
        </div>
        <div class="result-section">
          <p>Image Loading Speed: ${result.imageLoadingSpeed}ms</p>
        </div>
      `;
    }
  });
  function copyLink() {
    const resultContainer = document.getElementById('resultContainer');
    const resultLink = resultContainer.querySelector('a');
    const linkURL = resultLink.getAttribute('href');
  
    navigator.clipboard.writeText(linkURL)
      .then(() => {
        alert('Link copied to clipboard!');
      })
      .catch((error) => {
        console.error('Error copying link:', error);
      });
  }
  