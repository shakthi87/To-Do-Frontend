import { useEffect, useState } from 'react';
import axios from 'axios';
function Todo() {
    const [contents, setContents] = useState([]);
    const [newContent, setNewContent] = useState("");
    const [editContent, setEditContent] = useState("");
    const [editText, setEditText] = useState('');



    useEffect(() => {
        fetchContents();
    }, []);

    const fetchContents = async () => {
        try {
            const response = await axios.get("http://localhost:3001/todo/getAllContent")
            console.log('response', response)
            setContents(response.data.response);
        } catch (error) {
            console.log("error", error)
        }
    }

    const createContent = async () => {
        try {
            await axios.post('http://localhost:3001/todo/createContent', { content: newContent });
            setNewContent('');
            fetchContents();

        } catch (error) {
            console.log("error", error)
        }
    }
    const updateContent = async (contentId) => {
        try {
            await axios.put(`http://localhost:3001/todo/updateContent/${contentId}`, { content: editText });
            setEditContent(null);
            setEditText('');
            fetchContents();
        } catch (error) {
            console.log("error", error)
        }
    }

    const deleteContent = async (contentId) => {
        try {
            await axios.delete(`http://localhost:3001/todo/deleteContent/${contentId}`);
            fetchContents();
        } catch (error) {
            console.log("error", error)
        }
    }

    useEffect(() => {
        fetchContents();
    }, []);

    return (
        <div>
            <center>
                <h1><center>To-Do List Management</center></h1>

                <div><center>
                    <input
                        type="text"
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                    />
                    <button onClick={createContent}>Add Content</button>
                </center>
                </div>


                <ul>

                    {contents.map((item) => (
                        <li key={item._id}>
                            {editContent === item._id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                    />
                                    <button onClick={() => updateContent(item._id)}>Save</button>
                                    <button onClick={() => setEditContent(null)}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    {item.content}
                                    <button onClick={() => { setEditContent(item._id); setEditText(item.content); }}>Edit</button>
                                    <button onClick={() => deleteContent(item._id)}>Delete</button>
                                </>
                            )}
                        </li>
                    ))}

                </ul>
            </center>
        </div>
    );
}


export default Todo;