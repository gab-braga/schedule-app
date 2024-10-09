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

async function findByCondition(local, field, value, order, sort = "asc") {
  const docs = [];
  const querySnapshot = await getDocs(
    query(
      collection(db, local),
      where(field, "==", value),
      orderBy(order, sort)
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

async function findBetween(local, field, start, end, order, sort = "asc") {
  const docs = [];
  const querySnapshot = await getDocs(
    query(
      collection(db, local),
      where(field, ">=", start),
      where(field, "<=", end),
      orderBy(order, sort)
    )
  );
  querySnapshot.forEach(doc => {
    const data = {
      id: doc.id,
      ...doc.data(),
    }
    docs.push(data);
  });
}

async function deleteById(local, id) {
  const docRef = doc(db, local, id);
  const docSnap = await deleteDoc(docRef);
}

async function updateById(local, id, data) {
  const docRef = doc(db, local, id);
  const docSnap = await updateDoc(docRef, data);
}

export { create, findByCondition, findBetween, deleteById, updateById };
