import { InputHTMLAttributes, LabelHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";

type TInputProps = {
  input?: InputHTMLAttributes<HTMLInputElement>;
  label: LabelHTMLAttributes<HTMLLabelElement>;
  textarea?: TextareaHTMLAttributes<HTMLTextAreaElement>;
  text: string;
};

type Ref = HTMLInputElement | HTMLTextAreaElement | undefined;

const Input = forwardRef<Ref, TInputProps>((props, ref) => {
  const inputRef = ref as React.RefObject<HTMLInputElement>;
  const textareaRef = ref as React.RefObject<HTMLTextAreaElement>;

  const classInput =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";
  let contentInput = <input {...props.input} className={classInput} ref={inputRef} />;

  if (props.textarea) {
    contentInput = <textarea {...props.textarea} className={classInput} ref={textareaRef} />;
  }

  return (
    <div>
      <label {...props.label} className="block mb-2 text-sm font-medium text-gray-900">
        {props.text}
      </label>
      {contentInput}
    </div>
  );
});

export default Input;
