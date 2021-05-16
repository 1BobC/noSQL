//Starting at Section 16 #127 Firebase and Firestore database tutorials
//#127. NoSQL Databases
//#128. Firebase & Firestore
//#129. Connecting to Firestore
//#130. Getting Collections

const list= document.querySelector('ul');

const addStory= (story) => {
    //console.log(story.created_at.toDate());
    let time= story.created_at.toDate();
    let html= `
        <li>
        <div>${story.title}</div>
        <div>${time}</div>
        </li>
    `;
       //console.log(html);
       list.innerHTML += html;
}

    

db1.collection('small stories').get().then((snapshot) => {
    //when data returned from db1 - the promise -
    //console.log(snapshot.docs[0].data());     //gets one doc
    snapshot.docs.forEach(doc => {
        console.log(doc.data());
        addStory(doc.data());
    });
}).catch((err) => {
    console.log(err)
});