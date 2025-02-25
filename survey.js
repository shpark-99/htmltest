function verifyMyLocation() {
    const storedLocation = localStorage.getItem("surveyLocation");
    if (!storedLocation) {
        alert("❌ 기준 위치 정보가 없습니다.");
        return;
    }

    const targetLocation = JSON.parse(storedLocation);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const userLat = position.coords.latitude, userLng = position.coords.longitude;
                const distance = computeDistance(targetLocation.lat, targetLocation.lng, userLat, userLng);

                if (distance <= 300) {
                    updateStatusMessage("✅ 위치 인증 성공!", "green");
                } else {
                    updateStatusMessage("❌ 위치 인증 실패!", "red");
                }
            },
            function() {
                alert("❌ 위치 정보를 가져올 수 없습니다!");
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
        );
    } else {
        alert("❌ 이 브라우저에서는 위치 정보를 지원하지 않습니다!");
    }
}

function computeDistance(lat1, lng1, lat2, lng2) {
    const rad = Math.PI / 180;
    const dLat = (lat2 - lat1) * rad;
    const dLng = (lng2 - lng1) * rad;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLng / 2) ** 2;
    return 6371000 * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}
