/**
 * challenge.js - 디톡스 챌린지 페이지 자바스크립트
 * 제작: 김시영, 이민서
 */

// 체크한 날짜들을 저장할 빈 배열 (장바구니 같은 역할!)
let checkedDays = [];

// 1. 챌린지 체크박스 기능
function initChallenge() {
  // 로컬스토리지(브라우저 저장소)에 저장된 기록이 있으면 불러오기
  let savedData = localStorage.getItem('challengeDays');
  if (savedData) {
    checkedDays = JSON.parse(savedData);
  }

  // 화면에 있는 모든 체크 버튼 다 가져오기
  let btns = document.querySelectorAll('.check-btn');
  
  for (let i = 0; i < btns.length; i++) {
    let btn = btns[i];
    let day = parseInt(btn.getAttribute('data-day'));

    // 만약 이미 체크했던 날짜면 화면에도 체크 표시해주기
    if (checkedDays.includes(day)) {
      btn.classList.add('checked');
      btn.textContent = '✓';
    }

    // 버튼을 클릭했을 때 일어날 일
    btn.addEventListener('click', function () {
      if (checkedDays.includes(day)) {
        // 이미 체크되어 있는데 또 누르면? -> 체크 해제!
        let index = checkedDays.indexOf(day);
        checkedDays.splice(index, 1); // 배열에서 삭제
        btn.classList.remove('checked');
        btn.textContent = '☐';
      } else {
        // 체크 안 되어 있으면 -> 체크하기!
        checkedDays.push(day);
        btn.classList.add('checked');
        btn.textContent = '✓';
      }

      // 변경된 기록을 브라우저에 다시 저장
      localStorage.setItem('challengeDays', JSON.stringify(checkedDays));
      
      // 진행률 바 업데이트 함수 실행
      updateProgress();
    });
  }

  // 처음 페이지 켰을 때도 진행률 한 번 계산해주기
  updateProgress();
}

// 2. 진행률 바 채워주는 함수
function updateProgress() {
  let count = checkedDays.length; // 몇 개 체크했는지 개수
  
  // 숫자 바꿔주기
  let countText = document.getElementById('checkedCount');
  if (countText) {
    countText.textContent = count;
  }

  // 게이지 바 퍼센트 계산해서 넓이(width) 늘려주기
  let pct = Math.round((count / 7) * 100);
  let bar = document.getElementById('challengeProgress');
  if (bar) {
    bar.style.width = pct + '%';
  }

  // 체크 개수에 따라 응원 메시지 바꾸기
  let msgBox = document.getElementById('progressMsg');
  if (msgBox) {
    if (count === 0) {
      msgBox.textContent = 'DAY 1부터 차근차근 깨보자구요!';
    } else if (count <= 3) {
      msgBox.textContent = '오~ 시작이 반입니다! 파이팅 🔥';
    } else if (count <= 6) {
      msgBox.textContent = '절반 넘었어요! 쪼금만 더 버텨봐요!';
    } else if (count === 7) {
      msgBox.textContent = '대박! 7일 챌린지 성공! 🎉 진짜 폰 안 보고 살 수 있네요!';
    }
  }
}

// 3. 문의하기 폼 기능
function initForm() {
  let form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // 전송 버튼 누르면 새로고침 되는 기본 기능 막기

    let name = document.getElementById('contactName').value;
    let email = document.getElementById('contactEmail').value;
    let msg = document.getElementById('contactMsg').value;
    let agree = document.getElementById('agreePrivacy').checked;
    
    let errorBox = document.getElementById('formError');

    // 빈칸 있는지 하나하나 검사하기 (노가다지만 제일 확실함!)
    if (name === '') {
      errorBox.textContent = '이름을 깜빡하셨네요!';
      return;
    }
    if (email === '') {
      errorBox.textContent = '이메일을 적어주셔야 답장을 드려요!';
      return;
    }
    if (msg === '') {
      errorBox.textContent = '내용이 비어있어요. 아무 말이나 적어주세요!';
      return;
    }
    if (agree === false) {
      errorBox.textContent = '개인정보 수집에 체크해주셔야 넘어갑니다!';
      return;
    }

    // 에러 다 통과했으면 에러 메시지 지우기
    errorBox.textContent = '';

    // 진짜 폼은 숨기고 완료 메시지 짜잔 하고 보여주기
    form.style.display = 'none';
    document.getElementById('formSuccess').removeAttribute('hidden');
  });
}

// 페이지 다 로딩되면 함수들 실행시켜주기
window.onload = function () {
  initChallenge();
  initForm();
};