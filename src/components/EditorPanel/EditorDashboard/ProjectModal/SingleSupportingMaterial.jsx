import React from 'react'
import pdf from "../../../../assets/pdf.svg";
import { formatFileSize } from '../../../../utils/converter';
import { DownloadSimple } from "@phosphor-icons/react";


function SingleSupportingMaterial({ data, index }) {

    console.log("index", index, data)

    return (
        <tr key={index} className="border-b last:border-b-0">
            <td className="px-4 py-3 flex items-center gap-3">
                <img width={18} src={pdf} alt="" />
                {data.name}
            </td>
            <td className="border-t ">{formatFileSize(data.size)}</td>
            <td className="px-4 py-3 text-end">
                <button>
                    <DownloadSimple size={20} weight="bold" />
                </button>
            </td>
        </tr>
    )
}

export default SingleSupportingMaterial