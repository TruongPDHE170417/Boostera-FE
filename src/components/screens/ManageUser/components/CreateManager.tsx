import { Input } from "@nextui-org/react";
import React from "react";

const CreateManager = () => {
    return (
        <div className="py-24 md:px-12 lg:px-16 xl:px-80 w-screen bg-theme">
            <Input
            isRequired
            type="email"
            label="Email"
            className="max-w-xs"
            />
            <Input
                isRequired
                type="text"
                label="Name"
                className="max-w-xs"
            />
        </div>
    );
}
export default CreateManager;