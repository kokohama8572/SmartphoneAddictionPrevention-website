/**
 * loading.js - 로딩 페이지 자바스크립트
 * 제작: 김시영, 이민서
 */

// 복잡한 애니메이션 다 빼고 타이머로 심플하게
function initLoading() {
  let bar = document.getElementById('progressBar');
  let text = document.getElementById('loadingHint');
  
  let hints = [
    '기회비용을 계산 중입니다...',
    '팩폭을 때릴 준비 중이에요...',
    '마음의 준비 단단히 하세요 😱'
  ];
  let currentHint = 0;
  
  // 1초마다 글씨 바뀌게
  setInterval(function () {
    currentHint++;
    if (currentHint >= hints.length) {
      currentHint = 0;
    }
    if (text) {
      text.textContent = hints[currentHint];
    }
  }, 1000);

  // 로딩바 채우기 애니메이션
  let width = 0;
  let barTimer = setInterval(function () {
    width += 2; // 2%씩 채우기
    if (bar) bar.style.width = width + '%';
    
    if (width >= 100) {
      clearInterval(barTimer);
      // 다 채워지면 결과창으로 슝!
      window.location.href = 'result.html';
    }
  }, 50); // 0.05초마다 실행 (약 2.5초 걸림)
}

window.onload = function () {
  initLoading();
};