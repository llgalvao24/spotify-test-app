import { useState, useEffect } from "react";
import "../styles/Loading.css";
import ReactDOM from "react-dom";

const Loading = (props) => {
  const [node] = useState(document.createElement("div"));
  const loading = document.querySelector("#loading");

  useEffect(() => {
    loading.appendChild(node).classList.add("message");
  }, [loading, node]);

  useEffect(() => {
    if (props.show) {
      loading.classList.remove("hide");
      document.body.classList.add("loading-open");
    } else {
      loading.classList.add("hide");
      document.body.classList.remove("loading-open");
    }
  }, [loading, props.show]);

  return ReactDOM.createPortal(props.children, node);
};

export default Loading;
