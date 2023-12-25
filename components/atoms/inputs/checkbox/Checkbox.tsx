import CheckboxSelected from "@/components/svg/checkbox/selected/CheckboxSelected";
import CheckboxUnselected from "@/components/svg/checkbox/unselected/CheckboxUnselected";
import {cn} from "@/utils/cn";

type CheckboxProps = {
    isSelected: boolean,
    setSelected: (isSelected: boolean) => void,
    className ?: string
}

const Checkbox = ({isSelected, setSelected, className}: CheckboxProps) => {
    return (
        <div className={cn(className, "hover:cursor-pointer")} onClick={() => setSelected(!isSelected)}>
            {
                isSelected ? <CheckboxSelected/>
                    : <CheckboxUnselected/>
            }
        </div>
    );
};

export default Checkbox;
