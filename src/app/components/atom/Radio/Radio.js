import React from "react";

export default function Radio({ isActive, onClick, style }) {
    return (
        <div className="outer-circle" onClick={() => onClick()} style={style}>
            {isActive && <div className="inner-circle"></div>}
        </div>
    );
}
