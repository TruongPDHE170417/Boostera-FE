import { Tab, Tabs} from "@nextui-org/react";
import React from "react";

export default function App() {
    return (
        <div className="flex w-full flex-col pb-5">
            <Tabs aria-label="Options" className="place-content-end" color="danger">
                <Tab key="photos" title="Photos">
                </Tab>
                <Tab key="music" title="Music">
                </Tab>
                <Tab key="videos" title="Videos">
                </Tab>
            </Tabs>
        </div>
    );
}
