export type CheckboxType = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    value?: number;
    checked?: boolean;
    label?: string;
}