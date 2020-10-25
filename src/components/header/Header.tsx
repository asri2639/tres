import DesktopHeader from "@components/header/DesktopHeader";
import MobileHeader from "@components/header/MobileHeader";

export default function Header({ data }) {
    return (
        <>
            <DesktopHeader data={data} />
            <MobileHeader data={data} />
        </>)
}

