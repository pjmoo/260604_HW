# Express AI API 서버 & 프론트엔드 연결 챗봇 미니 프로젝트 💬

Node.js Express 백엔드로 독자 로컬 서버를 작동시키고, 이를 이용해 프론트엔드 HTML 페이지와 비동기 Fetch 통신을 연결하여 실시간 AI 질의응답을 구현해보는 종합 챗봇 구축 과제입니다.

---

## ?뱛 ?숈뒿 ?뚯씪 援ъ꽦 (Files)

- [server.js](file:///C:/workspace/260604_HW/server.js) : 환경변수 로딩, 정적 에셋 서빙, API 라우터 개설 및 AI SDK 연동을 처리하는 통합 Express 백엔드 코드
- [index.html](file:///C:/workspace/260604_HW/index.html) : 말풍선 챗봇 UI 화면과 실시간 Fetch API로 서버에 데이터 통신을 주고받는 자바스크립트가 내장된 웹 문서
- [package.json](file:///C:/workspace/260604_HW/package.json) : express 및 인공지능 통신용 모듈 명세서

---

## ?썱 諛곗슫 ?듭떖 媛쒕뀗 (What We Learned)

- **정적 파일 서빙**: Express 백엔드가 `index.html` 파일을 포함한 리소스들을 클라이언트 브라우저로 쏘아주는 정적 라우팅 방식을 구현합니다.
- **CORS & 프론트-백 엔드 데이터 교환**: 사용자의 질문 메시지를 POST JSON 형식으로 백엔드 서버에 전달하면 백엔드가 AI API를 찔러 답변을 도출하고, 프론트엔드가 이를 받아 말풍선 카드로 실시간 생성하는 유기적인 풀스택 흐름을 완성합니다.

---

## ?? ?ㅽ뻾 諛??뺤씤 諛⑸쾿 (How to Run)

1. 의존성을 먼저 다운로드합니다: `npm install`
2. `.env` 파일에 API 키 정보(`GEMINI_API_KEY=your_key`)를 추가합니다.
3. 서버를 구동합니다: `node server.js`
4. 브라우저 주소창에 `http://localhost:3000`을 입력하여 열어 챗봇과 대화해 봅니다.
