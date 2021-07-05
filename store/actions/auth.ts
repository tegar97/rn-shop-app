export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'
export const signup = (email :string,password :string) => {
    return async (dispatch :any) => {
       await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDaLFxnKsK9Tk1SkgCvX9rdOdOUxUdTqlc`,{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password : password,
                returnSecureToken: true
            })

           
        }).catch(err => {
            console.log(err)
        })
        // console.log(response)

        // if(!response.ok) {
        //     throw new Error('Something went wrong!')
        // }
        dispatch({type: SIGNUP})
    }
}
export const login = (email :string,password :string) => {
    return async (dispatch :any) => {
       const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDaLFxnKsK9Tk1SkgCvX9rdOdOUxUdTqlc`,{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password : password,
                returnSecureToken: true
            })

           
        })

        const resData= await response.json()

        if(!response.ok) {
            throw new Error('Something went wrong!')
        }
        console.log(resData)
        dispatch({type: LOGIN})
    }
}