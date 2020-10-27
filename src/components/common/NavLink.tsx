import Link from "next/link";

export default function NavLink(props) {
    return (<Link  {...props} >
        <a onClick={props.onClick}
            className={props.className}
            style={props.style}
        > {props.title ? props.title : props.children}</a>
    </Link>)
}