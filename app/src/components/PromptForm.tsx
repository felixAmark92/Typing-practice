import { FieldValues, useForm } from "react-hook-form";

interface Props {
  sendRequest(req: PromptRequest): void;
  disableGenerateBtn: boolean;
}

const PromptForm = ({ sendRequest, disableGenerateBtn }: Props) => {
  const { register, handleSubmit } = useForm();

  const submit = (data: FieldValues) => {
    const req: PromptRequest = {
      text: data.text,
      language: data.language,
      style: data.style,
      length: data.length,
    };

    sendRequest(req);
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(submit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <p className=" mb-10 text-2xl text-slate-400 font-bold">
          Type in your request
        </p>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Text
        </label>
        <input
          {...register("text")}
          id="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"
        ></input>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Language
        </label>
        <input
          {...register("language")}
          id="language"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"
        ></input>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Style
        </label>
        <input
          {...register("style")}
          id="style"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"
        ></input>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Length
        </label>
        <input
          {...register("length")}
          id="length"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
        ></input>
        <button
          disabled={disableGenerateBtn}
          type="submit"
          className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-5"
        >
          Generate text
        </button>
      </form>
    </div>
  );
};

export default PromptForm;
