import React from "react";
import { Pagination } from "@nextui-org/react";

export default function BoosterPagination() {

    return (
        <div className="grid place-content-center mt-10">
            <Pagination loop showControls color="danger" size="lg" total={5} initialPage={1} />
        </div>
    );
}
