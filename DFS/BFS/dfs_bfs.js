// 3.DFS/BFS_음료수 얼려 먹기

const solution = (n,m,arr) => {
  let answer = 0;
  let queue = [];
  // 구멍이 뚫려 있는 부분은 0, 칸막이가 존재하는 부분은 1
  let dx = [0,1,0,-1];
  let dy = [1,0,-1,0];

  for(let i=0; i<n; i++) {
    for(let j=0; j<m; j++) {
      if(arr[i][j] === 0) {
        answer++;
        arr[i][j] = 1;
        queue.push([i,j])
        while(queue.length) {
          let tmp = queue.shift();
          for(let k=0; k<4; k++) {
            let nx = tmp[0] + dx[k];
            let ny = tmp[1] + dy[k];
            if(nx>=0&&nx<n&&ny>=0&&ny<m&&arr[nx][ny]===0) {
              arr[nx][ny]= 1;
              queue.push([nx,ny]);
            }
          }
        }
      }  
    }
  }
  return answer;
};

const arr = [
  [0,0,1,1,0],
  [0,0,0,1,1],
  [1,1,1,1,1],
  [0,0,0,0,0]
]
console.log(solution(4,5,arr));

// 3.DFS/BFS_미로 탈출

const solution = (n,m,arr) => {
  let answer = 0;
  let dx = [-1,1,0,0];
  let dy = [0,0,-1,1];
  let queue = [];

  queue.push([0,0]);
  while(queue.length) {
    let [x,y] = queue.shift();
    for(let i=0; i<4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];
      // 도착지에 도착하면 멈춤
      if(nx>=0&&nx<n&&ny>=0&&ny<m&&arr[nx][ny]===1) {      
        arr[nx][ny] = arr[x][y] + 1;
        queue.push([nx,ny]);
      }
    }  
  }
  answer = arr[n-1][m-1];
  return answer;
};

const arr = [
  [1,0,1,0,1,0],
  [1,0,1,1,1,1],
  [1,0,1,1,1,0],
  [1,1,1,1,1,1],
  [1,1,1,1,1,1]
]
console.log(solution(5,6,arr));

// 3.DFS/BFS_특정 거리의 도시 찾기

const solution = (n,m,k,x,arr) => {
  let answer = [];
  // 도시의 개수 N, 도로의 개수 M
  // 거리 정보 K, 출발 도시의 번호 X
  let queue = [];
  let graph = Array.from({ length:n+1 },() => Array() );
  let dist = Array(n+1).fill(0);

  for(let [a,b] of arr) {
    graph[a].push(b);
  }
  queue.push(x);
  while(queue.length) {
    let tmp = queue.shift(); // 1
    for(let next_node of graph[tmp]) {
      if(dist[next_node] === 0) { // 2 
        dist[next_node] = dist[tmp] + 1;
        queue.push(next_node);
      }
    }
  }
  
  dist.forEach((d,idx) => {
    if(d === k) answer.push(idx);
  }) 
  
  /**
    X로부터 출발하여 도달할 수 있는 도시 중에서, 
    최단 거리가 K인 모든 도시의 번호를 
    한 줄에 하나씩 오름차순으로 출력한다.
    하나도 존재하지 않으면 -1을 출력한다
   */
  return answer.length === 0 ? -1: answer; // 4
};

const arr = [
  [1,2],
  [1,3],
  [2,3],
  [2,4]
]
console.log(solution(4,4,1,1,arr));

// 3.DFS/BFS_연구소

