import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Batch({ batchJson }) {
    const router = useRouter();
    const openBatchPage = () => {
        alert("Explore page not found :(");
    }

    return (
        <div className="flex bg-zinc-50 dark:bg-zinc-800 dark:shadow-white/10 flex-col p-3 pb-0 rounded-md shadow-xl">
            <div className="rounded-md shadow-xl">
                <Image className="rounded-md" width={720} height={360} layout="responsive" src={`/api/image-proxy?imageUrl=${batchJson.previewImage.baseUrl}${batchJson.previewImage.key}`} alt={batchJson.name + " Thumbnail"} />
            </div>
            <div className="flex py-3 justify-between items-center my-auto">
                <div className="font-semibold text-xl m-2 w-fit">{batchJson.name}</div>
                <button className="font-poppins font-semibold p-2 px-5 bg-btn border-2 border-btn hover:border-[#1d11cc52] hover:bg-[#e2e0ff] hover:text-btn ease-in-out duration-300 rounded-md drop-shadow-2xl text-white" onClick={openBatchPage}>EXPLORE</button>
            </div>
        </div>
    )
}
