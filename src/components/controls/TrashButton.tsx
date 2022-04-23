import {Trash} from "grommet-icons";
import {Button} from "grommet";

type TrashButtonProps = {
    tip: string
    margin: object
}

export const TrashButton = ({ tip, margin }: TrashButtonProps) => {
    return (
        <Button
            icon={<Trash/>}
            plain={false}
            margin={margin}
            tip={tip}
        />
    );
};