import {Box, Heading} from "grommet";
import {AddButton} from "../controls/AddButton";
import {TrashButton} from "../controls/TrashButton";
import {Dispatch, SetStateAction, useState} from "react";
import {AddContainerFormModal} from "./AddContainerFormModal";
import {ListContainer} from "./ListContainer";
import {Container} from "../../common/types";

type ContainersSectionProps = {
    containers: Array<Container>
    setContainers: Dispatch<SetStateAction<Array<Container>>>
}

// TODO - Type interface for container

export const ContainersSection = ({ containers, setContainers }: ContainersSectionProps) => {
    const [showModal, setShowModal] = useState<boolean>(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    return (
        <Box
            fill="horizontal"
            background={{light: "light-4", dark: "dark-1"}}
            round="small"
            pad={{horizontal: "small", vertical: "small"}}
            margin={{bottom: "small"}}
        >
            <Box
                direction="row"
                justify="between"
                align="center"
            >
                <Heading level="3" size="small" margin={{vertical: "none", left: "small"}}>
                    {(containers.length > 0) ? `Containers (${containers.length})` : "Containers"}
                </Heading>
                <Box direction="row">
                    <AddButton handleOnClick={openModal} />
                    <TrashButton tip="Remove all" margin={{ left: "small" }} />
                </Box>
            </Box>
            <Box direction="column" pad="small" gap="small">
                {containers.map((container, index) => <ListContainer key={index} index={index} container={container}/>)}
            </Box>
            {showModal && <AddContainerFormModal closeModal={closeModal} containers={containers} setContainers={setContainers}/>}
        </Box>
    );
};