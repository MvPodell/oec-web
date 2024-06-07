import styles from '@/app/dashboard/dashboard.module.scss';
import {CorkBoard} from '../ui/dashboard/CorkBoard';
import { getPlaiceholder } from "plaiceholder";
import { getEventList } from '@/config/firestore';


export interface Event {
    date: string;
    description: string;
    id: string;
    imageURL: string;
    key: string;
    location: string;
    title: string;
};

export default async function Page() {
    const currentDate = new Date();
    const eventData = await getEventList();
    const firstEventImageURL = eventData
                .filter(event => new Date(event.date) >= currentDate)
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0].imageURL;
    const buffer = await fetch(firstEventImageURL).then(async (res) => {
        return Buffer.from(await res.arrayBuffer());
    });

    const { base64 } = await getPlaiceholder(buffer);

    return (

        <div>
            <div className={styles.dashBody}>
                {base64 && <CorkBoard blurredImg={base64} />}
            </div>
            <div></div>
        </div>
    );
}