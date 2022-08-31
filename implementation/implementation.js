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

const solution = (board, arr, char) => {
  let answer = 1;
  let changes = 0;
  // 현재 방향을 기준으로 왼쪽이동
  const turn = (d) => {
    if(d === 0) return 3;
    else return d-1;
  }

  const mv = (x,y,dir) => {
    if(dir === 0) return [x, y-1];
    else if(dir === 1) return [x+1, y];
    else if(dir === 2) return [x, y+1];
    else return [x-1, y];
  }

  const back = (x,y,dir) => {
    if(dir === 0) return [x-1, y];
    else if(dir === 1) return [x, y-1];
    else if(dir === 2) return [x+1, y];
    else return [x, y-1];
  }
  // 0 육지 1 바다
  const game = (x,y,dir) => {
    let position = [x,y,dir]; 
    arr[x][y]= 1; // 현재 좌표 방문 처리
    position[2] = turn(dir); // 일단 한번 회전
    const next = mv(x,y,dir); // 이동 좌표 get
    const nx = next[0];
    const ny = next[1];

    if(nx>=0&&nx<board[1]&&ny>=0&&ny<board[1]&&arr[nx][ny]===0) {
      // 왼쪽으로 갈 수 있는 경우
      answer++;
      changes = 0;
      game(nx,ny,dir); // 전진
    } else {
      // 왼쪽으로 갈 수 없는 경우
         // 1.왼쪽에 가보지 않은 칸이 없는 경우
      if(changes<4) {
        changes++;
        position[2] = turn(dir); // 회전한다.
        game(...position);
      } else { // 2.네방향 모두 가본 칸이거나 바다로 되어 있는 경우
        // 3번 회전한 경우 = 갈곳이 없다.
        const move = back(...position);
        const mx = move[0];
        const my = move[1];
        if(mx>=0&&mx<board[1]&&my>=0&&my<board[1]&&arr[mx][my]===0) {
          answer++;
          changes = 0;
          game(mx,my,dir); // 전진
        } else {
          return;
        }
      }
      
    }
  } 

  game(...char);
  return answer; //이동을 마친 후 캐릭터가 방문한 칸의 수 출력
};

const board = [4, 4];
const char = [1, 1, 0];
const arr = [
  [1, 1, 1, 1],
  [1, 0, 0, 1],
  [1, 1, 0, 1],
  [1, 1, 1, 1]
];
console.log(solution(board, arr, char));

// 1.구현_럭키스트레이트

const solution = (score) => {
  let answer = 'READY';
  let total = String(score).split('').reduce((a,acc) => parseInt(a)+parseInt(acc));
  let divide = parseInt(String(score).length/2);
  let sum = String(score).slice(0,divide).split('').reduce((a,acc) => parseInt(a)+parseInt(acc));
  if(total/2 === sum) answer = 'LUCKY';
  return answer; //이동을 마친 후 캐릭터가 방문한 칸의 수 출력
};

const score = 7755;
console.log(solution(score));

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

const solution = (key,lock) => {
  let answer = false;
  // 2차원 리스트 90도 회전(3번회전)
  // 배열을 회전하는 함수
  const rotateR = (arr) => {
    let n = arr.length;
    let m = arr[0].length;
    const result = Array.from({ length: n },() => Array(m).fill(0));
    for (let i=0; i<n; i++) { // 0-3
      for(let j=0; j<m; j++) {
        result[j][n-i-1] = arr[i][j]
      }
    }
    return result;
  }
  const check = (graph,lockLen) => {
    for(let i=lockLen; i<lockLen*2; i++) {
      for(let j=lockLen; j<lockLen*2; j++) {
        if(graph[i][j] !== 1) return false;
      }
    }
    return true;
  }
  const attach = (x, y, length, key, graph) => {
    for (let i=0; i<length; i++) {
      for (let j=0; j<length; j++) {
        graph[x+i][y+j] += key[i][j];
      }
    }
  }
  const detach = (x, y, length, key, graph) => {
    for (let i=0; i<length; i++) {
      for (let j=0; j<length; j++) {
        graph[x+i][y+j] -= key[i][j];
      }
    }
  } 

  // 좌물쇠 크기를 기존의 3배로 전환
  const keyLen = key.length;
  const lockLen = lock.length;
  const len = lockLen * 3;
  const graph = Array.from({ length: len },() => Array(len).fill(0)); 
  // 정중앙에 좌물쇠 배열 값 삽입
  for (let i=0; i<lockLen; i++) {
    for (let j =0; j<lockLen; j++) {
      graph[i+lockLen][j+lockLen] = lock[i][j];
    } 
  }
  // 4가지 방향에 대해서 확인
  for (let i=0; i<4; i++) {
    key = rotateR(key); // 열쇠회전 0-3
    for (let x=0; x<lockLen*2; x++) {
      for (let y=0; y<lockLen*2; y++) {
       // 좌물쇠에 열쇠를 끼워 넣기
       attach(x, y, keyLen, key, graph);
       if(check(graph,lockLen)) return answer = true;
       // 좌물쇠에 열쇠 빼기
       detach(x,y,keyLen,key,graph);
      }
    }
    // 좌물쇠의 영역이 모두 1인지 확인(하라도 2나 0이 아니다.)
  }
  return answer; // 열쇠로 자물쇠를 열 수 있으면 true
};

