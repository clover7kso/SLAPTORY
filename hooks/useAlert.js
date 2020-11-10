import React, { useState } from "react";

const useAlert = (intialvisible, initialTitle, initialContent) => {
    const [visible, setVisible] = useState(intialvisible);
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);
    const onChange = (visible,title,content) => {
        if(visible!==undefined) setVisible(visible);
        if(title!==undefined) setTitle(title);
        if(content!==undefined) setContent(content);
    };
    return { visible, title, content, onChange };
};

export default useAlert;
