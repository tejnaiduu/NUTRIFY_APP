

function Register(){
    return(
        <div className="parent">
            <form className="form" >
                <h1>Let's Do For Fit</h1>

                <input className="inp" type="text" placeholder="Enter Name" name="name"/>

                <input className="inp" type="email" placeholder="Enter Name" name="name"/>

                <input className="inp" type="password" placeholder="Enter Name" name="name"/>

                <input className="inp" type="number" placeholder="Enter Name" name="name"/>

                <button className="btn">Rgister</button>
                <p>Alredy registered ? login</p>

            </form>
        </div>
    )
}

export default Register;