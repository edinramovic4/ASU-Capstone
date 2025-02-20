import React, { useState } from 'react';
import {getResumes} from "@/utils/resume/resume.service.ts";
import {ResumeRequest} from "@/utils/models/resume.request.ts";

export default function CreateResume() {
    const [data, setData] = useState<ResumeRequest[] | null>(null);

    const handleLoadData = async () => {
        const resumeData = await getResumes();
        setData(resumeData);
    };

    return (
        <div>
            <h2>Create Resume</h2>
            <button onClick={handleLoadData}>Load Resume Data</button>
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
}