import ContentComponent from "./contentComponent";
import FriendComponent from "./friendComponent";
import UpperComponent from "./upperComponent";

export default function MainComponent() {
    return (
        <>
            <UpperComponent />
            <ContentComponent />
            <FriendComponent />
        </>
    );
}