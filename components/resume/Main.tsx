import React, { useState } from 'react';
import CreateResume from './tabs/CreateResume';

export default function Main() {
    const [activeTab, setActiveTab] = useState('create');

    return (
        <div>
            <h1>Resume Feature</h1>
            <div className="tabs">
                <button onClick={() => setActiveTab('create')}>Create Resume</button>
                {/* Future tabs can be added here */}
                {/* <button onClick={() => setActiveTab('edit')}>Edit Resume</button> */}
            </div>
            <div className="tab-content">
                {activeTab === 'create' && <CreateResume />}
                {/* Render other tab content based on activeTab */}
            </div>
        </div>
    );
}