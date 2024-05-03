import React, { FormEvent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

interface Props {
  sendRequest(req: PromptRequest): void;
}

const PromptForm = ({ sendRequest }: Props) => {
  const { register, handleSubmit } = useForm();

  let submit = (data: FieldValues) => {
    console.log(data.text);

    let req: PromptRequest = {
      text: data.text,
      language: data.language,
      style: data.style,
      length: data.length,
    };

    sendRequest(req);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <label>Text</label>
      <input {...register("text")} id="text"></input>
      <label>Language</label>
      <input {...register("language")} id="language"></input>
      <label>Style</label>
      <input {...register("style")} id="style"></input>
      <label>Length</label>
      <input {...register("length")} id="length"></input>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PromptForm;
