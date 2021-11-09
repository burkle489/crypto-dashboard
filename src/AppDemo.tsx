import React, { useState, useEffect } from 'react';
// import './App.css';
// import { API } from 'aws-amplify';
// import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
// import { getPortfolioAsset } from './graphql/queries';
// import { createPortfolioAsset as createPortfolioAssetMutation, deletePortfolioAsset as deletePortfolioAssetMutation } from './graphql/mutations';

// const initialFormState = { name: '', description: '' }

// function App() {
//     const [notes, setNotes] = useState([]);
//     const [formData, setFormData] = useState(initialFormState);

//     useEffect(() => {
//         fetchNotes();
//     }, []);

//     async function fetchNotes() {
//         const apiData = await API.graphql({ query: getPortfolioAsset });
//         console.log({ apiData })
//         // setNotes(apiData.data.getPortfolioAsset.items);
//     }

//     async function createNote() {
//         if (!formData.name || !formData.description) return;
//         await API.graphql({ query: createPortfolioAssetMutation, variables: { input: formData } });
//         // setNotes([...notes, formData]);
//         // setFormData(initialFormState);
//     }

//     async function deleteNote({ id }) {
//         // const newNotesArray = notes.filter(note => note.id !== id);
//         // setNotes(newNotesArray);
//         // await API.graphql({ query: deletePortfolioAssetMutation, variables: { input: { id } } });
//     }

//     return (
//         <div className="App">
//             <h1>My Notes App</h1>
//             <input
//                 onChange={e => setFormData({ ...formData, 'name': e.target.value })}
//                 placeholder="Note name"
//                 value={formData.name}
//             />
//             <input
//                 onChange={e => setFormData({ ...formData, 'description': e.target.value })}
//                 placeholder="Note description"
//                 value={formData.description}
//             />
//             <button onClick={createNote}>Create Note</button>
//             <div style={{ marginBottom: 30 }}>
//                 {
//                     // notes.map(note => (
//                     //     <div key={note.id || note.name}>
//                     //         <h2>{note.name}</h2>
//                     //         <p>{note.description}</p>
//                     //         <button onClick={() => deleteNote(note)}>Delete note</button>
//                     //     </div>
//                     // ))
//                 }
//             </div>
//             <AmplifySignOut />
//         </div>
//     );
// }

export const AppDemo = () => {
    return <div></div>
}
// export default withAuthenticator(App);