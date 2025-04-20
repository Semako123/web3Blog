import db from "../../../db/firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { blogMetadata } from "@/app/types";

const uploadMetadata = async (metadata: blogMetadata) => {
  const ref = await addDoc(collection(db, "metadata"), metadata);
  console.log("new metadata added at", ref);
};

const getMetadata = async () => {
  const querySnapshot = await getDocs(collection(db, "metadata"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
};

export { getMetadata, uploadMetadata };
