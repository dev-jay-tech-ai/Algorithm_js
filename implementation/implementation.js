// 1.구현_상하좌우

const solution = (n,plan) => {
  let answer;
  const direction = { U: [-1,0], R: [0,1], D: [1,0], L: [0,-1] };

  let start = [1,1];

  for (let p of plan) {
    let nx = start[0] + direction[p][0];
    let ny = start[1] + direction[p][1];
    if(nx>0&&nx<=n&&ny>0&&ny<=n) {
      start = [nx,ny];
    }
  }

  return answer = start;
};

const plan = ['R','R','R','U','D','D']; // 음식 모두 먹는 데 필요한 시간
console.log(solution(5,plan));

// 1.구현_시각

const solution = (n) => {
  let answer = 0;

  for (let i = 0; i < n + 1; i++) {
    for (let j = 0; j < 60; j++) {
      for (let k = 0; k < 60; k++) {
        const str = String(i)+String(j)+String(k);
        if (str.includes('3')) answer++;
      }
    }
  }

  return answer; // 11475
};

console.log(solution(5));

// 1.구현_왕실의 나이트

const solution = (n,position) => {
  let answer = [];
  const order = "abcdefgh";
  // 8가지 방향에 대한 방향 벡터를 정의할 것 
  // 수평으로 2칸이동 수직으로 한칸이동
  // 수직으로 2칸이동 수평으로 한칸이동
  const direction = [[2, 1],[2, -1],[1, 2],[1, -2],[-2,-1],[-2,1],[-1,-2],[-1,2]];

  const location = [order.indexOf(position.split('')[0]), position.split('')[1] - 1];
  console.log(location)
  for(let d of direction) {
    const nx = location[0] + d[0];
    const ny = location[1] + d[1];
    if(nx>=0&&nx<n&&ny>=0&&ny<n) {
      answer.push([nx,ny]);
    }
  }
  // 1-8
  // a-h
  console.log(answer)
  return answer.length; // 11475
};

console.log(solution(8,'a1'));

// 1.구현_게임개발

// 1.구현_럭키스트레이트

// 1.구현_문자열 재정렬

const solution = (str) => {
  let answer = '';
  let sum = 0;
  Array.from(str).forEach((s) => {
    if(isNaN(s)) answer+=s;
    else sum += parseInt(s);
  })
  answer = answer.split('').sort().join('') + (sum>0?String(sum):'');
  return answer;
};

const str = 'K1KA5CB7';
console.log(solution(str));

// 1.구현_문자열 압축
// 1.구현_자물쇠와 열쇠
// 1.구현_뱀
// 1.구현_기둥과 보 설치
// 1.구현_치킨 배달
// 1.구현_외벽 점검
