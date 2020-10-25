import Link from "next/link";

export default function NavLink(props) {
    return (<Link  {...props}>
        <a onClick={props.onClick}
        > {props.title ? props.title : props.children}</a>
    </Link>)
}