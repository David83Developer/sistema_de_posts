import './ComponentsStyle.css'

function Textarea({name, text, onChange, value}) {
    return ( 
        <>
        <label>{text}</label>
        <textarea name={name} onChange={onChange} value={value} >

        </textarea>
        </>
     );
}

export default Textarea;