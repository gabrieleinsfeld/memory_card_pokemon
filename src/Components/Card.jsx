import { useState, useEffect } from "react";

export default function Card(props) {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  useEffect(() => {
    if (props.data && props.data.name) {
      const fetchName = () => {
        setName(
          props.data.name.charAt(0).toUpperCase() + props.data.name.slice(1)
        );
      };
      const fetchImg = () => {
        setImg(props.data.sprites.front_default);
      };
      fetchName();
      fetchImg();
    }
  }, [props.data]); // Dependency array to rerun effect if props.data changes

  return (
    <div onClick={props.onClick} className="card">
      <img src={img} alt="Pokemon Img" />
      {name ? name : "Loading..."}{" "}
    </div>
  );
}
