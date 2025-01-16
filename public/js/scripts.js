document.addEventListener('DOMContentLoaded', function () {  
    /* ======== Back to Top Button ======== */  
    const backToTopButton = document.getElementById('back-to-top');  
  
    // 스크롤 이벤트 등록  
    window.addEventListener('scroll', () => {  
      if (window.scrollY > 300) {  
        backToTopButton.style.display = 'block'; // 스크롤이 일정 높이를 넘으면 버튼 표시  
      } else {  
        backToTopButton.style.display = 'none'; // 아니면 숨김  
      }  
    });  
  
    // "Back to Top" 버튼 클릭 시 페이지 상단으로 부드럽게 스크롤  
    backToTopButton.addEventListener('click', (event) => {  
      event.preventDefault();  
      window.scrollTo({ top: 0, behavior: 'smooth' });  
    });  
  
    /* ======== Dark Mode Toggle ======== */  
    const darkModeToggle = document.getElementById('dark-mode-toggle');  
    let isDarkMode = false;  
  
    // 다크 모드 토글 버튼 구현  
    darkModeToggle.addEventListener('click', () => {  
      isDarkMode = !isDarkMode;  
  
      if (isDarkMode) {  
        document.documentElement.setAttribute('data-theme', 'dark');  
        darkModeToggle.textContent = 'Switch to Light Mode';  
      } else {  
        document.documentElement.setAttribute('data-theme', 'light');  
        darkModeToggle.textContent = 'Switch to Dark Mode';  
      }  
    });  
  });



// scripts.js  

// Create Contact function to send form data to server  
function createContact() {  
  // Gather form values  
  const name = document.getElementById('name').value;  
  const email = document.getElementById('email').value;  
  const phone = document.getElementById('phone').value;  
  const memo = document.getElementById('comments').value;  

  // Form validation  
  if (!name || !email || !memo) {  
    alert('Please fill out all required fields.');  
    return;  
  }  

  // Send form data via POST request  
  fetch('/api/contact', {  
    method: 'POST',  
    headers: {  
      'Content-Type': 'application/json',  
    },  
    body: JSON.stringify({ name, email, phone, memo }),  
  })  
    .then((response) => {  
      if (!response.ok) {  
        throw new Error('Failed to submit data.');  
      }  
      return response.text();  
    })  
    .then((message) => {  
      // Show success message  
      alert('작성이 완료되었습니다.');  
      // Redirect to home page  
      window.location.href = '/';  
    })  
    .catch((error) => {  
      console.error('Error:', error);  
      alert('An error occurred while sending your message. Please try again.');  
    });  
}  