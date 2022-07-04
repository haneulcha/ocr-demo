import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [imgFile, setImgFile] = useState("");

  const onImgChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const img = evt.target.files?.[0];
    if (!img) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setImgFile(e.target?.result as string);
    };
    reader.readAsDataURL(img);
  };

  return (
    <div className="App">
      <header>이미지를 텍스트로</header>
      <main>
        <form onSubmit={() => console.log("on submit")}>
          <label htmlFor="img">업로드</label>
          <input id="img" type="file" accept="image/*" onChange={onImgChange} />
        </form>

        <div className="uploaded-img__wrapper">
          {imgFile && (
            <img
              className="uploaded-img__img"
              src={imgFile}
              alt="유저가 업로드한 이미지"
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
