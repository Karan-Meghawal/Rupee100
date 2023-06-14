import { GlobalStyles } from "@mui/material";
import { Editor as TinyMceEditor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { type Editor as TinyMCEEditorType } from "tinymce";

const Editor = ({
  initialValue,
  onChangeValue,
  ...otherProps
}: {
  initialValue: string;
  onChangeValue: (value: string) => void;
  [x: string]: unknown;
  // todo type
}) => {
  const editorRef = useRef<TinyMCEEditorType | null>(null);
  return (
    <>
      <GlobalStyles
        styles={{
          ".tox-notification--warning, .tox-statusbar__branding": {
            display: "none !important",
          },
        }}
      />
      <TinyMceEditor
        apiKey="tiny"
        onInit={(evt, editor) => {
          editorRef.current = editor;
        }}
        initialValue={initialValue}
        init={{
          height: 500,
          skin: "oxide-dark",
          content_css: "dark",
          plugins: [
            "a11ychecker",
            "advlist",
            "advcode",
            "advtable",
            "autolink",
            "checklist",
            "export",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "powerpaste",
            "fullscreen",
            "formatpainter",
            "insertdatetime",
            "media",
            "table",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | formatpainter casechange blocks | bold italic  forecolor fontsize fontfamily backcolor | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",
        }}
        onEditorChange={onChangeValue}
        {...otherProps}
      />
    </>
  );
};

export default Editor;
