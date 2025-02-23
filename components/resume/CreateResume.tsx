import React, { useState } from 'react';
import { ResumeRequest } from '@/utils/models/resume.request';
import { createResume } from "@/utils/resume/resume.service.ts";

const CreateResume: React.FC = () => {
    const [basics, setBasics] = useState({
        name: '',
        email: '',
        phone: '',
        url: '',
        address: '',
        postalCode: '',
        city: '',
        countryCode: '',
        region: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBasics(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const resumeRequest: ResumeRequest = {
            basics: {
                name: basics.name,
                email: basics.email,
                phone: basics.phone || undefined,
                url: basics.url || undefined,
                location: {
                    address: basics.address,
                    postalCode: basics.postalCode,
                    city: basics.city,
                    countryCode: basics.countryCode,
                    region: basics.region,
                },
            },
            // TO-DO: Add other sections (education, skills, projects, work)
        };

        console.log('Saved Resume:', resumeRequest);
        return createResume(resumeRequest);
    };

    return (
        <form onSubmit={handleSave}>
            <h2>Create Resume</h2>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={basics.name}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={basics.email}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>Phone:</label>
                <input
                    type="text"
                    name="phone"
                    value={basics.phone}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>URL:</label>
                <input
                    type="text"
                    name="url"
                    value={basics.url}
                    onChange={handleInputChange}
                />
            </div>
            <fieldset>
                <legend>Location</legend>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={basics.address}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Postal Code:</label>
                    <input
                        type="text"
                        name="postalCode"
                        value={basics.postalCode}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>City:</label>
                    <input
                        type="text"
                        name="city"
                        value={basics.city}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Country Code:</label>
                    <input
                        type="text"
                        name="countryCode"
                        value={basics.countryCode}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Region:</label>
                    <input
                        type="text"
                        name="region"
                        value={basics.region}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <button type="submit">Save Resume</button>
        </form>
    );
};

export default CreateResume;
