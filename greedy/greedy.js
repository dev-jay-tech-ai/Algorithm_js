// 1. 그리디_거스름돈
// 큰 단위의 화페부터 차례대로 확인하기

const solution = (n,arr) => {
  let answer = 0;
  for (let coin of arr) {
    answer += Math.floor(n/coin); // 해당 화페로 거슬러 줄 수 있는 동전의 개수 세기
    n %= coin;
  }
  return answer;
}
const coins = [500,100,50,10];
console.log(solution(1260,coins));
// 화페의 종류가 K라고 할때 시간 복잡도는 O(K) 
// 거슬러줘야하는 금액과는 무관하며, 동전의 총 종류에만 영향

// 2. 그리디_큰수의 법칙

const solution = (arr,m,k) => {
  let answer = 0;
  arr.sort((a,b) => { return a-b });

  let count = m/(k+1)*k;
  count += m % (k+1);
  console.log(count);
  answer += count*arr[arr.length-1];
  answer += (m-count)*arr[arr.length-2];
  return answer;
};

const arr = [2,4,5,4,6];
console.log(solution(arr,8,3));

// 3. 그리디_숫자카드게임
const solution = (arr) => {
  let answer = 0;
  for(let i=0; i<arr.length; i++) {
    let min = Math.min(...arr[i]);
    answer = Math.max(answer,min)
  }

  return answer;
};

// const arr = [
//   [3,1,2],
//   [4,1,4],
//   [2,2,2]
// ];
const arr = [[7,3,1,8],[3,3,3,4]]
console.log(solution(arr));

// 4. 그리디_1이될때까지

const solution = (n,k) => {
  let answer = 0;
  // 바로 나누어 떨어지는 경우와 그렇지 않은 경우
  while(n>=k) {
    while(n%k!==0) {
      n -= 1;
      answer++;
    }
    n = n/k;
  }
  while(n>1) {
    n -= 1;
    answer++;
  }
  return answer;
};

console.log(solution(17,4));

const solution = (n,k) => {
  let answer = 0;
  // 바로 나누어 떨어지는 경우와 그렇지 않은 경우
  while(true) {
    // n이 k로 바로 나뉘지않을 경우
    // 가장 가까운 수
    let target = Math.floor(n/k)*k;
    answer += n-target;
    n = target;
    if (n<k) break; // 반복문빠져나감
    answer += 1;
    n /= k // k 나눈 수를 더해준다.
  }
  answer += n-1; // 남아있는 수를 뺸다.
  return answer;
};

console.log(solution(9,3));

// 5. 그리디_모험가 길드

const solution = (arr) => {
  let answer = 0;
  let group = 0;
  arr.sort((a,b) => { return a-b });

  console.log(arr)
  for (let x of arr) { // 공포도가 낮은것 부터 하나씩 확인
    answer++; // 현재 그룹에 해당 되는 모험가 포함
    if(answer >= x) {
      group += 1;
      answer = 0;
    }
  }

  return answer;
};

const arr = [2,3,1,2,2];
console.log(solution(arr));

// 6. 그리디_곱하기 혹은 더하기

const solution = (str) => {
  let answer = 0;
  for(let i=0; i<str.length; i++) {
    if(answer>1) answer *= parseInt(str[i]);
    else answer = answer += parseInt(str[i]);
  }
  return answer;
};

const str = '02984';
console.log(solution(str));

// 7. 그리디_문자열 뒤집기

const solution = (s) => {
  let answer = 0;
  let cnt0 = 0;
  let cnt1 = 0;
  
  if(s[0] === '1') cnt1++;
  else cnt0++;
  for (let i=0; i<s.length-1; i++) {
    if(s[i] !== s[i+1]) {
      if(s[i+1] === '1') cnt0++; // 0으로 뒤집어라
      else cnt1++; // 1로 뒤집어라
    }
  }
  answer = Math.min(cnt0,cnt1);
  return answer;
};

const str = '0001100';
console.log(solution(str));

// 8. 그리디_만들수 없는 금액

const solution = (arr) => {
  let answer = 1;
  arr.sort((a,b) => { return a-b });

 for (let x of arr) {
   if(answer<x) break;
   answer += x;
 }

  return answer;
};

const arr = [3,2,1,1,9];
console.log(solution(arr));

// 9. 그리디_볼링공 고르기

const solution = (arr,m) => {
  let answer = 0;
  let n = arr.length;
  let weightArr = Array(11).fill(0);
  // 각무게에 해당하는 볼링공의 개수 카운트
  for (let x of arr) weightArr[x]++;
  console.log(weightArr)
  // 1부터 m까지의 각 무게에 대하여 처리
  // A가 선택하면 B가 선택할 수있는 경우의 수는 줄어듬
  // arr[i] 는 A가 고르는 공의 개수를 의미
  for(let i=1; i<=m; i++) {
      n -= weightArr[i]; // 무게가 i인 볼링공의 개수 제외
      answer += weightArr[i] * n;
  }
  return answer;
};

const arr = [1,3,2,3,2]; // n=5, m=3
console.log(solution(arr,3));

// 10. 그리디_무지의 먹방 라이브

const solution = (arr, stopT) => {
  let answer = 0;
  let sortedFoodTimes = [];
  let n = arr.length; // 남은 음식의 개수
  let total = 0;
  let sumT = 0; // 먹기위해 사용한 시간
  let prevT = 0; // 직전에 다 먹은 시간

  // 배열의 모든 요소가 0이 될 때까지
  // 배열에서 가장 큰 수의 인덱스 값은
  sortedFoodTimes = arr
    .map((time, idx) => {
      total += time;
      return { ori_index: idx+1, time };
    })
    .sort((a, b) => {
      return a.time - b.time;
    });
  // 네트워크 장애가 걸리기 전에 다 먹을 수 있으면
  if (total <= stopT) return -1;
  // sumT + (현재의 음식시간 - 이전 음식시간) * 현재 음식 개수와 stopT비교
  while (sumT + (sortedFoodTimes[0].time - prevT) * n <= stopT) {
    let now = sortedFoodTimes.shift();
    console.log(now)
    sumT += (now.time - prevT) * n;
    n -= 1; // 다 먹은 음식 제외
    prevT = now.time; // 이전 음식 시간 재설절
  }
  // 남은 음식 중에서 몇번째인지 출력
  sortedFoodTimes.sort((a,b) => a.ori_index - b.ori_index );
  console.log(sortedFoodTimes)
  answer = sortedFoodTimes[(stopT-sumT)% n].ori_index; // 몇번 음식부터 다시 섭취하면 되나
  return answer;
};

const arr = [3, 1, 2]; // 음식 모두 먹는 데 필요한 시간
console.log(solution(arr, 5));
