type Props = {
  children: React.ReactNode;
  closeModal: () => void;
};

const Modal = (props: Props) => {
  return (
    <div className="fixed top-0 left-0 flex items-center md:justify-center w-full h-full bg-black md:px-0 px-5 z-[1000] bg-modalblack">
      <div className="bg-white w-fit z-1 h-fit p-5 overflow-y-scroll rounded-[10px]">
        <button
          type="button"
          onClick={props.closeModal}
          className="text-red float-right text-base text-black hover:opacity:60"
        >
          close
          {/* <FaTimesCircle /> */}
        </button>

        <div className="mt-2 max-w-full">{props.children}</div>
      </div>
    </div>
  );
};

export default Modal;
