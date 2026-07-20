# 세종전세버스운송사업조합 홈페이지

세종전세버스운송사업조합을 위한 독립형 정적 홈페이지입니다. 충청남도전세버스운송사업조합 사이트의 정보 구조(조합 소개, 회원사 안내, 공문·자료, 종사자 교육, 외부 업무 시스템)를 참고했지만 디자인·문구·코드는 새로 제작했습니다.

## 구성

- 조합 소개와 세종 권역 노선 보드
- 운수종사자·검사·교통안전·공제·교육 바로가기
- 공문서·자료실·교육일정 탭 및 검색
- 운전자 안전 점검 체크리스트
- 회원사 지원 업무 안내
- 모바일 전체 메뉴
- Render 정적 사이트 배포 설정

## 조합 정보 입력

실제 연락처와 시스템 주소는 `site-config.js`만 수정하면 됩니다.

```javascript
window.SEJONG_ASSOCIATION_CONFIG = {
  organizationName: "세종전세버스운송사업조합",
  phone: "044-000-0000",
  fax: "044-000-0000",
  email: "example@example.com",
  address: "세종특별자치시 실제 주소",
  memberLoginUrl: "조합원 로그인 주소",
  driverSystemUrl: "운수종사자 관리시스템 주소"
};
```

확인되지 않은 연락처나 회원사 정보는 임의로 넣지 않았습니다.

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
- `app.js`: 메뉴, 자료 검색, 모달, 안전 체크리스트
- `site-config.js`: 조합 연락처와 시스템 주소
- `render.yaml`: Render 배포 설정
