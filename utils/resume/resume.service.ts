import { storage } from "wxt/storage";
import { ResumeRequest } from "@/utils/models/resume.request.ts";
import {resumeSchema} from "@/utils/models/resume.schema.ts";
import { RESUME_STORAGE_KEY } from "@/utils/constants/local.storage.constants.ts";

export async function createResume(data: ResumeRequest): Promise<ResumeRequest> {
    const validatedResume = resumeSchema.parse(data);
    const resumes = await getResumes();
    // TO-DO: Check whether to overwrite latest or keep all resumes
    await storage.setItem(RESUME_STORAGE_KEY, [...resumes, validatedResume]);
    return validatedResume; // TO-DO: Check whether to return here or not (leave for testing)
}

export async function getResumes(): Promise<ResumeRequest[]> {
    return (await storage.getItem(RESUME_STORAGE_KEY)) || [];
}

// TO-DO: Add other methods below (update, export, etc.)