const solution = (n, m, data) => {
  let answer = 0;
  // 벽을 설치한 뒤의 리스트
  let tmp = Array.from({ length: n },() => Array(m).fill());
  // 4가지 이동 방향에 대한 리스트
  let dx = [-1,0,1,0];
  let dy = [0,1,0,-1];  

  const virus = (x,y) => {
    for(let i=0; i<4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];
      if(nx>=0&&nx<n&&ny>=0&&ny<m&&tmp[nx][ny] === 0) {
        tmp[nx][ny] = 2; // 바이러스 퍼짐
        virus(nx,ny);
      }
    }

  }

  const get_score = () => {
    let score = 0;
    for(let i=0; i<n; i++) {
      for(let j=0; j<m; j++) {
        if(tmp[i][j] === 0) score++;
      }
    }
    return score;
  }
   // 3개의 벽세우기 _ 모든 경우의 수
  // 울타리를 설치하면서, 매 번 안전 영역의 크기 계산
  const DFS = (cnt) => {
    if(cnt===3) {
      for(let i=0; i<n; i++) {
        for(let j=0; j<m; j++) {
          tmp[i][j] = data[i][j];
        }
      }
      // 각 바이러스의 위치에서 전파진행
      for(let i=0; i<n; i++) {
        for(let j=0; j<m; j++) {
          if(tmp[i][j] === 2) virus(i,j);
        }
      }
      // 안전영역의 최대값 계산
      answer = Math.max(answer, get_score());
      return;
    }
    // 빈공간에 울타리를 설치
    for(let i=0; i<n; i++) {
      for(let j=0; j<m; j++) {
        if(data[i][j] === 0) {
          data[i][j] = 1;
          cnt++;
          DFS(cnt);
          data[i][j] = 0;
          cnt--;
        }
      }
    }
  }

  DFS(0)
  // 바이러스 퍼트리기
  // 안전영역 카운팅
  return answer; // 얻을 수 있는 안전 영역의 최대 크기를 출력
};

const arr = [
  [2, 0, 0, 0, 1, 1, 0],
  [0, 0, 1, 0, 1, 2, 0],
  [0, 1, 1, 0, 1, 0, 0],
  [0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1],
  [0, 1, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0]
];
console.log(solution(7, 7, arr));

// 3.DFS/BFS_경쟁적 전염
// DFS _ 내가 푼 문제 단, 매 초마다 번호가 낮은 종류의 바이러스부터 먼저 증식한다. _ 해결안됨(DFS한계)
const solution = (s,tx,ty,arr) => {
  let answer = 0;
  let dx = [1,-1,0,0];
  let dy = [0,0,-1,1];
  let tmp = Array.from({ length: 3 },() => Array(3).fill(0));
  const DFS = (x,y,sort,t) => {
    if(t === s) {
      answer = tmp[tx-1][ty-1];
      return;
    } else {
      for(let i=0; i<4; i++) {
        let nx = x + dx[i];
        let ny = y + dy[i];
        if(nx>=0&&nx<3&&ny>=0&&ny<3&&arr[nx][ny] === 0) {
          tmp[nx][ny] = sort;
          DFS(nx,ny,sort,t+1);
        }
      }
    }
  }
  for(let i=0; i<3; i++) {
    for(let j=0; j<3; j++) {
      if(arr[i][j] > 0) {
        DFS(i,j,arr[i][j],0);
      }
    } 
  }

  return answer;
};
// 2초뒤에 3,2에 존재하는 바이러스 종류 출력
const arr = [
  [1,0,2],
  [0,0,0],
  [3,0,0]
];
console.log(solution(1,2,2, arr));
// BFS
const solution = (target_s,target_x,target_y,arr) => {
  let answer = 0;
  let data = []; // 바이러스에 대한 정보를 담는 리스트

  for(let i=0; i<3; i++) {
    for(let j=0; j<3; j++) {
      // 해당 위치에 바이러스가 존재하는 경우
      if(arr[i][j] > 0) {
        // 바이러스 종류,시간,위치x,위치y 삽입
        data.push([arr[i][j],0,i,j]);
      }
    }
  }
  data.sort((a,b) => a[0]-b[0]);
  let queue = data;
  let dx = [-1, 0, 1, 0];
  let dy = [0, 1, 0, -1];
  // BFS 진행
  while(queue.length) {
    let [virus, s, x, y] = queue.shift();
    if(s === target_s) break;
    for(let i=0; i<4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];
      if(0<=nx&&nx<3&&0<=ny&&ny<3&&arr[nx][ny] === 0) {
          arr[nx][ny] = virus;
          queue.push([virus, s+1, nx, ny]);
      }
    }
  }
  answer = arr[target_x-1][target_y-1];
  return answer;
};

