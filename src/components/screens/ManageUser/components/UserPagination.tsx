import React, { useState } from "react";
import { Pagination } from "@nextui-org/react";

interface UserPaginationProps {
    total: number;
    onPageChange: (page: number) => void;
}

export default function UserPagination({ total, onPageChange }: UserPaginationProps) {

    return (
        <div className="grid place-content-center mt-10">
            <Pagination
                    loop
                    showControls
                    color="danger"
                    size="lg"
                    total={total}
                    initialPage={1}
                    onChange={onPageChange}
                    className="dark text-foreground"
                />
        </div>
    );
}
