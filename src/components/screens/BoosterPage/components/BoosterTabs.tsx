import { Tab, Tabs} from "@nextui-org/react";
import React from "react";

export default function App() {
    const tabList = ['Activity', 'Customer Feedback', 'Finished Boosts', 'Max Rank Achived', 'Alphabetical'];

    return (
        <div className="flex w-full flex-col pb-5">
            <Tabs aria-label="Options" className="place-content-end" color="danger" size="lg">
                tablist={tabList.map((tab, index) => (
                    <Tab key={index} title={tab} />
                ))}
            </Tabs>
        </div>
    );
}