let key = [[0, 0, 0], [1, 0, 0], [0, 1, 1]];
let lock = [[1, 1, 1], [1, 1, 0], [1, 0, 1]];	
console.log(solution(key,lock));

// 1.구현_뱀

const solution = (n,appleL,dir) => {
  let answer = 0;
  // 6*6
  let snakeLen = 1; // 뱀의 길이
  let x = 2;
  let y = 2;
  // 매초마다 이동 시작

  const game = (x,y) => {
    // 뱀의 이동 경로
    let nx = x;
    let ny = y;

    // 게임이 끝나는 조건식 입력_ 1.벽 2.자기자신
    if(nx>=2&&nx<=n&&ny>=2&&ny<=n) {
      // 뱀은 처음에 오른쪽을 향한다 
      // 가야 할 곳에 사과가 있는지 확인
      for(let j=0; j<appleL.length; j++) {
        if(nx !== appleL[j][0] && ny !== appleL[j][1]) snakeLen++;
      }
      // 현재 시간 다음 방향에 회전이 있는지 확인
      for(let i = 0; i<dir.length; i++) {
        if(answer+1 === dir[i][0]) {
          if(dir[i][1] === 'L') {
            nx += 1;
            ny -= 1;
          } else { // 'D'
            nx += 1;
            ny += 1;
          };
        } else {
          ny = y+1;
        }
      }

      answer++;
      console.log(answer+'초',nx,ny)
      game(nx,ny);
    } else {
      return;
    }
  }

  game(x,y);
  
  // 벽또는 자기자신과 부딪히면 끝
  return answer; // 게임이 몇초안에 끝나는 가 9
};

const appleL = [[3,4],[2,5],[5,3]];
const dir = [[3,'D'],[15,'L'],[17,'D']];
console.log(solution(6,appleL,dir));

/** 완전한 코드 */

const solution = (n,appleL,dir) => {
  let answer = 0; // 시작한 뒤에 지난 초 시간
  const dx = [0,1,0,-1]; // 동북서남
  const dy = [1,0,-1,0];

  const turn_left = (direction, stan) => {
    if(stan === 'L') direction =  (direction-1)%4;
    else direction = (direction+1)%4;
    return direction;
  }

  const graph = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));
  // 뱀의 머리 위치
  let x = 1;
  let y = 1;
  let direction = 0; // 처음에는 동쪽으로 보고 있다.
  graph[x][y] = 2; // 뱀의 위치 정보
  let track = [[x,y]]; // 뱀이 차지하고 있는 위치 정보
  // 사과 있는 곳으 1로 표시
  for(let j=0; j<appleL.length; j++) {
    graph[appleL[j][0]][appleL[j][1]] = 1; 
  }
  let turn_idx = 0;

  // 매초마다 이동 시작
  const game = (x,y) => {
    // 뱀의 이동 경로
    let nx = x + dx[direction];
    let ny = y + dy[direction];
    console.log(graph)
    // 게임이 끝나는 조건식 입력_ 1.벽 2.자기자신(2)
    if(nx>=1&&nx<=n&&ny>=1&&ny<=n&&graph[nx][ny]<2) {
      // 뱀은 처음에 오른쪽을 향한다 
      // 가야 할 곳에 사과가 있는지 확인
      if(graph[nx][ny] === 0) { // 사과가 없다면 이동 후에 꼬리 제거
        graph[nx][ny] = 2; // 뱀이동
        track.push([nx,ny]); // 머리 이동, 이동 위치에 추가
        let [prex,prey] = track.shift();
        console.log(prex,prey)
        graph[prex][prey] = 0; // 꼬리가 위치 한 칸 비우기
      } 
      if(graph[nx][ny] === 1) { // 사과가 있다면
        graph[nx][ny] = 2; // 뱀이동
        track.push([nx,ny]); // 머리 이동, 이동 위치에 추가
      }
      answer++;

      // 회전할 시간인 경우 회전
      if(turn_idx < dir.length && answer === dir[turn_idx][0]) {
        direction = turn_left(direction, dir[turn_idx][1])
        turn_idx++;
      }

      game(nx,ny); // 다음 위치로 머리를 이동
    } else {
      answer++; // 이동했으니 시간은 카운트
      return;
    }
  }

  game(x,y);
  
  // 벽또는 자기자신과 부딪히면 끝
  return answer; // 게임이 몇초안에 끝나는 가 9
};

