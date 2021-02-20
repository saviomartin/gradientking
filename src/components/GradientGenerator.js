import React, { useState } from "react";
import Color, { Palette } from "color-thief-react";
import { Button, Tooltip } from "@material-ui/core";
import { Code } from "@material-ui/icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Loading = () => <div>Loading...</div>;

const GradientGenerator = () => {
  const [image, setImage] = useState(
    "https://live.staticflickr.com/65535/50237066832_72c7290c5c_c.jpg"
  );
  const onChange = (e) => {
    const files = e.target.files;
    const file = files[0];
    getBase64(file);
  };

  const onLoad = (fileString) => {
    setImage(fileString);
    console.log(fileString);
  };

  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    };
  };

  const notify = () => {
    toast("Copied CSS 🚀");
  };
  const imgSrc = image;
  return (
    <div className="gradientGenerator">
      <Palette src={imgSrc} crossOrigin="anonymous" format="hex" colorCount={4}>
        {({ data, loading }) => {
          if (loading) return <Loading />;
          return (
            <div
              className="gradientCont flex"
              style={{
                background: `linear-gradient(to left, ${data[0]}, ${data[1]}, ${data[2]}, ${data[3]})`,
              }}
            >
              <div className="palatte gradient">
                <div className="cont flex">
                  {data.map((color, index) => (
                    <Tooltip title="Copy Color" aria-label="add">
                      <h4
                        key={index}
                        style={{ color: color }}
                        onClick={() => navigator.clipboard.writeText(color)}
                      >
                        {color}
                      </h4>
                    </Tooltip>
                  ))}
                </div>
                <img src={imgSrc} alt="" className="demoImage" />
                <div className="cont flex">
                  <form>
                    <Tooltip title="Select your file" aria-label="add">
                      <label className="uploadImage">
                        Select Your File
                        <input
                          type="file"
                          onChange={onChange}
                          className="uploadImage"
                        />
                      </label>
                    </Tooltip>
                  </form>
                  <Tooltip title="Copy Gradient" aria-label="add">
                    <Button
                      variant="contained"
                      className="copybtn"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `background: linear-gradient(to left, ${data[0]}, ${data[1]}, ${data[2]}, ${data[3]});`
                        );
                        notify();
                      }}
                    >
                      <Code />
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </div>
          );
        }}
      </Palette>
    </div>
  );
};

export default GradientGenerator;
