export function EnterGame({onEnterGame}) {



return (
    <form onSubmit={(e) => {
        e.preventDefault()
        console.log(e.target.elements)
    }}>
        <input name="username" />
        <input type="radio" name="connection" value="randon" />
        <input type="radio" name="connection" value="create" />
        <input type="radio" name="connection" value="join" />
        <button>Login</button>
    </form>
 )
}