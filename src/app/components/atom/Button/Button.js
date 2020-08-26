import React from "react";

export default function Button({ name, type, onClick }) {
    return (
        <div onClick={() => onClick()} className={"button " + type}>
            {name}
        </div>
    );
}
