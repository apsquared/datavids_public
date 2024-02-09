import React, { useState, useRef, useEffect } from 'react';

interface JsonEditorProps {
    initialJson?: string;
    onJsonUpdate?: (json: any) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ initialJson = '', onJsonUpdate }) => {
    if (initialJson) {
        let obj = JSON.parse(initialJson);
        if (obj){
            initialJson = JSON.stringify(obj, null, 2)
        }
    }
    const [input, setInput] = useState<string>(initialJson);
    const [parsedJson, setParsedJson] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleValidate = () => {
        try {
            const parsed = JSON.parse(input);
            setParsedJson(parsed);
            setError(null);

            // Call the provided callback with the parsed JSON
            if (onJsonUpdate) {
                onJsonUpdate(parsed);
            }

        } catch (e:any) {
            setError(e.message);
            setParsedJson(null);
        }
    };

    const renderLineNumbers = () => {
        const lineCount = input.split('\n').length;
        const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1).join('\n');
        return lineNumbers;
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
        handleValidate();
    }, [input]);

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <pre style={{ overflow: 'auto', marginRight: '2px', lineHeight: '1.5rem' }}>{renderLineNumbers()}</pre>
                <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={10}
                    style={{ width: '100%', overflow: 'hidden', lineHeight: '1.5rem' }}
                    placeholder="Enter JSON here"
                ></textarea>
            </div>
            <button className="bg-primary hover:hover:bg-primary/80 text-white font-bold mt-3 py-2 px-4 rounded" onClick={handleValidate}>Update Video</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}


        </div>
    );
};

export default JsonEditor;
