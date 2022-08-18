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