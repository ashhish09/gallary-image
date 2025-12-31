import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [img, setImg] = useState([]);
  const [index, setIndex] = useState(1);
  const [preview, setPreview] = useState(null);

  const fetchImage = async () => {
    try {
      const res = await fetch(
        `https://picsum.photos/v2/list?page=${index}&limit=10`
      );
      const data = await res.json();
      setImg(data);
    } catch (error) {
      console.log("Error fetching image:", error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, [index]);

  const nextHandler = () => setIndex(index + 1);
  const prevHandler = () => index > 1 && setIndex(index - 1);

  return (
    <div className="wrapper">

      <h2 className="title">Photo Gallery</h2>

      <div className="image-container">
        {img.map((item) => (
          <div
            key={item.id}
            className="image-card"
            onClick={() => setPreview(item.download_url)}
          >
            <img src={item.download_url} alt="random" />

            <div className="overlay">
              <p>By {item.author}</p>
              <span>Click to preview</span>
            </div>
          </div>
        ))}
      </div>

      <div className="btn">
        <button onClick={prevHandler} disabled={index === 1}>
          Previous
        </button>
        <button onClick={nextHandler}>Next</button>
      </div>

      {preview && (
        <div className="modal" onClick={() => setPreview(null)}>
          <img src={preview} alt="preview" />
        </div>
      )}
    </div>
  );
};

export default App;
