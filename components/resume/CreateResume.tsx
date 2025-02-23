import React, { useState } from 'react';
import { ResumeRequest } from '@/utils/models/resume.request';
import { createResume } from "@/utils/resume/resume.service.ts";
import {ResumeFormData} from "@/utils/models/resume.form.ts";
import DisplayResume from "@/components/resume/DisplayResume.tsx";

const initialFormData: ResumeFormData = {
    basics: {
        name: '',
        email: '',
        phone: '',
        url: '',
        address: '',
        postalCode: '',
        city: '',
        countryCode: '',
        region: '',
    },
    education: {
        institution: '',
        studyType: '',
        area: '',
        startDate: '',
        endDate: '',
        score: '',
    },
    work: {
        companyName: '',
        position: '',
        startDate: '',
        endDate: '',
        summary: '',
    },
};

const CreateResume: React.FC = () => {
    const [formData, setFormData] = useState<ResumeFormData>(initialFormData);

    const handleInputChange = (section: keyof ResumeFormData) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [name]: value,
            },
        }));
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const { basics, education, work } = formData;

        // Convert education fields
        const educationEntry = education.institution
            ? {
                institution: education.institution,
                studyType: education.studyType || undefined,
                area: education.area || undefined,
                startDate: education.startDate ? new Date(education.startDate) : new Date(),
                endDate: education.endDate ? new Date(education.endDate) : undefined,
                score: education.score ? Number(education.score) : undefined,
            }
            : undefined;

        // Convert work fields
        const workEntry = work.companyName
            ? {
                companyName: work.companyName,
                position: work.position,
                startDate: work.startDate ? new Date(work.startDate) : new Date(),
                endDate: work.endDate ? new Date(work.endDate) : new Date(),
                summary: work.summary,
            }
            : undefined;

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
            education: educationEntry ? [educationEntry] : undefined,
            work: workEntry ? [workEntry] : undefined,
        };

        console.log('Saved Resume:', resumeRequest);
        return createResume(resumeRequest);
    };

    return (
        <div>
        <form onSubmit={handleSave} className="space-y-6 p-4">
            <h2 className="text-2xl font-bold">Create Resume</h2>

            {/* Basics Section */}
            <section>
                <h3 className="text-xl font-semibold">Basics</h3>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.basics.name}
                        onChange={handleInputChange('basics')}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.basics.email}
                        onChange={handleInputChange('basics')}
                        required
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.basics.phone}
                        onChange={handleInputChange('basics')}
                    />
                </div>
                <div>
                    <label>URL:</label>
                    <input
                        type="text"
                        name="url"
                        value={formData.basics.url}
                        onChange={handleInputChange('basics')}
                    />
                </div>
                <fieldset className="border p-2">
                    <legend>Location</legend>
                    <div>
                        <label>Address:</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.basics.address}
                            onChange={handleInputChange('basics')}
                        />
                    </div>
                    <div>
                        <label>Postal Code:</label>
                        <input
                            type="text"
                            name="postalCode"
                            value={formData.basics.postalCode}
                            onChange={handleInputChange('basics')}
                        />
                    </div>
                    <div>
                        <label>City:</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.basics.city}
                            onChange={handleInputChange('basics')}
                        />
                    </div>
                    <div>
                        <label>Country Code:</label>
                        <input
                            type="text"
                            name="countryCode"
                            value={formData.basics.countryCode}
                            onChange={handleInputChange('basics')}
                        />
                    </div>
                    <div>
                        <label>Region:</label>
                        <input
                            type="text"
                            name="region"
                            value={formData.basics.region}
                            onChange={handleInputChange('basics')}
                        />
                    </div>
                </fieldset>
            </section>

            {/* Education Section */}
            <section>
                <h3 className="text-xl font-semibold">Education</h3>
                <div>
                    <label>Institution:</label>
                    <input
                        type="text"
                        name="institution"
                        value={formData.education.institution}
                        onChange={handleInputChange('education')}
                    />
                </div>
                <div>
                    <label>Study Type:</label>
                    <input
                        type="text"
                        name="studyType"
                        value={formData.education.studyType}
                        onChange={handleInputChange('education')}
                    />
                </div>
                <div>
                    <label>Area:</label>
                    <input
                        type="text"
                        name="area"
                        value={formData.education.area}
                        onChange={handleInputChange('education')}
                    />
                </div>
                <div>
                    <label>Start Date:</label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.education.startDate}
                        onChange={handleInputChange('education')}
                    />
                </div>
                <div>
                    <label>End Date:</label>
                    <input
                        type="date"
                        name="endDate"
                        value={formData.education.endDate}
                        onChange={handleInputChange('education')}
                    />
                </div>
                <div>
                    <label>Score:</label>
                    <input
                        type="number"
                        step="0.01"
                        name="score"
                        value={formData.education.score}
                        onChange={handleInputChange('education')}
                    />
                </div>
            </section>

            {/* Work Experience Section */}
            <section>
                <h3 className="text-xl font-semibold">Work Experience</h3>
                <div>
                    <label>Company Name:</label>
                    <input
                        type="text"
                        name="companyName"
                        value={formData.work.companyName}
                        onChange={handleInputChange('work')}
                    />
                </div>
                <div>
                    <label>Position:</label>
                    <input
                        type="text"
                        name="position"
                        value={formData.work.position}
                        onChange={handleInputChange('work')}
                    />
                </div>
                <div>
                    <label>Start Date:</label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.work.startDate}
                        onChange={handleInputChange('work')}
                    />
                </div>
                <div>
                    <label>End Date:</label>
                    <input
                        type="date"
                        name="endDate"
                        value={formData.work.endDate}
                        onChange={handleInputChange('work')}
                    />
                </div>
                <div>
                    <label>Summary:</label>
                    <textarea
                        name="summary"
                        value={formData.work.summary}
                        onChange={handleInputChange('work')}
                    />
                </div>
            </section>

            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
                Save Resume
            </button>
        </form>

        <DisplayResume />
        </div>
    );
};

export default CreateResume;
