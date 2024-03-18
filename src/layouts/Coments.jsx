import Textarea from '../components/Textarea';
import './LayoutsStyle.css'

import {FaArrowRight, FaTrash} from 'react-icons/fa'

import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthUser';



function Coments({userPost, namePost, idPostNow, ChangeCont}) {

    const [allComents, setAllComents] = useState([]);
    const [textComent, setTextComent] = useState('');
    const [comentsFiltered, setComentsFiltered] = useState([]);
    const [comentCont, setComentCont] = useState(1);
    const [contNumCom, setContNumCom] = useState(0); 

    const [currentLikes, setCurrentLikes] = useState(0);
    const [currentDislikes, setCurrentDisikes] = useState(0);

    const {user_post} = useContext(AuthContext)

    useEffect(() => {

        

            fetch(`http://localhost:8800/coments`,{
                method:"GET"
            })
            .then((res)=> res.json())
            .then((data)=> {
                setAllComents(data)
            })
            .catch((err)=> console.log(err))
        
    }, [allComents]);


    useEffect(() => {
        fetch(`http://localhost:8800/post/`,{
            method: "GET",
            headers: {
                "Content-Type":"Application/json"
            }
        })
        .then((res)=> res.json())
        .then((data)=> {
            const newId = data.find((dataInfo)=>(dataInfo.id === idPostNow))
            setContNumCom(newId?.numberComents)
            setCurrentLikes(newId?.likes)
            setCurrentDisikes(newId?.dislikes)
            console.log(newId)
        })
        .catch((err)=> console.log(err))

    }, [idPostNow, comentCont, ChangeCont]);

     


    const submitComent = () => {

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


        let newComent = {
            user_post: user_post,
            content: textComent,
            data_post: data_post,
            id_post: idPostNow
        }

        fetch('http://localhost:8800/coments',{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newComent)
        })
        .then((res)=> res.json())
        .catch((err)=> console.log(err))

      

        setAllComents([...allComents, newComent])

        let newNumberComent = {
            likes: currentLikes,
            dislikes: currentDislikes,
            numberComents: contNumCom+1
        }


        fetch(`http://localhost:8800/post/${idPostNow}`,{
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newNumberComent)
        })
        .then((res) => res.json())
        .catch((err)=> console.log(err))
    }

    const coments = document.querySelector(".coments")
    const closeComents = () => {
        coments.style.display = "none";
    }

        const deleteComent = (id) => {
            fetch(`http://localhost:8800/coments/${id}`,{
                method: "DELETE",
                headers:{
                    "Content-Type": "application/json"
                }
            })
            .then((res) => res.json())
            .catch((err)=> console.log(err))

            setAllComents(allComents)

            let newNumberComent = {
                likes: currentLikes,
                dislikes: currentDislikes,
                numberComents: contNumCom-1
            }

            fetch(`http://localhost:8800/post/${idPostNow}`,{
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(newNumberComent)
            })
            .then((res) => res.json())
            .catch((err)=> console.log(err))
            
        }



    useEffect(() => {
        setComentsFiltered(allComents.filter((coment)=> coment.id_post === idPostNow))
    }, [allComents]);
    

    return ( 
        <div className="coments" >
            <div className="nav-coment">

                <div className="dados-post" >
                    <p className='user-data'>{userPost}</p>
                    <p>{namePost}</p>
                </div>
                
            <div className='close-coments' onClick={()=>closeComents()}>X</div>
            </div>
            <div className='show-coments'>
                
                {comentsFiltered.map((coment)=>(
                    <div key={coment.id}>
                        <div className="org-name-coment">
                            <p>{coment.user_post}</p>
                            <div className='config-list-date'>
                            <p>{coment.data_post}</p>
                            {coment.user_post === user_post &&
                            <>
                                <FaTrash onClick={()=> {setComentCont((prevComent)=> prevComent -1), deleteComent(coment.id)}}/>
                            </> }
                            </div>
                            
                        </div>
                    <div  className='coment'>{coment.content}</div>
                    </div>
                    
                ))}
            </div>


            <div className='submit-coment'>
                <Textarea onChange={(e)=> setTextComent(e.target.value)} value ={textComent}/>
                <div className="submit-coment-button" onClick={()=> {setComentCont((prevComent)=> prevComent +1),
                    submitComent(), 
                    setTextComent('') 
                    } }>
                    <FaArrowRight />
                </div>

            </div>
        </div>
     );
}

export default Coments;
