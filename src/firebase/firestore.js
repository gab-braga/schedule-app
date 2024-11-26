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
  writeBatch,
  getDoc,
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

async function createAll(local, data) {
  try {
    if (!Array.isArray(data)) {
      throw new Error('Os dados precisam ser uma lista de objetos.');
    }

    const batch = writeBatch(db);
    const collectionRef = collection(db, local);

    data.forEach(item => {
      const docRef = doc(collectionRef);
      batch.set(docRef, item);
    });

    return batch.commit();
  } catch (err) {
    console.error(err);
    throw new Error(`Algo deu errado ao salvar na coleção ${local}.`);
  }
}


async function find(local, id) {
  try {
    const docRef = doc(db, local, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error(`Documento não encontrado na coleção ${local}.`);
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
  } catch (err) {
    console.error(err);
    throw new Error(`Erro ao buscar documento: ${err.message}`);
  }
}



async function findByFilters(local, filters, order) {
  const results = [];

  try {
    const constraints = prepareConstraints(filters, order);

    const querySnapshot = await getDocs(
      query(
        collection(db, local),
        ...constraints,
      ),
    );

    querySnapshot.forEach(docSnap => {
      const data = {
        id: docSnap.id,
        ...docSnap.data(),
      };
      results.push(data);
    });
  } catch (err) {
    console.error(err);
    throw new Error(`Erro ao buscar documento: ${err.message}`);
  }

  return results;
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
  const constraints = prepareConstraints(filters);
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
  const constraints = prepareConstraints(filters);
  const querySnapshot = await getDocs(
    query(
      collection(db, local),
      ...constraints
    )
  );
  const updatePromises = querySnapshot.docs.map(doc => updateDoc(doc.ref, data));
  return await Promise.all(updatePromises);
}

function prepareConstraints(filters, order) {
  if (!Array.isArray(filters)) {
    throw new Error("Formato inválido dos filtros.");
  }

  const constraints = [
    ...filters.map(({ field, op, value }) => where(field, op, value)),
  ];

  if (order) {
    const { field, sort } = order;
    constraints.push(orderBy(field, sort));
  }

  return constraints;
}

export {
  create,
  createAll,
  find,
  findByFilters,
  deleteById,
  updateById,
  deleteByFilters,
  updateByFilters
};
