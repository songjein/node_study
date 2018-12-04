# Expresss basic
여러 예제 소스 실습 (package.json 기본 포함)


## package.json & npm install
- scripts
	- 'npm run 스크립트명령어' 에 의해 실행되는 부분
	- 명령어를 명시해둘 수 
- devDependencies
	- npm install 개발용 패키지 설치시 --save-dev 옵션 명시
- npm install 명령어 줄임말
	- install -> i
	- --save-dev -> -D
	- --global -> -g

## package-lock.json
- node_modules에 들어있는 패키지들의 정보담김
- npm으로 패키지 관련 명령 수행할 때마다 의존 관계 저장

## package version 
- SemVer 방식의 버전 넘버링
- Semantic Versioning
- 첫자리 major
	- 하위 호환이 안 될 정도의 내용 수정
- 둘째자리 minor
	- 하위 호환이 되는 기능 업데이트
- 셋째자리
	- 기능 추가가 아닌 버그 수정

- ^, ~, <, > 기호의 의미
	- ^ 기호는 minor 버전까지만 설치 또는 업뎃
		- npm i express@^1.1.1 일 때, 1.1.1 <= 버전 < 2.0.0 까지 설치됨
		- 1.x.x 와 같은 표현
	- ~ 기호는 patch 버전까지만 설치 또는 업뎃
		- npm i express@~1.1.1 이라면 1.1.1 <= 버전 < 1.2.0 까지만 설치
	- >, <, <=, >=는 의미 그대로 
		- npm i express@>1.1.1 이면 얘보다 높은 버전 설치하라는 뜻
- 그 외 @latest 혹은 @x 명시시 최신 버전 설치
