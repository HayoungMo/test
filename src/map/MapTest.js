import React, { useEffect, useRef } from 'react';
import markerTestData from './MapTestData';

const MapTest = () => {

    //React에서 지도를 담을 영역의 DOM 참조는 ref를 사용한다.
    const mapRef = useRef()

    useEffect(()=>{
        const kakao = window.kakao;

        kakao.maps.load(()=>{
        const container = mapRef.current; //지도를 담을 영역의 DOM 참조

        //지도를 생성할 때 필요한 기본 옵션
        const options = {
            center: new kakao.maps.LatLng(37.5062528, 126.8379591), //지도의 중심좌표
            level:3,
        };
        const map = new kakao.maps.Map(container,options);//지도 생성 및 객체 리턴
        
        //여기서 데이터 돌면서 마커 생성
         markerTestData.map((item) => {
            new kakao.maps.Marker({
                map:map,
                position: new kakao.maps.LatLng(item.lat, item.lng),
                title:item.title,
            });
         });
        }); 
    },[]);
    return (
        <>
        <h1>카카오맵</h1>
        <div ref={mapRef} style={{width: '500px', height:'400px'}}>
            
        </div>
        </>
    );
};

export default MapTest;