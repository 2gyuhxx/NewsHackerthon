# NewsHackerthon
뉴스 데이터를 활용한 사고력 향상 서비스

## 📌 프로젝트 소개
이 프로젝트는 뉴스 데이터를 기반으로 사용자 사고력 향상을 돕는 서비스입니다.  
React Native, Node.js, Firebase를 기반으로 개발되며, 공공 데이터 API와 OpenAI API를 활용합니다.

## 🚀 설치
```bash
# 저장소 클론
git clone https://github.com/2gyuhxx/NewsHackerthon.git
cd NewsHackerthon

# 패키지 설치
npm install
```

## ▶ 실행
```bash
# Expo 개발 서버 실행
npx expo start
```

## 🌿 브랜치 전략
| 브랜치 | 용도 |
|---|---|
| master | 배포 가능한 안정 버전 |
| frontend | 프론트엔드(UI, 앱) 작업 |
| backend | 백엔드(API, DB) 작업 |
| feature/기능명 | 기능 단위 작업 |
| fix/버그명 | 버그 수정 작업 |

## 💻 브랜치 전환/생성
```bash
# 프론트엔드 작업으로 전환
git checkout frontend

# 백엔드 작업으로 전환
git checkout backend

# (필요 시) 새 기능 브랜치 생성 후 이동
git checkout -b feature/기능명
```

## 🔄 최신 코드 가져오기 (Pull)
작업 시작 전 반드시 최신화하세요.
```bash
# frontend 최신화
git checkout frontend
git pull origin frontend

# backend 최신화
git checkout backend
git pull origin backend

# master 최신화
git checkout master
git pull origin master
```

## ⬆️ 커밋 & 푸시
```bash
# 변경사항 스테이징 & 커밋
git add .
git commit -m "작업 내용"

# 최초 푸시 시 upstream 설정(-u)
git push -u origin 현재브랜치명
# 이후엔 git push 만으로 푸시 가능
```

## 🛠 권장 워크플로우
1) `git checkout 작업브랜치` → `git pull origin 작업브랜치`  
2) 작업 → `git add .` → `git commit -m "메시지"`  
3) `git push`  
4) GitHub에서 PR 생성 → 리뷰 후 `master`에 머지

> ⚠️ 로컬 변경이 있을 때 `git pull` 하기 전엔 반드시 커밋하세요. 미커밋 상태로 pull 하면 충돌이 날 수 있습니다.
