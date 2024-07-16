import { updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import {FoundRecord} from "@/types/record";
import {getAuth} from "firebase/auth";
import {createRecordReference} from "@/databaseService/auth";

const auth = getAuth();
async function addNewRecord(record: FoundRecord) {
    try {
        await updateDoc(createRecordReference(), { records: arrayUnion(record) });
    } catch (e) {
        console.log(e)
    }
}

async function getAllRecord(): Promise<FoundRecord[]>{

    try {
        const docSnap = await getDoc(createRecordReference());
        if (docSnap.exists()) return docSnap.data().recordsList;
        else return []
    } catch (e) {
        console.log(e)
        return []
    }
}

export { addNewRecord, getAllRecord };
