import "../tailwind.css";
import CreateResume from "@/components/resume/CreateResume.tsx";

function App() {
    return (
        <div>
            <header className="bg-blue-500 p-4 text-white text-xl">
                Resume Builder
            </header>
            <main className="p-4">
                <CreateResume />
            </main>
        </div>
    );
}

export default App;
