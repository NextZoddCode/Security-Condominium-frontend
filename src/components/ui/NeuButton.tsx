import { ComponentProps } from "react";

interface NeuButtonProps extends ComponentProps<'button'> {
  children: React.ReactNode,
  type: 'submit' | 'reset' | 'button';
}

const NeuButton = ({
  children,
  type,
  ...rest
}: NeuButtonProps) => {
  return (
    <div className="bg-white mt-6 flex items-center justify-center lg:w-full">
      <button
        type={type}
        className="disabled:bg-violet-950 disabled:px-6 disabled:py-2 px-6 py-2 font-medium bg-violet-500 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] sm:w-1/2"
        {...rest}
      >
        {children}
      </button>
    </div>
  );
};

export default NeuButton;
