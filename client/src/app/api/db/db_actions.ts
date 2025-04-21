import db from "../../../db/firebase";
import { collection, query, where, getDocs, addDoc, doc, setDoc } from "firebase/firestore";
import { blogMetadata, blogSchema } from "@/app/types";

const uploadMetadata = async (blogData: blogSchema) => {
  const docRef =  doc(db, "blogs", blogData.id)
  await setDoc(docRef, blogData);
  console.log("new blog added at", docRef);
};

const getMetadata = async () => {
  const querySnapshot = await getDocs(collection(db, "metadata"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
};

export { getMetadata, uploadMetadata };
