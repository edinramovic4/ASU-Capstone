import React, { useEffect, useState } from 'react';
import { ResumeRequest } from '@/utils/models/resume.request';
import { getLatestResume } from '@/utils/resume/resume.service';

const DisplayResume: React.FC = () => {
    const [resume, setResume] = useState<ResumeRequest | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const fetchLatestResume = async () => {
        try {
            const data = await getLatestResume();
            setResume(data);
        } catch (err) {
            setError('Failed to load resume');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Initial fetch
        fetchLatestResume();

        // Define a callback for storage changes
        const onStorageChange = (
            changes: { [key: string]: chrome.storage.StorageChange },
            areaName: string
        ) => {
            // Check if the resumes key has changed in local storage
            if (areaName === 'local' && changes['local:resumes']) {
                fetchLatestResume();
            }
        };

        // Add the listener
        chrome.storage.onChanged.addListener(onStorageChange);

        // Clean up the listener when the component unmounts
        return () => {
            chrome.storage.onChanged.removeListener(onStorageChange);
        };
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Latest Resume</h2>
            <pre className="bg-gray-100 p-4 rounded shadow">
        {JSON.stringify(resume, null, 2)}
      </pre>
        </div>
    );
};

export default DisplayResume;