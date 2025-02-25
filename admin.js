let map, geocoder, baseMarker, circle, targetLocation = null;

function initMap() {
    const container = document.getElementById('map');
    map = new kakao.maps.Map(container, { center: new kakao.maps.LatLng(37.5665, 126.9780), level: 5 });
    geocoder = new kakao.maps.services.Geocoder();
}

function setBaseLocation() {
    const address = document.getElementById("addressInput").value.trim();
    if (!address) {
        alert("📌 주소를 입력하세요!");
        return;
    }

    geocoder.addressSearch(address, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            targetLocation = { lat: result[0].y, lng: result[0].x };
            localStorage.setItem("surveyLocation", JSON.stringify(targetLocation));
            alert("✅ 기준 위치 설정 완료!");
        } else {
            alert("❌ 주소 검색 실패! 올바른 주소를 입력하세요.");
        }
    });
}

window.onload = initMap;
