import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  where,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import app from "./config";

const db = getFirestore(app);

async function create(local, data) {
  try {
    return await addDoc(collection(db, local), data);
  } catch (err) {
    console.error(err);
    throw new Error(`Algo de errado em salvar na coleção ${local}.`);
  }
}

async function findByConditions(local, filters, order) {
  const docs = [];

  const constraints = [
    ...filters.map(
      ({ field, op, value }) => {
        return where(field, op, value)
      }
    ),
    orderBy(order.field, order.sort)
  ];

  const querySnapshot = await getDocs(
    query(
      collection(db, local),
      ...constraints,
    ),
  );

  querySnapshot.forEach(doc => {
    const data = {
      id: doc.id,
      ...doc.data(),
    };
    docs.push(data);
  });
  
  return docs;
}

async function deleteById(local, id) {
  const docRef = doc(db, local, id);
  const docSnap = await deleteDoc(docRef);
}

async function updateById(local, id, data) {
  const docRef = doc(db, local, id);
  const docSnap = await updateDoc(docRef, data);
}

export { create, findByConditions, deleteById, updateById };
