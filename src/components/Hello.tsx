const Hello = ({ username }: { username: string }) => {
    return (<>
        <div>
            <h1>Welcome, <span className="text-lime-500">{username}</span>!</h1>
        </div>
    </>)
}

export default Hello;