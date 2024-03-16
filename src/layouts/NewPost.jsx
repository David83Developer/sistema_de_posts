import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthUser';

import Button from '../components/Button';
import Input from '../components/Input'
import Textarea from '../components/Textarea';

function NewPost() {


    const {user_post} = useContext(AuthContext)
    const {addNewPost} = useContext(AuthContext)

    const [name_post, setPostTitulo] = useState('');
    const [content, setPostContent] = useState('');


    const handlePost = () => {
        
            if(!name_post && !content){
                return alert('digite algo pelo menos!')
            }
    
            addNewPost(user_post, name_post, content)

    }

    const closePostOnSet = () => {
        let divOpen = document.querySelector('.newPost')
        divOpen.style.display = 'none';
    }



    return ( 
        <div className={`newPost`}>
            <div className="contentNewPost">
            <form>
                <div className="headerPost">
                    <p>{user_post}</p>
                    <Input 
                    value={name_post}
                    onChange={(e)=> {setPostTitulo(e.target.value)}}
                    placeholder='Título do assunto'
                    />
                </div>
                

                <Textarea 
                text='Assusto:'
                value={content} 
                onChange={(e)=> setPostContent(e.target.value)}/>

                <div className="optButtonsNewPost">
                <Button 
                text='Postar'
                onClick={(e)=> {e.preventDefault(),
                    handlePost(), 
                    setPostTitulo(''),
                    setPostContent(''),
                    scrollTo({top, behavior:"smooth"}),
                    closePostOnSet()
                }}
                />
                <Button
                text='Cancelar'
                onClick={(e)=> {e.preventDefault(), closePostOnSet(), setPostTitulo(''),
                setPostContent('')}}/>
                </div>
                
            </form>
            </div>
           
        </div>
     );
}

export default NewPost;