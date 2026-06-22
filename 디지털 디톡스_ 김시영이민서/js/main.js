/**
 * main.js - 홈 페이지 전용 자바스크립트
 * 제작: 김시영, 이민서
 */

// 1. 통계 숫자 올라가는 애니메이션 (단순 타이머 방식)
function animateStats() {
  let statNums = document.querySelectorAll('.stat-num');

  for (let i = 0; i < statNums.length; i++) {
    let el = statNums[i];
    let target = parseFloat(el.getAttribute('data-target'));
    let current = 0;
    let step = target / 50; // 50번에 나눠서 올리기
    let isDecimal = target % 1 !== 0; // 소수점인지 확인

    let timer = setInterval(function () {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      // 소수점인 경우와 정수인 경우 나눠서 출력
      if (isDecimal) {
        el.textContent = current.toFixed(1);
      } else {
        el.textContent = Math.floor(current);
      }
    }, 30); // 0.03초마다 실행
  }
}

// 2. 스마트폰 타이머 (시간 계속 올라가는 척 하기)
function startPhoneTimer() {
  let timerEl = document.getElementById('heroTimer');
  if (!timerEl) return;

  let totalMinutes = 263; // 시작 시간: 4시간 23분 (263분)

  setInterval(function () {
    totalMinutes++; // 1초마다 1분씩 오르는 걸로 뻥튀기!
    let h = Math.floor(totalMinutes / 60);
    let m = totalMinutes % 60;

    // 한 자리 수면 앞에 0 붙여주기 (예: 9분 -> 09분)
    let hourStr = h < 10 ? '0' + h : h;
    let minStr = m < 10 ? '0' + m : m;

    timerEl.textContent = hourStr + ':' + minStr;
  }, 1000); // 1초마다 실행
}

// 3. 막대 그래프 스르륵 올라오는 애니메이션
function showBars() {
  let bars = document.querySelectorAll('.phone-screen .bar');
  
  for (let i = 0; i < bars.length; i++) {
    let bar = bars[i];
    let targetHeight = bar.style.height; // 원래 HTML에 적어둔 높이 기억해두기
    bar.style.height = '0%'; // 일단 바닥으로 내림

    // 시간차를 두고 서서히 올라오게 만들기 (0.4초, 0.55초, 0.7초...)
    setTimeout(function () {
      bar.style.height = targetHeight;
    }, 400 + (i * 150));
  }
}

// 페이지 로딩 다 끝나면 실행
window.onload = function () {
  animateStats();
  startPhoneTimer();
  showBars();
};