# 전기차충전소 서비스(EVC) backend  

#### 해당 프로젝트는 2021년 Node.js기반 웹수업의 기말 프로젝트입니다.  

2021 web project(<img src="https://img.shields.io/badge/Node.js-85bd0c?style=flat-square&logo=Node.js&logoColor=white"/> <img src="https://img.shields.io/badge/Vue.js-006400?style=flat-square&logo=Vue.js&logoColor=white"/> )  


#### :muscle: Contributors  
:sparkles: 장지은(dev-hana)  
:sparkles: 김초롱(chorong4641)  
:sparkles: 최우석(e3hope)  

#### :clapper: 시연 영상  
[![Video Label](http://img.youtube.com/vi/MipZu8r4hnM/0.jpg)](https://www.youtube.com/watch?v=MipZu8r4hnM)

#### :memo: Version
![image](https://user-images.githubusercontent.com/46733911/123727334-70a93f00-d8cc-11eb-8e1d-074369fc6198.png)



###  :grey_exclamation: 주의사항  

:key: 전기차 충전소 서비스 및 KaKao MAP API 서비스 Key는 대문자 영어로 변경하였으니 해당 Key를 받으셔서 사용하시기 바랍니다.  
[전기차 충전소 API](https://www.data.go.kr/data/3068728/openapi.do)  
[KaKao MAP API](https://apis.map.kakao.com/web/guide/)   
- 변경부분:  
[EVC_backend](https://github.com/dev-hana/EVC_backend) `routes/evInfo.js`  
[EVC_frontend](https://github.com/dev-hana/EVC_frontend) `public/index.html` `src/components/map.vue`  


:heavy_check_mark: 이메일 및 Mysql, Mongo DB정보도 변경하여 사용하시기 바랍니다.
- 변경 부분:
[EVC_backend](https://github.com/dev-hana/EVC_backend) `routes/users.js`  `email.js`  `mongo.js` `mysql.js`  

:heavy_check_mark: 현재 위치 정보에 대한 기술은 주석 꼭 참고 바람  `src/components/map.vue` 74행부터

:heavy_check_mark: Grafana는 추후 서비스 종료(iframe부분)   

:heavy_check_mark: mysql dump 추후 업데이트  







### 서버 실행 
```
git clone https://github.com/dev-hana/EVC_frontend
git clone https://github.com/dev-hana/EVC_backend 
cd EVC_backend
npm install 
cd ../EVC_frontend 
npm install
npm run serve 
npm run build
cd ../EVC_backend
npm start
```