const appleL = [[3,4],[2,5],[5,3]];
const dir = [[3,'D'],[15,'L'],[17,'D']];
console.log(solution(6,appleL,dir));

/**
const appleL = [[3,4],[2,5],[5,3]];
const dir = [[3,'D'],[15,'L'],[17,'D']];
console.log(solution(6,appleL,dir));

const appleL = [[1,2],[1,3],[1,4],[1,5]];
const dir = [[8,'D'],[10,'D'],[11,'D'],[13,'L']];
console.log(solution(10,appleL,dir));

const appleL = [[1,5],[1,3],[1,2],[1,6],[1,7]];
const dir = [[8,'D'],[10,'D'],[11,'D'],[13,'L']];
console.log(solution(10,appleL,dir));
*/

// 1.구현_기둥과 보 설치

// 1.구현_치킨 배달

// 1.구현_외벽 점검

const solution = (n, weak, dist) => {
  let answer = Number.MAX_SAFE_INTEGER;
  let length = dist.length;
  const len = weak.length;
  // 순차 접근 배열의 크기는 기존 weak 배열의 길이*2 - 1과 같다.
  const flatten = new Array(len * 2 - 1).fill(0);
  // linear_weak 배열의 크기만큼 반복문을 돌면서
  // 각 시작지점의 도착점을 계산하여 추가
  for (let i = 0; i < len * 2 - 1; i++)
    flatten[i] = i < len ? weak[i] : weak[i - len] + n;
  // console.log(flatten)
  let list = [];
  let visited = Array(length + 1).fill(0);
  let result = Array(length).fill(0);
  dist.sort((a, b) => {
    return b - a;
  });
  const permutation = (L) => {
    if (L === length) {
      list.push(result.slice());
    } else {
      for (let i = 0; i < length; i++) {
        if (visited[i] === 0) {
          visited[i] = 1;
          result[L] = dist[i];
          permutation(L + 1);
          visited[i] = 0;
        }
      }
    }
  };
  permutation(0);

  for (let start = 0; start < len; start++) {
    for (const mates of list) {
      let cnt = 1; // 친구 사용 개수, 처음에 한명 사용
      let position = start;
      // 그 위치가 취약지점 중 어디까지 처리 할 수 있는 지 탐색
      // len 길이는 4
      for (let k = 1; k < len; k++) {
        let nextPosition = start + k;
        let diff = flatten[nextPosition] - flatten[position];
        if (diff > mates[cnt - 1]) {
          position = nextPosition;
          cnt++;
          if (cnt > length) break;
        }
      }
      // 다 탐색했을 때의 cnt를 최소값으로 업데이트
      answer = Math.min(answer, cnt);
    }
  }
  // 사용된 친구가 사용할 수 있는 친구 보다 많으면,
  if (answer > len) answer = -1;
  return answer;
};
/**
let weak = [1, 5, 6, 10];
let dist = [1, 2, 3, 4];
console.log(solution(12, weak, dist));
*/
let weak = [1, 3, 4, 9, 10];
let dist = [3, 5, 7];
console.log(solution(12, weak, dist)); 