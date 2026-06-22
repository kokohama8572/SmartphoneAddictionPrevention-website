/**
 * index.js - 스크린타임 계산기 입력 페이지 자바스크립트
 * 제작: 김시영, 이민서
 */

function initCalculator() {
  // HTML에서 요소들 찾아오기
  let input = document.getElementById('hoursInput');
  let slider = document.getElementById('hoursSlider');
  let form = document.getElementById('calcForm');
  let previewHours = document.getElementById('previewHours');
  let previewYear = document.getElementById('previewYearDays');
  let errorMsg = document.getElementById('calcError');

  // 값이 바뀔 때마다 실행할 함수 (미리보기 글씨 바꾸기)
  function updateText(val) {
    if (previewHours && previewYear) {
      previewHours.textContent = val;
      // 하루 시간 * 365일 / 24시간 = 1년에 며칠인지
      let days = Math.round((val * 365) / 24);
      previewYear.textContent = days;
    }
  }

  // 슬라이더를 움직이면 텍스트칸 숫자도 바뀌게
  if (slider && input) {
    slider.addEventListener('input', function () {
      input.value = slider.value;
      updateText(slider.value);
    });

    // 반대로 텍스트칸 숫자를 치면 슬라이더 막대기도 움직이게
    input.addEventListener('input', function () {
      let val = parseFloat(input.value);
      if (val >= 0 && val <= 24) {
        slider.value = val;
        updateText(val);
        errorMsg.textContent = ''; // 정상 입력하면 에러 지우기
      }
    });
  }

  // 폼 제출(결과 보기 버튼) 눌렀을 때
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // 새로고침 막기

      let finalVal = parseFloat(input.value);

      // 아무것도 안 썼거나 24시간 이상 적었을 때 컷
      if (isNaN(finalVal) || finalVal === '') {
        errorMsg.textContent = '아무것도 안 적으셨네요. 숫자를 입력해주세요!';
        return;
      }
      if (finalVal < 0 || finalVal > 24) {
        errorMsg.textContent = '하루는 24시간이에요! 다시 적어주세요.';
        return;
      }

      // 브라우저 임시 저장소(localStorage)에 내 스크린타임 킵해두기
      localStorage.setItem('screenTimeHours', finalVal);
      
      // 결과 페이지로 넘어가기 (원래 로딩창 가야하는데 그냥 바로 넘어갈게요)
      window.location.href = 'result.html';
    });
  }
}

window.onload = function () {
  initCalculator();
};