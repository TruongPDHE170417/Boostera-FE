import { Pagination } from "@nextui-org/react";
import React from "react";

export default function App() {

    return (
        <div className="grid place-content-center mt-10">
            <Pagination loop showControls color="danger" size="lg" total={5} initialPage={1} />
        </div>
    );
}
