import React, { useEffect, useRef, useState } from 'react';
// import markerTestData from './MapTestData';

const MapTest = () => {

    const mapRef = useRef(null);
    const [name, setName] = useState(null);
    const [addr, setAddr] = useState(null);

useEffect(() => {
    const { kakao } = window;

    kakao.maps.load(() => {
        var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

        // ✅ 1. getElementById 대신 mapRef.current 사용
        var map = new kakao.maps.Map(mapRef.current, {
            center: new kakao.maps.LatLng(37.566826, 126.9786567),
            level: 4,
        });

        var ps = new kakao.maps.services.Places(map);

        

        // ✅ 2. 한식 검색은 keywordSearch 사용
        ps.keywordSearch('한식', placesSearchCB, { useMapBounds: true });

        var geocoder = new kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색합니다
        geocoder.addressSearch('', function(result, status) {

        // 정상적으로 검색이 완료됐으면 
        if (status === kakao.maps.services.Status.OK) {

            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new kakao.maps.Marker({
                map: map,
                position: coords
            });

            // 인포윈도우로 장소에 대한 설명을 표시합니다
            var infowindow = new kakao.maps.InfoWindow({
                content: '<a href="../components/FoodDetail.js">' + '<div style="width:150px;text-align:center;padding:6px 0;">' + "name" + '</div>' + '</a>'
            });
            infowindow.open(map, marker);

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            //map.setCenter(coords);
            map.setCenter(coords);
        }
    });

        function placesSearchCB(data, status) {
            if (status === kakao.maps.services.Status.OK) {
                for (var i = 0; i < data.length; i++) {
                    displayMarker(data[i]);
                }
            }
        }

        function displayMarker(place) {
            var marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x),
            });

            kakao.maps.event.addListener(marker, 'click', function () {
                // ✅ 3. style은 HTML 문자열이므로 따옴표+세미콜론 방식으로
                infowindow.setContent(
                    '<div style="padding:5px;font-size:12px">' + place.place_name + '</div>'
                );
                infowindow.open(map, marker);
            });
        }
    }); // ✅ kakao.maps.load 닫힘

}, []); // ✅ useEffect 닫힘

// return에 ref 연결 필수
return (

<div ref={mapRef} style={{ width: '600px', height: '500px', margin: 'auto'}} />);
};

export default MapTest;