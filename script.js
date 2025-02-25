// ✅ 설문 저장 기능
function saveSurvey() {
    const title = document.getElementById("survey-title").value;
    if (!title.trim()) {
        alert("설문 제목을 입력하세요.");
        return;
    }
    localStorage.setItem("surveyTitle", title);
    alert("✅ 설문이 저장되었습니다!");
}

// ✅ 쿠키 설정 함수 (SameSite=None; Secure 속성 설정)
function setSurveyCookie() {
    document.cookie = "surveyAuth=valid; SameSite=None; Secure; max-age=3600";
}

// ✅ 쿠키 확인 함수
function checkSurveyCookie() {
    if (document.cookie.includes("surveyAuth=valid")) {
        alert("✅ 인증된 사용자가 맞습니다.");
    } else {
        alert("❌ 인증되지 않은 사용자입니다.");
    }
}

// ✅ 페이지 로드 시 쿠키 확인
window.onload = function () {
    checkSurveyCookie();
};
