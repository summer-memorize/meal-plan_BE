# API Documentation

## Introduction

개인 용도의 식단표 작성 API입니다.
'오늘은 뭐 해먹지?'라는 고민에서 벗어나기 위해 식단표를 작성하고자 만들었습니다.

<br>

## Endpoints

### GET /mealplans

`연도 별로 식단표 정보를 가져옵니다.`

##### Query

- year : 식단표 정보를 가져오려는 연도를 입력합니다.

##### Response

status: 200 OK
`{ data: [
  {
    breakfast: ["식빵 한 조각", "블루베리잼", "우유"],
    lunch: ["현미밥", "김치찌개", "계란후라이"],
    dinner: ["삼계탕", "막걸리"],
    date: "yyyy-mm-dd"
  },
  ...,
  {
    breakfast: ["간장계란밥"],
    lunch: ["흰밥", "제육볶음", "미역국"],
    dinner: ["모츠나베", "하이볼"],
    date: "yyyy-mm-dd"
  }
] }`

<br>

### POST /mealplans

`식단표를 입력합니다.`

##### BODY

- breakfast : 아침 식단을 입력합니다.
- lunch : 점심 식단을 입력합니다.
- dinner : 저녁 식단을 입력합니다.
- date: 저장하려는 식단표의 날짜를 "yyyy-mm-dd"형태로 입력합니다.

##### Request body

`{
  breakfast: ["식빵 한 조각", "블루베리잼", "우유"],
  lunch: ["현미밥", "김치찌개", "계란후라이"],
  dinner: ["삼계탕", "막걸리"],
  date: "2023-11-08"
}`

##### Response

status: 201 Created

<br>

### PUT /mealplans

`식단표를 수정합니다.`

##### BODY

- breakfast : 아침 식단을 입력합니다.
- lunch : 점심 식단을 입력합니다.
- dinner : 저녁 식단을 입력합니다.
- date: 수정하려는 식단표의 날짜를 "yyyy-mm-dd"형태로 입력합니다.

##### Request body

`{
  breakfast: ["식빵 한 조각", "블루베리잼", "우유"],
  lunch: ["현미밥", "김치찌개", "계란후라이"],
  dinner: ["치킨", "맥주"],
  date: "2023-10-08"
}`

##### Response

status: 200 OK

<br>

### DELETE /mealplans

`식단표를 삭제합니다.`

##### Query

- date: 삭제하려는 식단표의 날짜를 "yyyy-mm-dd"형태로 입력합니다.

##### Response

status: 200 OK
