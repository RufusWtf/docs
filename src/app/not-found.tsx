import { ReactElement } from "react";
import Image from "next/image";

/**
 * The not found page.
 *
 * @return the page jsx
 */
const NotFoundPage = (): ReactElement => (
    <main className="w-full pt-[25vh] min-h-screen flex justify-center select-none pointer-events-none">
        <div className="h-fit flex gap-10">
            {/* Image */}
            <Image
                src="/media/mike.png"
                alt="Mike Wazowski"
                width={128}
                height={128}
                draggable={false}
            />

            {/* Message */}
            <div className="flex flex-col gap-0.5">
                <h1 className="text-3xl font-bold">Wrong Door!</h1>
                <p className="max-w-72 text-lg opacity-75">
                    The documentation page you were looking for could not be
                    found.
                </p>
            </div>
        </div>
    </main>
);
export default NotFoundPage;
