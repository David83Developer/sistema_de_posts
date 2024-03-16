
import './LayoutsStyle.css'

import EditPost from './EditPost';

import {VscThumbsup, VscThumbsdown, VscComment, VscThumbsupFilled, VscThumbsdownFilled } from 'react-icons/vsc'
import {FaEdit, FaTrash} from 'react-icons/fa'

import { useContext, useEffect, useState } from "react";
import { AuthContext } from '../contexts/AuthUser';
import Coments from './Coments';


function Posts() {

    const {posts} = useContext(AuthContext)

    const {user_post} = useContext(AuthContext)
    const {idUser} = useContext(AuthContext)

    const [postsUpdate, setPostsUpdate] = useState(posts);

    const [name_post, setPostTitulo] = useState('');
    const [content, setPostContent] = useState('');
    const [idPost, setIdPost] = useState(1);
    const [idComents, setIdComents] = useState();

    const [userComent, setUserComent] = useState('');
    const [nameComent, setNameComent] = useState('');
    const [numberComents, setNumberComents] = useState(0);
    const [likeAtual, setLikeAtual] = useState(0);
    const [dislikeAtual, setDislikeAtual] = useState(0);

    const [arrayLiked, setArrayLiked] = useState([]);
    const [changeContChange, setChangeContChange] = useState();

    const [arrayDisliked, setArrayDisliked] = useState([]);

    useEffect(() => {

        fetch("http://localhost:8800/post",{
                method:"GET",
            })
            .then((res)=>res.json())
            .then((data)=>{
                setPostsUpdate(data)
            })
            .catch((err)=> console.log(err))
    }, [posts]);

    const deletePost = (id) => {
        fetch(`http://localhost:8800/post/${id}`,{
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            }
        })
        .then((res) => res.json())
        .catch((err)=> console.log(err))

        let idDeleteLikeds = {
            cod_post: id
        }

        fetch(`http://localhost:8800/alllikes`,{
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(idDeleteLikeds)
        })
        .then((res) => res.json())
        .catch((err)=> console.log(err))

        let idDeleteDislikeds = {
            cod_post: id
        }

        fetch(`http://localhost:8800/alldislikes`,{
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(idDeleteDislikeds)
        })
        .then((res) => res.json())
        .catch((err)=> console.log(err))

        let idDeleteComents = {
            id_post: id
        }

        fetch(`http://localhost:8800/allcoments`,{
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(idDeleteComents)
        })
        .then((res) => res.json())
        .catch((err)=> console.log(err))



    }

    const openEditPost = () => {
        let edtiPostOpen = document.querySelector(".editPost")
        edtiPostOpen.style.display = 'flex';
    }


