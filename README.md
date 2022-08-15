# react-yeslide
<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/Sass-CC6699?style=flat&logo=Sass&logoColor=white"/>
### Explanation
간편한 슬라이드 라이브러리

### Installation

#### npm
<pre>
<code>
npm install yeslide
</code>
</pre>

#### yarn
<pre>
<code>
yarn add yeslide
</code>
</pre>

#### import in your react-app
<pre>
<code>
import { Yeslide } from 'yeslide'
</code>
</pre>

### Usage Component
```javascript
import React from 'react';
import { Yeslide } from 'yeslide';

function App() {
  return (
    <div className="App">
      <Yeslide/>
    </div>
  );
}
```

### props
|props|essential|type|default|description|
|:------:|:----:|:----:|:----:|:----:|
| images |   ✔   | array | [] | 배열에 사용하실 이미지를 넣어주세요.|
| buttonSize |  | string | medium |인디케이터 사이즈 입니다(small, medium,large) |
| duration |  | number | 2000(2s) | 자동슬라이드 시간간격 |
