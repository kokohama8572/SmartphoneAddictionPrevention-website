/**
 * common.js - 디지털 디톡스 프로젝트 공통 자바스크립트
 * 제작: 김시영, 이민서
 */

// 1. 모바일 햄버거 메뉴 열고 닫는 함수
function initNav() {
  let toggleBtn = document.getElementById('navToggle');
  let menu = document.querySelector('.nav-menu');

  if (toggleBtn && menu) {
    toggleBtn.addEventListener('click', function () {
      // 메뉴가 안 보이면 보이게, 보이면 안 보이게 바꿔주기
      if (menu.style.display === 'block') {
        menu.style.display = 'none';
      } else {
        menu.style.display = 'block';
      }
    });
  }
}

// 2. 숫자가 다라락! 하고 올라가는 애니메이션 함수
// (requestAnimationFrame 대신 학생들이 제일 많이 쓰는 setInterval로 쉽게 만듦)
function animateNumber(element, targetNum) {
  let currentNum = 0;
  // 50번 만에 목표 숫자에 도달하도록 쪼개기
  let step = targetNum / 50; 
  
  // 소수점인 경우와 정수인 경우를 나눠서 처리
  let isDecimal = targetNum % 1 !== 0; 

  let timer = setInterval(function () {
    currentNum += step;
    
    // 목표 숫자보다 커지면 멈추기
    if (currentNum >= targetNum) {
      currentNum = targetNum;
      clearInterval(timer);
    }

    // 소수점 1자리까지만 보여줄 건지, 그냥 정수만 보여줄 건지 결정
    if (isDecimal) {
      element.textContent = currentNum.toFixed(1);
    } else {
      element.textContent = Math.floor(currentNum);
    }
  }, 30); // 0.03초마다 한 번씩 실행!
}

// 페이지 다 로딩되면 실행할 것들
window.addEventListener('DOMContentLoaded', function () {
  // 헤더 네비게이션 켜기
  initNav();

  // 메인 페이지 등에 있는 통계 숫자들 애니메이션 먹이기
  let statNums = document.querySelectorAll('.stat-num');
  
  for (let i = 0; i < statNums.length; i++) {
    // HTML에 데이터로 숨겨놓은 목표 숫자 가져오기
    let target = parseFloat(statNums[i].getAttribute('data-target'));
    
    // 숫자가 맞으면 애니메이션 시작!
    if (!isNaN(target)) {
      animateNumber(statNums[i], target);
    }
  }
});