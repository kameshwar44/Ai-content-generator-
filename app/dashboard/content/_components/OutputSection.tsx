import React, { useRef, useEffect, useState } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

interface PROPS {
  aiOutput: string;
}

function OutputSection({aiOutput}: PROPS) {
  const editorRef: React.RefObject<Editor> = useRef(null);
  const [editorContent, setEditorContent] = useState<string>("Your Result will Appear Here");
  const [displayedContent, setDisplayedContent] = useState<string>("");

  useEffect(() => {
    if (aiOutput) {
      setEditorContent(aiOutput);
      animateText(aiOutput);
    }
  }, [aiOutput]);

  const animateText = (text: string) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedContent((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 10); // Adjusted to 10ms for faster text appearance
  };

  useEffect(() => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      editorInstance.setMarkdown(displayedContent);
      
      // Apply custom styles to make the output more colorful
      const colorfulCSS = `
        .toastui-editor-contents h1 { color: #FF6B6B; }
        .toastui-editor-contents h2 { color: #4ECDC4; }
        .toastui-editor-contents h3 { color: #45B7D1; }
        .toastui-editor-contents h4 { color: #FFA07A; }
        .toastui-editor-contents h5 { color: #98D8C8; }
        .toastui-editor-contents h6 { color: #F67280; }
        .toastui-editor-contents p { color: #333; font-size: 16px; line-height: 1.6; }
        .toastui-editor-contents strong { color: #E74C3C; font-weight: bold; }
        .toastui-editor-contents em { color: #3498DB; font-style: italic; }
      `;
      
      const styleElement = document.createElement('style');
      styleElement.textContent = colorfulCSS;
      document.head.appendChild(styleElement);
    }
  }, [displayedContent]);

  const handleCopy = () => {
    if (editorRef.current) {
      const content = editorRef.current.getInstance().getMarkdown();
      navigator.clipboard.writeText(content);
    }
  };

  return (
    <>
      <div className="p-5 shadow-sm bg-white rounded-md relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 opacity-50"></div>
        <div className="relative z-10">
          <div className="text-2xl font-bold flex justify-between items-center mb-4">
            <h2 className="text-gradient">Your Result</h2>
            <Button className="flex items-center gap-2 bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white" onClick={handleCopy}>
              <Copy size={18} />
              Copy
            </Button>
          </div>
          <Editor
            ref={editorRef} 
            initialValue={editorContent}
            height="600px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            onChange={() => {
              console.log(editorRef.current?.getInstance().getHTML());
            }}
          />
        </div>
      </div>
      <style jsx>{`
        .text-gradient {
          background: linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #FFA07A);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </>
  );
}

export default OutputSection;