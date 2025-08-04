

function Login(){
    return(
        <div className="parent">
            <form className="form" >
                <h1>Let's Do For Fit</h1>

                <input className="inp" type="email" placeholder="Enter Name" name="name"/>

                <input className="inp" type="password" placeholder="Enter Name" name="name"/>

                <button className="btn">Login</button>
                <p>Do You Have Account ? register</p>

            </form>
        </div>
    )
}

export default Login;