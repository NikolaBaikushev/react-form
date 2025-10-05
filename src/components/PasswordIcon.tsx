import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa6";
type PasswordIconProps = {
    show: boolean,
    toggle: () => void
}
const PasswordIcon = ({ show, toggle }: PasswordIconProps) => {
    return (
        <div
            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-600"
            onClick={toggle}>
            {show ? <FaEyeSlash /> : <FaEye />}
        </div>
    )
}
export default PasswordIcon;