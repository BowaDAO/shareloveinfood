import { ChangeEvent, Dispatch, SetStateAction } from "react";

type Props = {
  role: string;
  setRole: Dispatch<SetStateAction<string>>;
};

const RadioButtons = (props: Props) => {
  const selectOption = (e: ChangeEvent<HTMLInputElement>) => {
    props.setRole(e.target.value);
  };

  return (
    <span className="flex flex-col gap-2">
      <legend>Tell us what best describes you</legend>

      <div className="flex gap-4">
        <span className="flex gap-2">
          <input
            type="radio"
            id="giver"
            name="giver"
            value="giver"
            className="radio_button"
            checked={props.role === "giver"}
            onChange={selectOption}
          />
          <label htmlFor="Giver">Giver</label>
        </span>

        <span className="flex gap-2">
          <input
            type="radio"
            id="recipient"
            name="recipient"
            value="recipient"
            className="radio_button"
            checked={props.role === "recipient"}
            onChange={selectOption}
          />
          <label htmlFor="Recipient">Recipient</label>
        </span>
      </div>
    </span>
  );
};

export default RadioButtons;
