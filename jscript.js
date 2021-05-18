//Starting at Section 16 #127 Firebase and Firestore database tutorials
//#127. NoSQL Databases
//#128. Firebase & Firestore
//#129. Connecting to Firestore
//#130. Getting Collections
// #131. Saving Documents
//#132. Deleting Documents
// #133. Real-time Listeners
// #134. Unsubscribing

const list= document.querySelector('ul');
const form= document.querySelector('form');
const button= document.querySelector('button');

const addStory= (story, id) => {                    //now adding id for story deletion
    //console.log(story.created_at.toDate());
    let time= story.created_at.toDate();            //now using id below for story deletion
    let html= `
        <li data-id="${id}">           
        <div>${story.title}</div>
        <div>${time}</div>
        <button class= "btn btn-danger btn-sm my-2">delete</button> 
        </li>
    `;
       //console.log(html);
       list.innerHTML += html;
}
    
//get docs - #130 Getting Collections BUT one-time only. So remove and replace with all-time listener below #133
// db1.collection('small stories').get().then((snapshot) => {
//     //when data returned from db1 - the promise -
//     //console.log(snapshot.docs[0].data());     //gets one doc
//     snapshot.docs.forEach(doc => {
//         //console.log(doc.data());
//         //console.log(doc.id);
//         addStory(doc.data(), doc.id);
//     });
// }).catch((err) => {
//     console.log(err)
// });

        const deleteStory = (id) => {
            const stories= document.querySelectorAll('li');
            stories.forEach(story => {
                if(story.getAttribute('data-id') === id){
                    story.remove();
                }
            });
        }

// get docs #133. Real-time Listeners
const unsub = db1.collection('small stories').onSnapshot(snapshot => {   //add const unsub - #134. Unsubscribing
    //console.log(snapshot.docChanges());       //cleared for next step to show add or remove doc
    snapshot.docChanges().forEach(change => {
        //console.log(change);  //this only gets the object not the doc
        const doc= change.doc;      
        //console.log(doc);       //gets the doc
        if(change.type === 'added'){
            addStory(doc.data(), doc.id);
        }else if(change.type === 'removed'){       //see above for remove funtion
            deleteStory(doc.id);
        }
    });
});
    //unsub()


//add documents as #131. Saving Documents
    form.addEventListener('submit', e => {
        e.preventDefault();
        const now= new Date();
        const story= {
            title:form.story.value,
            created_at:firebase.firestore.Timestamp.fromDate(now)
        };
            db1.collection('small stories').add(story).then(() => {      //returns a  promise 
                console.log('story added');
            }).catch(err => {
                console.log(err);
            });                    
    });

    //deleting data as per #132. Deleting Documents
    list.addEventListener('click', e => {
        //console.log(e);
        if(e.target.tagName === 'BUTTON'){
            const id = e.target.parentElement.getAttribute('data-id');
            //console.log(id);
            db1.collection('small stories').doc(id).delete().then(() => {
                console.log('story deleted');

            });
        }
    });

    //unsub from db1 changes - #134. Unsubscribing
        button.addEventListener('click', () => {
            unsub();
            console.log('unsubscribed from collection changes');
        });