//----------------------------------------------  SET LIKES  ------------------------------------------------------------------------//


    const addLike = (id, currentLike, currentDislike, currentNumComents) => {

        const likesNow = {
            likes:  Number(currentLike)+1,
            dislikes:  Number(currentDislike),
            numberComents:  Number(currentNumComents)
        }

        fetch(`http://localhost:8800/post/${id}`,{
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(likesNow)
        })
        .then((res) => res.json())
        .catch((err)=> console.log(err))
    }

    const setLikeInTable = (idpostliked) => {

        let newLiked = {
            cod_user: idUser,
            cod_post: idpostliked
        }

        fetch("http://localhost:8800/setliked",{
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(newLiked)
        })
        .then((res)=> res.json())
        .catch((err)=> console.log(err))
    }

    useEffect(() => {
        fetch("http://localhost:8800/setliked",{
            method: "GET"
        })
        .then((res)=> res.json())
        .then((data) => setArrayLiked(data))
        
        .catch((err) => console.log(err))
    }, [changeContChange, postsUpdate])

    const removeLike = (id, currentLike, currentDislike, currentNumComents) => {

        const likesNow = {
            likes:  Number(currentLike)-1,
            dislikes:  Number(currentDislike),
            numberComents:  Number(currentNumComents)

        }

        fetch(`http://localhost:8800/post/${id}`,{
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(likesNow)
        })
        .then((res) => res.json())
        .catch((err)=> console.log(err))
    }

    const removeLikeInTable = (userId, postId) => {

        const newRemoveLike = {
            cod_user: userId,
            cod_post: postId
        }

        fetch("http://localhost:8800/setliked",{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newRemoveLike)
        })
        .then((res)=> res.json())
        .catch((err)=> console.log(err))
        
    } 

    //----------------------------------------------  SET DISLIKES  ------------------------------------------------------------------------//


    const addDislike = (id, currentLike, currentDislike, currentNumComents) => {

        const dislikesNow = {
            likes:  Number(currentLike),
            dislikes:  Number(currentDislike)+1,
            numberComents:  Number(currentNumComents)
        }

        fetch(`http://localhost:8800/post/${id}`,{
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(dislikesNow)
        })
        .then((res) => res.json())
        .catch((err)=> console.log(err))
    }

    const setDislikeInTable = (idpostdisliked) => {

        let newDisliked = {
            cod_user: idUser,
            cod_post: idpostdisliked
        }

        fetch("http://localhost:8800/setdisliked",{
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(newDisliked)
        })
        .then((res)=> res.json())
        .catch((err)=> console.log(err))
    }

    useEffect(() => {
        fetch("http://localhost:8800/setdisliked",{
            method: "GET"
        })
        .then((res)=> res.json())
        .then((data) => setArrayDisliked(data))
        
        .catch((err) => console.log(err))
    }, [changeContChange, postsUpdate])

    const removeDislike = (id, currentLike, currentDislike, currentNumComents) => {

        const dislikesNow = {
            likes:  Number(currentLike),
            dislikes:  Number(currentDislike)-1,
            numberComents:  Number(currentNumComents)

        }

        fetch(`http://localhost:8800/post/${id}`,{
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(dislikesNow)
        })
        .then((res) => res.json())
        .catch((err)=> console.log(err))
    }

    const removeDislikeInTable = (userId, postId) => {

        const newRemoveLike = {
            cod_user: userId,
            cod_post: postId
        }

        fetch("http://localhost:8800/setdisliked",{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newRemoveLike)
        })
        .then((res)=> res.json())
        .catch((err)=> console.log(err))
        
    } 



    const showComents = () => {
        const coments = document.querySelector('.coments')
        coments.style.display = 'flex';
    }


    

    return (
        <>
            <EditPost name_postEdit={name_post} contentEdit={content} idPost={idPost}/>

            {
            
            postsUpdate.map((post)=> (
            
                
                
            <div className="posts" key={post.id}>
                <p className="user-post">{post.user_post} </p>
                <div className="org-name-data">
                <p className="name-post">{post.name_post} <label className='edited'>{post.edited}</label></p>
                <p className='data-post'>{post.data_post}</p>
                </div>
                <div className="post-content">
                    <p>{post.content}</p>
                </div>
                <div className="optionsPost">
                  
                    <p>{post.likes}</p>{ 
                    
                        
                    arrayLiked.some((item)=> item.cod_post === post.id && item.cod_user === idUser)? 
                    <VscThumbsupFilled onClick={()=> {removeLike(post.id, post.likes, post.dislikes, post.numberComents), 
                        removeLikeInTable(idUser, post.id), 
                        setChangeContChange(0)}}/>:
                    <VscThumbsup onClick={()=> 
                        {addLike(post.id, post.likes, post.dislikes, post.numberComents),
                        setLikeInTable(post.id), 
                        removeDislikeInTable(idUser, post.id),
                        arrayDisliked.some((item)=> item.cod_post === post.id && item.cod_user === idUser)&&
                            removeDislike(post.id, post.likes+1 , post.dislikes, post.numberComents)
                        setChangeContChange(1)}}/> 
                      
                      }

                


                    <p>{post.dislikes}</p>{ 
                    
                    arrayDisliked.some((item)=> item.cod_post === post.id && item.cod_user === idUser)?
                    <VscThumbsdownFilled onClick={()=> {removeDislike(post.id, post.likes, post.dislikes, post.numberComents), 
                        removeDislikeInTable(idUser, post.id), 
                        setChangeContChange(2)}}/>:
                    <VscThumbsdown  onClick={()=> 
                        {addDislike(post.id, post.likes, post.dislikes, post.numberComents),
                        setDislikeInTable(post.id), 
                        removeLikeInTable(idUser, post.id),
                            arrayLiked.some((item)=> item.cod_post === post.id && item.cod_user === idUser)&&
                            removeLike(post.id, post.likes, post.dislikes+1, post.numberComents)
                         setChangeContChange(3)}}/>



                    }
                    <p>{post.numberComents}</p><VscComment onClick={()=> {showComents(),
                        setIdComents(post.id), 
                        setUserComent(post.user_post), 
                        setNameComent(post.name_post),
                        setNumberComents(post.numberComents),
                        setLikeAtual(post.likes),
                        setDislikeAtual(post.dislikes)
                        }} />
                    <div className="deleteAndEdit">
                    {post.user_post === user_post && <FaEdit onClick={()=> { openEditPost(), 
                        setPostTitulo(post.name_post), 
                        setPostContent(post.content),
                        setIdPost(post.id)
                        }}/>}
                    {post.user_post === user_post && <FaTrash onClick={() => {deletePost(post.id)}}/>}
                    <Coments 
                    likesPrev={likeAtual}
                    dislikesPrev={dislikeAtual}
                    userPost={userComent} 
                    namePost={nameComent}
                    idPostNow = {idComents}
                    />
                    </div>
                    
                </div>
                
            </div>
            
            ))
            
            }

            
            
        </> 
     );
}

export default Posts;