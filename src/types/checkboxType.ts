export type CheckboxType = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    value?: string | number | Record<string, unknown>;
    checked?: boolean;
    label?: string;
}