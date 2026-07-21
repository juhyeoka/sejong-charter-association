# 세종특별자치시 전세버스운송사업조합 홈페이지

세종특별자치시 전세버스운송사업조합을 위한 독립형 정적 홈페이지입니다. 충청남도전세버스운송사업조합 사이트의 정보 구조(조합 소개, 공문·자료, 종사자 교육, 외부 업무 시스템)를 참고했지만 디자인·문구·코드는 새로 제작했습니다.

## 구성

- 이사장 인사말과 사진 등록 자리
- 조합 조직도
- 운수종사자·검사·교통안전·공제·교육 바로가기
- 공문서·자료실·교육일정 탭 및 검색
- 종사자 교육 및 안전운행 안내
- 공식 등록정보와 조합 사무국 연락처
- 문서 수신자 8개 회원사 로고·회사명 흐름 배너
- 모바일 전체 메뉴
- Render 정적 사이트 배포 설정

## 조합 정보

공식 연락처와 등록정보는 `site-config.js`에 정리되어 있습니다. 조합원 업무시스템 주소가 확정되면 빈 URL만 입력하면 됩니다.

```javascript
window.SEJONG_ASSOCIATION_CONFIG = {
  organizationName: "(사) 세종특별자치시 전세버스운송사업조합",
  representative: "전영진",
  phone: "044-865-3258",
  fax: "044-865-3236",
  email: "sejongbus@naver.com",
  address: "세종특별자치시 조치원읍 문화로 3-1",
  postalCode: "30024",
  uniqueNumber: "307-82-08985",
  corporationNumber: "164721-0000922",
  memberLoginUrl: "조합원 로그인 주소",
  driverSystemUrl: "운수종사자 관리시스템 주소"
};
```

확인되지 않은 임원 이름은 임의로 넣지 않았습니다. 하단 회원사 띠에는 제공받은 조합 공문 수신자 8개 업체를 모두 표시하며, 공식 공개 로고가 확인된 업체만 이미지로 표시하고 나머지는 회사명을 일반 텍스트로 표시합니다.

공식 홈페이지나 업체 운영 페이지가 확인된 회원사 카드는 새 창 링크로 연결됩니다. 동일 업체의 공식 페이지를 확인할 수 없는 회원사명에는 임의 링크를 넣지 않습니다.

## 로컬 실행

```bash
cd /Users/jungjuhyeok/sejong-charter-association
python3 -m http.server 8000
open http://localhost:8000
```

## GitHub 푸시

GitHub에서 빈 저장소를 만든 다음 아래 명령을 실행합니다.

```bash
cd /Users/jungjuhyeok/sejong-charter-association
git remote add origin https://github.com/본인아이디/sejong-charter-association.git
git push -u origin main
```

## Render 배포

1. Render에서 `New` → `Static Site`를 선택합니다.
2. GitHub의 `sejong-charter-association` 저장소를 연결합니다.
3. `render.yaml`을 자동 인식해 배포합니다.

직접 입력하는 경우 Publish Directory는 `.`입니다.

## 주요 파일

- `index.html`: 화면 구조와 기본 문구
- `styles.css`: 전체 디자인과 반응형 화면
- `app.js`: 메뉴, 자료 검색, 모달
- `site-config.js`: 조합 공식 정보와 시스템 주소
- `render.yaml`: Render 배포 설정
