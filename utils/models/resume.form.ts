export interface ResumeFormData {
    basics: {
        name: string;
        email: string;
        phone: string;
        url: string;
        address: string;
        postalCode: string;
        city: string;
        countryCode: string;
        region: string;
    };
    education: {
        institution: string;
        studyType: string;
        area: string;
        startDate: string;
        endDate: string;
        score: string;
    };
    work: {
        companyName: string;
        position: string;
        startDate: string;
        endDate: string;
        summary: string;
    };
}
