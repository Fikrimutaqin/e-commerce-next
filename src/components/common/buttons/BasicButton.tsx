import { propsBasicButton } from "@/types/basicButtonType"

export default function BasicButton({ onClick, disabled, children, className, type }: propsBasicButton) {
    return (
        <button
            className={`bg-primary text-white hover:bg-hover-primary transition-all border border-primary rounded-xl px-4 py-2 placeholder:text-sm text-sm w-full lg:w-auto h-[48px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary ${className}`}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}