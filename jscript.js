//Starting at Section 16 #127 Firebase and Firestore database tutorials
//#127. NoSQL Databases
//#128. Firebase & Firestore
//#129. Connecting to Firestore
//#130. Getting Collections
// #131. Saving Documents
//#132. Deleting Documents
// #133. Real-time Listeners

const list= document.querySelector('ul');
const form= document.querySelector('form');

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

    

db1.collection('small stories').get().then((snapshot) => {
    //when data returned from db1 - the promise -
    //console.log(snapshot.docs[0].data());     //gets one doc
    snapshot.docs.forEach(doc => {
        //console.log(doc.data());
        //console.log(doc.id);
        addStory(doc.data(), doc.id);
    });
}).catch((err) => {
    console.log(err)
});

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