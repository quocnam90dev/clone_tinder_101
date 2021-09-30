import "./Cards.css";
import { useCallback, useEffect, useState } from "react";
import { Close, Favorite } from "@material-ui/icons";
import { Box, IconButton } from "@material-ui/core";

const SWIPE_WIDTH_THRESHOLD = 0.2;
const loremText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ";

const map = (
  n: any,
  start1: any,
  stop1: any,
  start2: any,
  stop2: any
): number => {
  return ((n - start1 * 1) / (stop1 - start1)) * (stop2 - start2) + start2;
};

const Cards = () => {
  const [dragStyle, setDragStyle] = useState({});
  const [likeStyle, setLikeStyle] = useState<any>({
    opacity: 0,
    background: "#000",
  });
  const [likeWord, setLikeWord] = useState("");
  const [swipeable, setSwipeable] = useState(true);
  const [elementBounds, setElementBounds] = useState<any>({});
  const [dragging, setDragging] = useState(false);
  const [initMousePos, setInitMousePos] = useState({ x: 0, y: 0 });
  const [data, setData] = useState([
    {
      imgSrc: "https://yeehaw.s3.amazonaws.com/memes/vevwgopk0t531.PNG",
      name: "User 1",
      age: "30",
      info: loremText,
    },
    {
      imgSrc: "https://yeehaw.s3.amazonaws.com/memes/IMG_0055.JPG",
      age: "31",
      name: "User 2",
      info: loremText,
    },
    {
      imgSrc: "https://yeehaw.s3.amazonaws.com/memes/IMG_0057.JPG",
      name: "User 3",
      age: "32",
      info: loremText,
    },
    {
      imgSrc: "https://yeehaw.s3.amazonaws.com/memes/meme.jpg",
      name: "User 4",
      age: "33",
      info: loremText,
    },
  ]);

  // useEffect
  useEffect(() => {
    // preload images
    data.forEach((item) => {
      const img = (new Image().src = item.imgSrc);
    });
  }, []);

  const appElement = useCallback((appElementNode) => {
    setElementBounds(appElementNode?.getBoundingClientRect());
    // setCatInfo(appElementNode?.getBoundingClientRect());
  }, []);

  // animate
  const mouseDown = (event: any) => {
    if (swipeable) {
      setDragging(true);
      setInitMousePos({
        x: event.clientX,
        y: event.clientY,
      });
    }
  };
  const mouseMove = (event: any) => {
    if (dragging && swipeable) {
      const leftValue = event.clientX - initMousePos.x;
      let likeWord: string = "",
        likeStyle: { opacity: number; background: string };
      if (leftValue < 0) {
        likeWord = "x";
        likeStyle = {
          opacity: map(leftValue, -elementBounds.width, 0, 2, 0),
          background: "red",
        };
      } else if (leftValue > 0) {
        likeWord = "✓";
        likeStyle = {
          opacity: map(leftValue, 0, elementBounds.width, 0, 2),
          background: "palegreen",
        };
      }
      const rotation = leftValue * 0.2;

      setDragStyle({
        left: leftValue,
        top: event.clientY - initMousePos.y,
        transform: `rotate(${rotation}deg)`,
      });
      setLikeStyle({ ...likeStyle! });
      setLikeWord(likeWord);
    }
  };
  const mouseUp = (event: any) => {
    if (swipeable) {
      setDragging(false);
      const leftValue = event.clientX - initMousePos.x;
      if (leftValue < -elementBounds.width * SWIPE_WIDTH_THRESHOLD) {
        swipeLeft();
      } else if (leftValue > elementBounds.width * SWIPE_WIDTH_THRESHOLD) {
        swipeRight();
      } else {
        setDragStyle({
          left: 0,
          top: 0,
          transform: "rotate(0)",
          transition: "all 0.5s",
        });
        setLikeStyle({
          ...likeStyle,
          opacity: 0,
          transition: "all 0.5s",
        });
      }
    }
  };
  const swipeLeft = () => {
    setDragStyle({
      ...dragStyle,
      left: "-40rem",
      transform: "rotate(-45deg)",
      transition: "all 0.5s",
    });

    setSwipeable(false);
    setTimeout(() => dataSplice(), 500);
  };
  const swipeRight = () => {
    setDragStyle({
      ...dragStyle,
      left: "40rem",
      transform: "rotate(45deg)",
      transition: "all 0.5s",
    });
    setSwipeable(false);
    setTimeout(() => dataSplice(), 500);
  };

  const dataSplice = () => {
    setData(data.splice(1));
    setDragStyle({});
    setLikeStyle({
      opacity: 0,
      background: "#000",
    });
    setLikeWord("");
    setSwipeable(true);
    setDragging(false);
    setInitMousePos({ x: 0, y: 0 });
  };

  return (
    <div ref={appElement} className="swipe-app">
      <div className="draggable-row">
        {data.length > 1 ? (
          <div className="draggable-wrapper">
            <div className="draggable">
              <div className="content-image-wrapper">
                <img
                  className="content-image"
                  draggable="false"
                  src={data[1].imgSrc}
                  alt=""
                />
              </div>
              <div className="content-name">{data[1].name}</div>
              <div className="content-info">{data[1].info}</div>
            </div>
          </div>
        ) : (
          <div className="draggable-wrapper">
            <div className="none-wrapper">That's all folks</div>
          </div>
        )}

        {data.length > 0 ? (
          <div
            onMouseDown={mouseDown}
            onMouseMove={mouseMove}
            onMouseUp={mouseUp}
            className="draggable-wrapper noselect"
          >
            <div className="draggable" style={dragStyle}>
              <div className="content-image-wrapper">
                <img
                  className="content-image"
                  draggable="false"
                  src={data[0].imgSrc}
                  alt=""
                />
              </div>
              <div className="content-name">{data[0].name}</div>
              <div className="content-info">{data[0].info}</div>
              <div className="like-dislike-label" style={likeStyle}>
                {likeWord}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      <Box mt={2}>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={() => swipeLeft()}
        >
          <Close />
        </IconButton>
        <IconButton
          color="secondary"
          aria-label="upload picture"
          component="span"
          onClick={() => swipeRight()}
        >
          <Favorite color="secondary" />
        </IconButton>
      </Box>
    </div>
  );
};

export default Cards;
