import React, { useRef, useEffect, useState } from "react";

export default function TextInputes({
    title = "no title",
    placeholder = "Type something",
    onChange,
    value,
    type = "text",
    style,
    name,
}) {
    const myRef = useRef(null);
    const [renderColor, setRenderColor] = useState(false);

    useEffect(() => {
        //console.log('use Effect');
        document.addEventListener("mousedown", handelClick, false);
        return () => {
            document.removeEventListener("mousedown", handelClick, false);
        };
    }, []);

    const handelClick = (e) => {
        if (myRef.current.contains(e.target)) {
            return;
        }
        //console.log(e, myRef);
        document.removeEventListener("mousedown", handelClick, false);
        setRenderColor(false);
    };

    const activeClick = () => {
        setRenderColor(true);
        document.addEventListener("mousedown", handelClick, false);
    };

    return (
        <div key={Date.now()} className="contain">
            <p
                style={{
                    marginBottom: 5,
                    opacity: 0.7,
                    fontSize: 14,
                    textTransform: "capitalize",
                    color: renderColor ? "#ED5A35" : "#000",
                }}
            >
                {title}
            </p>
            <input
                name={name}
                style={{ ...style }}
                type={type}
                autoFocus={renderColor}
                key={Date.now()}
                ref={myRef}
                onClick={(e) => activeClick()}
                className="text-input"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
}
