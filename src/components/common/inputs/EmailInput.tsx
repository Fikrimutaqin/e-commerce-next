import { propsEmailInput } from "@/types/EmailType";

export default function EmailInput({ onChange, placeholder, disabled, value }: propsEmailInput) {
    return (
        <input 
            className="border border-gray rounded-xl px-4 py-2 placeholder:text-sm text-sm w-72 h-[48px] outline-primary" 
            type="email" 
            placeholder={placeholder} 
            onChange={onChange} 
            disabled={disabled} 
            value={value}
        />
    )
}