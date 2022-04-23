import {Button} from "grommet";
import {Add} from "grommet-icons";

type AddButtonProps = {
    handleOnClick: () => void
}

export const AddButton = ({ handleOnClick }: AddButtonProps) => {
    return <Button
        margin={{left: "small"}}
        style={{fontWeight: "600"}}
        plain={false}
        icon={<Add/>}
        onClick={handleOnClick}
    />;
}