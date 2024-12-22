const SignUp = () => {
    //username, password, email
    const createUser = async () => {
    
    const signUpResponse = await fetch('http://127.0.0.1:5280/create-new-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            username: username, 
            password: password,
            email: email,

        })
    });
    }

    return (
        <>
        </>
    )
}

export default SignUp;