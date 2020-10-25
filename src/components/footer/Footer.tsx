import DesktopFooter from "@components/footer/DesktopFooter";
import MobileFooter from "@components/footer/MobileFooter";

export default function Footer({ data }) {

    return (
        <footer className="eb-footer footer">
            <DesktopFooter data={data} />
            <MobileFooter />
        </footer >
    )
}


