import React from "react";
import { Tab, Tabs} from "@nextui-org/react";

const TAB_LIST = ['Activity', 'Customer Feedback', 'Finished Boosts', 'Max Rank Achived', 'Alphabetical'];

export default function App() {

    return (
        <div className="flex w-full flex-col pb-5">
            <Tabs aria-label="Options" className="place-content-end" color="danger" size="lg">
                tablist={TAB_LIST.map((tab, index) => (
                    <Tab key={index} title={tab} />
                ))}
            </Tabs>
        </div>
    );
}
