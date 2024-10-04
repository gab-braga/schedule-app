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
} from 'firebase/firestore';
import app from './config';

const db = getFirestore(app);

async function create(local, data) {
  try {
    await addDoc(collection(db, local), data);
  } catch (err) {
    console.error(err);
    throw new Error(`Algo de errado em salvar na coleção ${local}.`);
  }
}

async function findAll(userId, local, order) {
  const docs = [];
  const querySnapshot = await getDocs(
    query(
      collection(db, local),
      where("userId", "==", userId),
      orderBy(order, 'desc')
    ),
  );
  querySnapshot.forEach((doc) => {
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

export { create, findAll, deleteById, updateById };
