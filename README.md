# Nflix Clone Coding - Nockflix

## 목차

- [최종 구현 상세](#최종-구현-상세)
- [설치 및 실행](#설치-및-실행)
- [요구 사항 명세](#요구-사항-명세)
- [사용 스택](#사용-스택)
- [디렉토리 구조](#디렉토리-구조)
- [주안점](#주안점)
- [한계 및 개선 사항](#한계-및-개선-사항)
- [참고 문서](#참고-문서)

## 최종 구현 상세

- [맨 위로](#목차)

Link: <https://real-bird.github.io/nockflix/>

[nockflix.webm](https://user-images.githubusercontent.com/83404864/185932430-cd57ea6e-f559-43cf-a295-001baad09774.webm)


## 설치 및 실행

- [맨 위로](#목차)

```bash
$ git clone https://github.com/Real-Bird/nockflix.git
$ cd nockflix
$ npm install
$ npm start
```

## 요구 사항 명세

- [맨 위로](#목차)

- `Home` 슬라이드 추가
  - [x] **최신 영화**
  - [x] **영화 순위**
  - [x] **개봉 예정 영화**
- `Tv` 슬라이드 추가
  - [x] **최신 TV 프로그램**
  - [x] **오늘의 TV 프로그램**
  - [x] **TV 프로그램 순위**
- `Search` 슬라이드 추가
  - [x] **영화 결과**
  - [x] **TV 프로그램 결과**
- [x] `/movie/:id` 꾸미기
- [x] `/tv/:id` 꾸미기

## 사용 스택

- [맨 위로](#목차)

- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white) : 베이스 언어
- ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white) : 베이스 프레임워크
- ![React Router](https://img.shields.io/badge/React%20Router-CA4245?style=flat&logo=React%20Router&logoColor=white) : 경로 설정 라이브러리
- ![@tanstack/React Query](https://img.shields.io/badge/React%20Query-FF4154?style=flat&logo=React%20Query&logoColor=white) : API 데이터를 `state`에 담기 위한 라이브러리
- ![Styled Components](https://img.shields.io/badge/Styled%20Components-DB7093?style=flat&logo=styled-components&logoColor=white) : 스타일링 라이브러리
- ![Framer](https://img.shields.io/badge/Framer-0055FF?style=flat&logo=Framer&logoColor=white) : 애니메이션 효과 라이브러리
- ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-EC5990?style=flat&logo=React%20Hook%20Form&logoColor=white) : `form` 작성 편의 라이브러리
- ![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=flat&logo=GitHub%20Pages&logoColor=white) : 배포 라이브러리


## 디렉토리 구조

- [맨 위로](#목차)

![nockflix tree](https://user-images.githubusercontent.com/83404864/185940813-9bc78e67-18c8-46c7-bb86-c1d202e459e2.png)

## 주안점

- [맨 위로](#목차)

- 과제 요구 사항을 가장 우선하여 완성하는 데 주안점을 두었습니다.
- 최대한 기능별로 컴포넌트를 분리했습니다.
- 스스로 만든 `svg` 로고를 사용했습니다.

## 한계 및 개선 사항

- [맨 위로](#목차)

- `/tv`에서 같은 `id`를 가진 컴포넌트의 `Framer` 효과가 따로 적용되지 않아 수정이 필요합니다.
  - `Framer`의 이해도가 낮은 것이 원인입니다.
- 더 잘게 컴포넌트를 분리하지 못했습니다.
  - 공통된 컴포넌트가 있지만, 데이터 전달에 대한 방법이 떠오르지 않아 그대로 진행했습니다.
- 꾸미기가 미흡했습니다.
  - 디자인은 어렵습니다.

## 참고 문서

- [맨 위로](#목차)
  [The Movie DB API Documents](https://developers.themoviedb.org/3/getting-started/introduction)
