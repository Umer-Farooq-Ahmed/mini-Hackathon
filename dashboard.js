// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore , setDoc , doc ,collection ,getDocs,addDoc ,query,where,getDoc,updateDoc,deleteDoc} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCPGhV4qv9JT_srSz8JBrJauSoPQEsm_GQ",
    authDomain: "my-todo-65dc4.firebaseapp.com",
    projectId: "my-todo-65dc4",
    storageBucket: "my-todo-65dc4.appspot.com",
    messagingSenderId: "1021739358446",
    appId: "1:1021739358446:web:75aef1d0517923624afbff"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

const addButton = document.querySelector("#add");
addButton.addEventListener("click", addUserData);

async function addUserData(e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const text = document.getElementById("text").value;

    if (!title || !text) {
        alert("Please fill both fields");
        return;
    }

    const user = auth.currentUser; // Retrieve the currently logged-in user
    if (!user) {
        alert("User not authenticated");
        return;
    }

    const userUid = user.uid; // Retrieve the user UID

    try {
        const docRef = await addDoc(collection(db, "blogs"), {
            title: title,
            text: text,
            userUid: userUid // Include the user UID
        });

        console.log("Document written with ID: ", docRef.id);
        alert("User data added successfully!");
    } catch (error) {
        console.error("Error adding document: ", error);
        alert("An error occurred while adding user data.");
    }
}



const cardContainer = document.getElementById("cardContainer");
window.addEventListener("load", fetchAndDisplayData);
const userUid = localStorage.getItem("userUid");
console.log(userUid, "useruid");

async function fetchAndDisplayData() {
    // ... Previous code ...
    if (!userUid) {
        console.log("User UID not available.");
        return;
    }
    const userDocRef = doc(db, "users", userUid); // Replace "users" with your collection name
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            const userName = userData.firstName; // Replace "name" with the actual field name in your collection
            const userlName = userData.lastName;
            welcomeMessage.textContent = `${userName + userlName}`; // Display personalized welcome message
        } else {
            console.log("User data not found.");
        }

    const itemsCollection = collection(db, "blogs"); // Replace "blogs" with your collection name

       const querySnapshot = await getDocs(
        query(itemsCollection, where("userUid", "==", userUid)) // Filter based on userUid
    );
    querySnapshot.forEach((doc) => {
                const itemData = doc.data();
        
        // Create a card element
        const card = document.createElement("div");
        card.classList.add("card"); // Apply your card styling here

        // Populate the card with data
        const title = document.createElement("h2");
        title.textContent = itemData.title;

        const description = document.createElement("p");
        description.textContent = itemData.text;

        // Create delete and edit buttons
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteCard(doc.id)); // Call deleteCard function

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => editCard(doc.id, itemData.title, itemData.text)); // Call editCard function

        // Append title, description, delete button, and edit button to the card
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(deleteButton);
        card.appendChild(editButton);

        // Append the card to the container
        cardContainer.appendChild(card);
    });
}

async function deleteCard(cardId) {
    try {
        await deleteDoc(doc(db, "blogs", cardId));
        console.log(" deleted successfully");
        alert("deleted successfully")
    } catch (error) {
        console.error("Error deleting document: ", error);
        alert("An error occurred while deleting the document.");
    }

    // Refresh the card display after deletion
    await fetchAndDisplayData();
}

async function editCard(cardId, currentTitle, currentText) {
    // Assuming you have input fields for editing
    const newTitle = prompt("Enter new title:", currentTitle);
    const newText = prompt("Enter new text:", currentText);

    if (!newTitle || !newText) {
        alert("Please fill both fields.");
        return;
    }

    try {
        await updateDoc(doc(db, "blogs", cardId), {
            title: newTitle,
            text: newText,
        });
        console.log("Document updated successfully");
    } catch (error) {
        console.error("Error updating document: ", error);
        alert("An error occurred while updating the document.");
    }

    // Refresh the card display after editing
    fetchAndDisplayData();
}

// ... Rest of your code ...