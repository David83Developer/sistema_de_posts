
import Navbar from '../components/Navbar'
import './Home.css'

import Button from '../components/Button'
import Posts from '../layouts/Posts';
import NewPost from '../layouts/NewPost';
import Coments from '../layouts/Coments';

function Home() {

    const openNewPost = () => {
        let divOpen = document.querySelector('.newPost')
        divOpen.style.display = 'flex'
    }


    return ( 
        <>
        <Navbar>
           
        </Navbar>
        <div className="org-main">

        <div className="main">
            <Posts />
         </div>

        
        </div>
        

       


        <NewPost />
        


        <div className="optionsHome" id='btnHome'>


        <Button 
        text='Postar'
        onClick={()=> openNewPost()}
        />

        </div>
      
        </>
     );
}

export default Home;