import React, {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from "react";
import TextInputes from "../../atom/Form/TextInputes";
import Radio from "../../atom/Radio/Radio";

const data = ["option1", "option2", "option3", "option4"];

const MCQ = forwardRef((props, ref) => {
    const [option, setOption] = useState(0);
    const [obj, setObj] = useState({
        qsName: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        trueOption: option,
    });

    useImperativeHandle(ref, () => ({
        onSubmit() {
            // props.setQuestion(obj);
            // console.log(">mcq");
            props.updates(obj);
        },
    }));

    // useEffect(() => {
    //     // console.log(obj);
    // }, [obj]);

    const updateField = (e) => {
        setObj({
            ...obj,
            [e.target.name]: e.target.value,
        });
    };

    const updateRadio = (index) => {
        setOption(index);
        setObj({
            ...obj,
            ["trueOption"]: index,
        });
    };

    return (
        <div className="card" style={{ paddingLeft: 40, paddingBottom: 40 }}>
            <div>
                <TextInputes
                    value={obj.qsName}
                    name="qsName"
                    onChange={updateField}
                    title="Question Name"
                />
            </div>
            <div>
                {[1, 2, 3, 4].map((itm, index) => (
                    <div className="row_center">
                        <Radio
                            onClick={() => updateRadio(index)}
                            isActive={index === option}
                        />
                        <TextInputes
                            value={obj[data[index]]}
                            name={data[index]}
                            onChange={updateField}
                            title={"Option " + index}
                            style={{ maxWidth: "87%" }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
});

export default MCQ;
