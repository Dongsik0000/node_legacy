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