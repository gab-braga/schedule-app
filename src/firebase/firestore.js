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
      ({ field, op, value }) => { return where(field, op, value) }
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
  return await deleteDoc(docRef);
}

async function updateById(local, id, data) {
  const docRef = doc(db, local, id);
  return await updateDoc(docRef, data);
}

async function deleteByFilters(local, filters) {
  const constraints = [
    ...filters.map(({ field, op, value }) => where(field, op, value))
  ];
  const querySnapshot = await getDocs(
    query(
      collection(db, local),
      ...constraints
    )
  );
  const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
  return await Promise.all(deletePromises);
}

async function updateByFilters(local, filters, data) {
  const constraints = [
    ...filters.map(({ field, op, value }) => where(field, op, value))
  ];
  const querySnapshot = await getDocs(
    query(
      collection(db, local),
      ...constraints
    )
  );
  const updatePromises = querySnapshot.docs.map(doc => updateDoc(doc.ref, data));
  return await Promise.all(updatePromises);
}

export {
  create,
  findByConditions,
  deleteById,
  updateById,
  deleteByFilters,
  updateByFilters
};
