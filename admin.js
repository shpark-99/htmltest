let map, geocoder, baseMarker, circle, targetLocation = null;

// ✅ 지도 초기화
function initMap() {
    console.log("✅ 지도 초기화 중...");
    const container = document.getElementById('map');
    map = new kakao.maps.Map(container, { center: new kakao.maps.LatLng(37.5665, 126.9780), level: 5 });
    geocoder = new kakao.maps.services.Geocoder();
    console.log("✅ 지도 로드 완료!");
}

// ✅ 기준 위치 설정
function setBaseLocation() {
    const address = document.getElementById("addressInput").value.trim();
    if (!address) {
        alert("📌 주소를 입력하세요!");
        return;
    }

    geocoder.addressSearch(address, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            const lat = result[0].y, lng = result[0].x;
            targetLocation = { lat, lng };

            if (baseMarker) baseMarker.setMap(null);
            baseMarker = new kakao.maps.Marker({ map: map, position: new kakao.maps.LatLng(lat, lng), title: "기준 위치" });

            if (circle) circle.setMap(null);
            circle = new kakao.maps.Circle({
                map: map, center: new kakao.maps.LatLng(lat, lng), radius: 300,
                strokeWeight: 2, strokeColor: '#FF0000', strokeOpacity: 0.8,
                fillColor: '#FF0000', fillOpacity: 0.2
            });

            map.setCenter(new kakao.maps.LatLng(lat, lng));
            alert("✅ 기준 위치 설정 완료!");
        } else {
            alert("❌ 주소 검색 실패! 올바른 주소를 입력하세요.");
        }
    });
}

// ✅ 설문 저장 (기준 위치 저장)
function saveSurvey() {
    if (!targetLocation) {
        alert("❌ 기준 위치를 먼저 설정하세요!");
        return;
    }
    localStorage.setItem("surveyLocation", JSON.stringify(targetLocation));
    alert("✅ 설문이 저장되었습니다!");
}

// ✅ 페이지 로드 시 지도 초기화
window.onload = initMap;
