/**
 * detox.js - 디톡스란? 페이지 전용 자바스크립트
 * 제작: 김시영, 이민서
 */

// 1. 증상 목록 클릭했을 때 색깔 바뀌는 기능
function initSymptoms() {
  // ul 태그 찾기
  let list = document.querySelector('.symptom-list');
  if (!list) return;

  // 안에 있는 li들 전부 가져오기
  let items = list.querySelectorAll('li');

  for (let i = 0; i < items.length; i++) {
    let item = items[i];

    item.addEventListener('click', function () {
      // 일단 모든 li의 색깔 원래대로 초기화
      for (let j = 0; j < items.length; j++) {
        items[j].style.backgroundColor = '';
        items[j].style.borderColor = '#ddd'; // 원래 테두리색
      }

      // 방금 누른 것만 튀게 만들기
      item.style.backgroundColor = '#E8F5E9'; // 연초록 배경
      item.style.borderColor = '#2E8B57';     // 찐한 초록 테두리
    });
  }
}

// 2. 표(Table) 한 줄씩 클릭할 때 강조되는 기능
function initTable() {
  let rows = document.querySelectorAll('.detox-table tbody tr');
  
  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    
    row.addEventListener('click', function () {
      // 전부 배경색 원래대로 돌리기
      for (let j = 0; j < rows.length; j++) {
        rows[j].style.backgroundColor = '';
        rows[j].style.fontWeight = 'normal';
      }

      // 클릭한 줄만 연한 노란색으로 칠하기
      row.style.backgroundColor = '#FFFBEB';
      row.style.fontWeight = 'bold';
    });
  }
}

// 페이지 로딩 완료되면 실행
window.onload = function () {
  initSymptoms();
  initTable();
};