const arr = [
[1,0,2],
[0,0,0],
[3,0,0]
];
console.log(solution(2,3,2, arr));

// 3.DFS/BFS_괄호 변환

const solution = (str) => {
  let answer = '';

  const isBalenced = (s) => {
    let left = 0;
    let right = 0;
    let str = [...s];
    let result = false;
    for(let i=0; i<str.length; i++) {
      if(str[i] === '(') left++;
      else right++;
      if(left>0&&right>0&&left===right) {
        result = i;
        break;
      };
    }
    return result; 
  }
  const isCorrect = (s) => {
    let str = [...s];
    let stack = [];
    stack.push(str[0]);
    for(let i=1; i<str.length; i++) {
      if(str[i] === '(') stack.push(str[i]);
      else stack.pop();
    }
    if(stack.length) return false;
    else return true;
  }
  // console.log('균형?',isBalenced(str));
  // console.log('올바름?',isCorrect(str));

  const recursion = (str) => {
    if(!str.length) return answer; // 빈 문자열인 경우 빈 문자열 반환
    let num = isBalenced(str)+1;
    let u = str.slice(0,num);
    let v = str.slice(num,str.length);
    console.log(u,v)
    if(isCorrect(u)) { 
      return u + recursion(v);
    } else { // u가 올바른 괄호 문자열이 아니라면
      let uArr = [...u];
      uArr.shift();
      uArr.pop();
      let uOrg = '';
      uArr.forEach((u) => {
        if(u === '(') uOrg += ')';
        else uOrg += '(';
      });
      return '(' + recursion(v) + ')' + uOrg;
    }
  }
  return answer = recursion(str);
};

// let str = '(())()'
// let str = '(()))(';
// let str = '()))((()';
let str = ')(';
// let str = "(()())()";
console.log(solution(str));

// 3.DFS/BFS_연산자 끼워 넣기

const solution = (num,arr) => {
  let answer = [];
  let result = [];
  let sign = [0,1,2,3];
  let max = Number.MIN_SAFE_INTEGER;
  let min = Number.MAX_SAFE_INTEGER;

  for(let i=0; i<sign.length; i++) {
    for(let j=0; j<arr[i]; j++) {
      result.push(sign[i]);
    }
  }
  let visited = Array(result.length).fill(0);
  let tmp = Array(result.length).fill(0);
  
  const cal = (array) => {
    let target = num[0];
    for(let i=1; i<num.length; i++) {
      if(array[i-1] === 0) target = parseInt(target+num[i])
      else if(array[i-1] === 1) target = parseInt(target-num[i])
      else if(array[i-1] === 2) target = parseInt(target*num[i])
      else target = parseInt(target/num[i])
    }
    return target;
  }
  const DFS = (L) => {
    if(L === result.length) {
      let val = cal(tmp.slice());
      max = Math.max(val,max);
      min = Math.min(val,min);
      return;
    } else {
      for(let i=0; i<result.length; i++) {
        if(visited[i] === 0) {
          visited[i] = 1;
          tmp[L] = result[i];
          DFS(L+1)
          visited[i] = 0;
        }
      }
    }
  }
  DFS(0);
  answer.push(max,min);
  return answer;
};
/*
const num = [1,2,3,4,5,6];
const arr = [2,1,1,1];
/*
const num = [3,4,5];
const arr = [1,0,1,0];
*/

const num = [5,6];
const arr = [0,0,1,0];

console.log(solution(num,arr));

// 3.DFS/BFS_감시 피하기 

// 3.DFS/BFS_인구 이동

// 3.DFS/BFS_블록 이동하기


