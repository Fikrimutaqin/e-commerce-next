export type CheckboxType = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value?: any; 
    checked?: boolean;
    label?: string;
}