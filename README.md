# Stable Travel Card - 모바일 결제 앱 프로토타입

여행의 경계를 허무는 결제 경험을 제공하는 모바일 React 앱입니다.

## 🚀 특징 

- **설치 없이 실행**: CDN을 통한 React, Material Design 컴포넌트 사용
- **모바일 최적화**: 반응형 디자인으로 모바일 환경에 최적화
- **Material Design**: Google Material Design 가이드라인 적용
- **실시간 환율 변환**: KRW ↔ USDC 변환 시뮬레이션
- **해외 결제 시뮬레이션**: 실제 해외 결제 환경을 모방한 UI/UX

## 📱 주요 기능

### 1. 온보딩 / 로그인
- 스플래시 스크린 (브랜드 로고 + 슬로건)
- 로그인 화면 (이메일/패스워드)
- 회원가입 화면 (이름, 이메일, 비밀번호)

### 2. 홈 대시보드
- 현재 잔액 표시 (₩ / 현지통화 변환)
- 충전하기 버튼
- 결제 내역 바로가기
- 최근 거래 내역

### 3. 충전 기능
- 원화 금액 입력 (슬라이더 UI)
- KRW ↔ USDC 실시간 변환 비율 표시
- 충전 완료 알림

### 4. 해외 결제 시뮬레이션
- 결제 금액 표시
- 환율 정보 표시
- 결제 처리 애니메이션
- 결제 완료 알림

### 5. 설정
- 언어 설정
- 결제 알림 설정
- 환율 알림 설정
- 지문 인증 설정

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: Indigo (#3f51b5)
- **Secondary**: Teal (#009688)
- **Background**: Light Gray (#f5f5f5)
- **Surface**: White (#ffffff)

### 타이포그래피
- **Font Family**: Roboto
- **Headline**: 24px, 500 weight
- **Body**: 16px, 400 weight
- **Caption**: 12px, 400 weight

### 컴포넌트
- **Material Design Filled Button**: Primary 액션
- **Outlined TextField**: 입력 필드
- **Card**: 정보 표시
- **Snackbar**: 알림 메시지
- **Bottom Navigation**: 네비게이션

## 🛠️ 기술 스택

- **Frontend**: React 18
- **Styling**: CSS3 (Material Design)
- **Icons**: Material Icons
- **Fonts**: Google Fonts (Roboto)
- **Build Tool**: CDN (설치 없음)

## 🚀 실행 방법

1. 프로젝트 파일을 웹 서버에 업로드하거나 로컬 서버 실행
2. 브라우저에서 `index.html` 파일 열기
3. 모바일 브라우저에서 최적의 경험을 제공

### 로컬 서버 실행 (Python)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### 로컬 서버 실행 (Node.js)
```bash
# npx 사용
npx http-server

# 또는
npm install -g http-server
http-server
```

## 📁 파일 구조

```
stable/
├── index.html          # 메인 HTML 파일
├── app.js             # React 앱 로직
└── README.md          # 프로젝트 문서
```

## 🎯 사용자 플로우

1. **스플래시 스크린** → 브랜드 소개 (2초)
2. **로그인/회원가입** → 사용자 인증
3. **홈 대시보드** → 잔액 확인 및 메인 기능 접근
4. **충전하기** → 원화 충전 및 USDC 변환
5. **결제** → 해외 결제 시뮬레이션
6. **결제 내역** → 거래 기록 확인
7. **설정** → 앱 설정 관리

## 🔧 커스터마이징

### 색상 변경
`index.html` 파일의 CSS 변수를 수정하여 색상을 변경할 수 있습니다:

```css
.material-button {
    background: #your-primary-color;
}

.app-bar {
    background: #your-primary-color;
}
```

### 기능 추가
`app.js` 파일에서 새로운 컴포넌트를 추가하거나 기존 기능을 확장할 수 있습니다.

## 📱 모바일 최적화

- **Viewport**: 모바일 디바이스 최적화
- **Touch Targets**: 최소 44px 터치 영역
- **Responsive Design**: 다양한 화면 크기 지원
- **Performance**: 빠른 로딩과 부드러운 애니메이션

## 🔒 보안 고려사항

현재는 프로토타입이므로 실제 보안 기능은 구현되지 않았습니다. 실제 서비스에서는 다음을 고려해야 합니다:

- HTTPS 통신
- 사용자 인증 토큰 관리
- 결제 정보 암호화
- API 보안

## 📄 라이선스

이 프로젝트는 교육 및 프로토타입 목적으로 제작되었습니다.

## 🤝 기여

프로젝트 개선을 위한 제안이나 버그 리포트는 언제든 환영합니다!

---

**Stable Travel Card** - 여행의 경계를 허무는 결제 경험 ✈️

