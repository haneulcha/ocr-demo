import React, { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import "./App.css";

const worker = createWorker({
  logger: (m) => console.log(m),
});

function App() {
  const [imgFile, setImgFile] = useState("");
  const [resultText, setResultText] = useState("");
  const [cleanText, setCleanText] = useState("");

  const onImgLoad = async () => {
    const {
      data: { text },
    } = await worker.recognize(imgFile);
    setResultText(text);

    const _cleanText = text.replace(/\n/g, "");
    setCleanText(_cleanText);
  };
  const onImgChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const img = evt.target.files?.[0];
    if (!img) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setImgFile(e.target?.result as string);
    };
    reader.readAsDataURL(img);
  };

  useEffect(() => {
    const initWorker = async () => {
      await worker.load();
      await worker.loadLanguage("kor+eng");
      await worker.initialize("kor");
      await worker.setParameters({ preserve_interword_spaces: "1" });
    };

    initWorker();
  }, []);
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
              onLoad={onImgLoad}
            />
          )}
        </div>

        <div className="recognized-text__wrapper">
          <p contentEditable>{resultText}</p>
        </div>

        <div className="recognized-text__wrapper">
          <p contentEditable className="recognized-text__paragraph--clean">
            {cleanText}
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
