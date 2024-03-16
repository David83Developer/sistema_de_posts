import { useState, createContext, useEffect } from "react";

export const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
    const [users, setUsers] = useState([]);
    const [userNow, setUserNow] = useState('');
    const [user_post, setNameUser] = useState('');
    const [idUser, setIdUser] = useState(null);

    const [posts, setPosts] = useState([]);

    

useEffect(() => {
    fetch("http://localhost:8800",{
        method: "GET",
    })
    .then((resp) => resp.json())
    .then((data)=>{
        setUsers(data)
    })
    .catch((err)=> console.log(err))
}, []);

function login(name, password){
        fetch("http://localhost:8800",{
            method: "GET",
        })
        .then((resp) => resp.json())
        .then((data)=>{
            setUsers(data)
        })
        .catch((err)=> console.log(err)) 

        const hasUser = users.filter((user)=> user.name === name)
        if(hasUser.length>0){
            if(hasUser[0].name === name && hasUser[0].password === password){
                setUserNow({name, password})
                setNameUser(name)
                setIdUser(hasUser[0].id)
                return
            }else{
                return "senha incorreta!"
            }
        }else{
            return 'usuário não cadastrado'
        } 
    }

    function register(name, email, ageDate, password){
        const hasUser = users.filter((user)=> user.name === name || user.email === email)
        if(hasUser.length>0){
            return "o nome ou o email já estão sendo utilizados"
        }

            let newUser = {name, email, ageDate, password}


            fetch('http://localhost:8800',{
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            })
            .then((res) => res.json())
            .then(()=> {
                setUsers(newUser)
            })
            .catch((err)=> console.log(err))


    }

    const signout = () => {
        setUserNow(false)
        setNameUser('')
    }



    //-----------------------------------------------------------------------------


    const getPosts = async () => {
        try{
            await fetch("http://localhost:8800/post",{
                method:"GET",
            })
            .then((res)=>res.json())
            .then((data)=>{
                setPosts(data)
            })
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        getPosts()
    }, [posts]);







    const addNewPost = (user_post, name_post, content) => {

        const data = new Date()

        const x = '0';
        const y = '';

        const secondPost = data.getSeconds()
        const minutePost = data.getMinutes()
        const hourPost = data.getHours()
        const dayPost = data.getDate()
        const monthPost = data.getMonth()
        const yearPost = data.getFullYear()

        const data_post = String(`${dayPost>9?y:x}${dayPost}/${monthPost>9?y:x}${monthPost+1}/${yearPost} ${hourPost>9?y:x}${hourPost}:${minutePost>9?y:x}${minutePost}:${secondPost>9?y:x}${secondPost}`)

        let newPost = {
            user_post,
            name_post,
            content,
            data_post
        };

        setPosts(newPost)

        fetch('http://localhost:8800/post',{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPost)
        })
        .then((resp)=> resp.json())
        .catch((err)=> console.log(err))
    }


    

    //-------------------------------------------------------



    return(
        <AuthContext.Provider value={{ login, 
        signout, 
        register, 
        posts, 
        addNewPost, 
        userNow, 
        user_post, 
        idUser,  
        signed: !!userNow}}>
            {children}
        </AuthContext.Provider>
    )

}