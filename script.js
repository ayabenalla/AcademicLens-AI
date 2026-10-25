// SIDEBAR TOGGLE
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (sidebar && backdrop) {
        sidebar.classList.toggle('-translate-x-full');
        backdrop.classList.toggle('hidden');
    }
}

// DARK MODE TOGGLE
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.documentElement.classList.toggle('dark', isDarkMode);
    const navIcon = document.getElementById('nav-theme-icon');
    const sidebarIcon = document.getElementById('sidebar-theme-icon');
    
    if (isDarkMode) {
        if (navIcon) navIcon.textContent = '☀️';
        if (sidebarIcon) {
            sidebarIcon.className = 'fa-solid fa-sun';
        }
    } else {
        if (navIcon) navIcon.textContent = '🌜';
        if (sidebarIcon) {
            sidebarIcon.className = 'fa-solid fa-moon';
        }
    }
}

// LANGUAGE SWITCHER
function changeLanguage(lang) {
    currentLang = lang;
    const dict = translations[lang];
    if (!dict) return;

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            el.textContent = dict[key];
        }
    });

    // Handle RTL for Arabic
    if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }
}

// RATING SYSTEM
function setRating(stars) {
    currentRating = stars;
    const ratingContainer = document.getElementById('star-rating');
    if (!ratingContainer) return;
    const icons = ratingContainer.querySelectorAll('i');
    
    icons.forEach((icon, index) => {
        if (index < stars) {
            icon.className = 'fa-solid fa-star text-amber-400';
        } else {
            icon.className = 'fa-regular fa-star text-amber-400';
        }
    });
}

function submitFeedback() {
    const msg = document.getElementById('feedback-msg');
    if (msg) {
        msg.classList.remove('hidden');
        setTimeout(() => {
            msg.classList.add('hidden');
        }, 3000);
    }
}

// MODAL CONTROLS FOR THE 10 TOOLS
const toolDetails = {
    1: { emoji: "📄", title: "Academic Paper Summarizer", desc: "Generate instant summary and key insights from research papers.", type: "pdf" },
    2: { emoji: "✍️", title: "Lesson Paraphraser & Refiner", desc: "Refine, reorganize, and paraphrase lesson content smoothly.", type: "pdf_text" },
    3: { emoji: "🤖", title: "Academic Tone Humanizer", desc: "Transform text into natural, easy-to-read academic language.", type: "length_text" },
    4: { emoji: "📝", title: "Advanced Essay & Notes Writer", desc: "Generate essays and study notes with custom length and style.", type: "essay" },
    5: { emoji: "💡", title: "Concept & Terminology Explainer", desc: "Receive clear, step-by-step explanations for complex concepts.", type: "text" },
    6: { emoji: "📚", title: "Quick Reference & Notes Organizer", desc: "Organize study notes and references into structured summaries.", type: "text" },
    7: { emoji: "📊", title: "Academic Data & Chart Explainer", desc: "Extract scientific trends and conclusions from data or images.", type: "image" },
    8: { emoji: "❓", title: "Academic Quiz & Flashcards Generator", desc: "Automatically generate self-test quizzes and revision flashcards.", type: "pdf" },
    9: { emoji: "🔍", title: "Critical Thinking & Analysis Prompt", desc: "Evaluate arguments and uncover critical research questions.", type: "text" },
    10: { emoji: "⏱️", title: "Study Schedule & Milestone Planner", desc: "Break down large syllabi into daily and weekly milestones.", type: "text" }
};

function openToolModal(id) {
    activeToolId = id;
    const tool = toolDetails[id];
    if (!tool) return;

    document.getElementById('modal-emoji').textContent = tool.emoji;
    document.getElementById('modal-title').textContent = tool.title;
    document.getElementById('modal-subtitle').textContent = tool.desc;

    // Reset zones
    document.getElementById('pdf-upload-zone').classList.add('hidden');
    document.getElementById('image-upload-zone').classList.add('hidden');
    document.getElementById('length-options-zone').classList.add('hidden');
    document.getElementById('style-options-zone').classList.add('hidden');
    document.getElementById('ai-output-box').classList.add('hidden');
    document.getElementById('modal-textarea').value = '';

    // Show relevant zones based on tool type
    if (tool.type === 'pdf' || tool.type === 'pdf_text') {
        document.getElementById('pdf-upload-zone').classList.remove('hidden');
    }
    if (tool.type === 'image') {
        document.getElementById('image-upload-zone').classList.remove('hidden');
    }
    if (tool.type === 'length_text' || tool.type === 'essay') {
        document.getElementById('length-options-zone').classList.remove('hidden');
    }
    if (tool.type === 'essay') {
        document.getElementById('style-options-zone').classList.remove('hidden');
    }

    document.getElementById('tool-modal').classList.remove('hidden');
}

function closeToolModal() {
    document.getElementById('tool-modal').classList.add('hidden');
}

function handleFileSelected(input, type) {
    if (input.files && input.files[0]) {
        const fileName = input.files[0].name;
        if (type === 'pdf') {
            document.getElementById('pdf-filename').textContent = "Selected: " + fileName;
        } else if (type === 'image') {
            document.getElementById('image-filename').textContent = "Selected: " + fileName;
        }
    }
}

function selectLength(length) {
    selectedLength = length;
    document.querySelectorAll('.length-btn').forEach(btn => {
        if (btn.textContent.includes(length)) {
            btn.className = "length-btn p-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl text-center font-medium bg-academicBlue-600 text-white";
        } else {
            btn.className = "length-btn p-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl text-center font-medium hover:border-academicBlue-500";
        }
    });
}

function processAiTool() {
    const outputBox = document.getElementById('ai-output-box');
    const outputContent = document.getElementById('ai-output-content');
    
    outputBox.classList.remove('hidden');
    outputContent.textContent = "Analyzing input and generating professional academic response based on tool #" + activeToolId + " (" + selectedLength + " format)...\n\n• Key Finding 1: Comprehensive literature breakdown completed successfully.\n• Key Finding 2: Academic tone optimized according to scientific standards.\n• Conclusion: Ready for integration into your research notes and study plan.";
}

function copyOutputText() {
    const text = document.getElementById('ai-output-content').textContent;
    navigator.clipboard.writeText(text);
    alert("Output copied to clipboard successfully!");
}
