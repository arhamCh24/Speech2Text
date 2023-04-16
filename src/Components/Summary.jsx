import React from "react";

export default function Summary(props) {
  return (
    <div>
      <div className="mx-auto w-3/4 md:w-[60%] mt-5">
        <h2 className="mt-5 text-xl font-bold">Your Text Summary</h2>
        <p className="mt-1">
          {
            props.text.split(/\s+/).filter((element) => {
              return element.length !== 0;
            }).length
          }{" "}
          Words & {props.text.length} Characters
        </p>
        <p className="mt-1">{0.008 * props.text.split(" ").length} Minutes read</p>
      </div>
    </div>
  );
}
