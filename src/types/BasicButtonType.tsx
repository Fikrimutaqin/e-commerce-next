export type propsBasicButton = {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    type: "button" | "submit" | "reset";
}