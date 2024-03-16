import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthUser';

import './LayoutsStyle.css'

import Button from '../components/Button';
import Textarea from '../components/Textarea';
import Input from '../components/Input';

function EditPost({name_postEdit, contentEdit, idPost}) {

   


    const [namePost, setPostTitulo] = useState(null);
    const [contenT, setPostContent] = useState(null);


    const {user_post} = useContext(AuthContext)


    const closeEditPost = () => {
        let edtiPostOpen = document.querySelector(".editPost")
        edtiPostOpen.style.display = 'none';
    }

    const handleEditPost = () => {

        const edited = 'Editado'

        const name_post = !namePost ? name_postEdit : namePost
        const content = !contenT ? contentEdit : contenT

        let postEdited = {
            user_post,
            name_post,
            content,
            edited
        }

        fetch(`http://localhost:8800/post/${idPost}`,{
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(postEdited)
        })
        .then((res) => res.json())
        .catch((err)=> console.log(err))
    }

    return ( 
        <div className="editPost">
            <div className="contentNewPost">
            <form>
                <div className="headerPost">
                    <p>{user_post}</p>
                    <Input 
                    value={namePost ?? name_postEdit}
                    onChange={(e)=> {setPostTitulo(e.target.value)}}
                    placeholder='Título do assunto'
                    />
                </div>
                

                <Textarea 
                text='Assusto:'
                value={contenT ?? contentEdit}
                onChange={(e)=> setPostContent(e.target.value)}/>
                <div className="optButtonsNewPost">
                <Button 
              
                text='Editar'
                onClick={(e)=> {e.preventDefault(),
                    handleEditPost(), 
                    closeEditPost(),
                    setPostTitulo(null),
                setPostContent(null)
                }}
                />
                <Button
                text='Cancelar'
                onClick={(e)=> {e.preventDefault(), closeEditPost(), setPostTitulo(null), setPostContent(null)}}/>
                </div>
                
            </form>
            </div>
        </div>
     );
}

export default EditPost;