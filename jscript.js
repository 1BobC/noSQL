//Starting at Section 16 #127 Firebase and Firestore database tutorials
//#127. NoSQL Databases
//#128. Firebase & Firestore
//#129. Connecting to Firestore
//#130. Getting Collections

db1.collection('small stories').get().then((snapshot) => {
    //when data returned from db1
    console.log(snapshot.docs[0].data());
}).catch((err) => {
    console.log(err)
});