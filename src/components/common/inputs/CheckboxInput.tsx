import { CheckboxType } from "@/types/checkboxType";

export default function CheckboxInput({ onChange, disabled, value, checked, label }: CheckboxType) {
    return (
        <>
            <div className="flex flex-row items-center gap-x-2 w-fit">
                <input 
                    onChange={onChange} 
                    value={typeof value === 'object' ? JSON.stringify(value) : (value ?? "")} 
                    checked={checked} 
                    disabled={disabled} 
                    className={`w-5 h-5 checked:bg-primary checked:bg-[url('/images/icons/icon-checklist.svg')] checked:bg-center checked:bg-no-repeat rounded-sm cursor-pointer appearance-none transition-all ${checked ? "border-primary border-2" : "border-secondary border-2"}`} 
                    type="checkbox" 
                />
                {label && (
                    <p className="text-base font-medium text-secondary">{label}</p>
                )}
            </div>
        </>
    )
}