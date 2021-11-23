import { useEffect, useRef, useState } from 'react';

function SelectionMaintainingInput(props) {
    const { value, onChange, ...rest } = props;
    const [cursor, setCursor] = useState(null);
    const ref = useRef(null);

    useEffect(() => {
        const input = ref.current;
        if (input) input.setSelectionRange(cursor, cursor);
        if (document.activeElement.id == props.id && input) {
            input.scrollIntoView({ behavior: 'smooth', block: "nearest"});
        }
    }, [ref, cursor, value]);

    const handleChange = (e) => {
        setCursor(e.target.selectionStart);
        onChange && onChange(e);
    };

    return <textarea
        id={props.id}
        ref={ref}
        className={props.className}
        value={value}
        readOnly={props.readOnly}
        onChange={handleChange}
        onClick={props.onClick}
        aria-label={`List Item ${value}`}
    />
}

export default SelectionMaintainingInput;