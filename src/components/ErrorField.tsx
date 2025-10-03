
const ErrorFields = (props: { messages: string[]}) => {
    return (
    <>
        {props.messages.map((message, index) => <span className="text-red-400 text-left text-sm" key={index}>{message}</span>)}
    </>)
}

export default ErrorFields;