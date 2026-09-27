import { GoogleGenerativeAI } from '@google/generative-ai';
import { resumeData } from '../src/data/resume.js';
import { projects } from '../src/data/projects.js';
import { skillCategories, otherSkills } from '../src/data/skills.js';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function buildSystemPrompt() {
  const skillsText = skillCategories
    .map((cat) => `${cat.title}: ${cat.skills.map((s) => s.name).join(', ')}`)
    .join('\n');

  const otherSkillsText = otherSkills.join(', ');

  const experienceText = resumeData.experience
    .map(
      (exp) =>
        `${exp.role} at ${exp.company} (${exp.period}, ${exp.location})\n${exp.description}\nKey impacts: ${exp.impacts.join(' | ')}\nTech: ${exp.tech.join(', ')}`
    )
    .join('\n\n');

  const projectsText = projects
    .map(
      (p) =>
        `${p.title} (${p.category}): ${p.description}\nTech: ${p.tech.join(', ')}\nMetrics: ${p.metrics.map((m) => `${m.label}: ${m.value}`).join(', ')}`
    )
    .join('\n\n');

  const educationText = `${resumeData.education.degree} in ${resumeData.education.field}, ${resumeData.education.university} (${resumeData.education.period}), GPA: ${resumeData.education.gpa}\nAchievements: ${resumeData.education.achievements.join(' | ')}`;

  return `You are Kush Chauhan's AI portfolio assistant. Answer questions from visitors (recruiters, hiring managers, developers) about Kush's professional background, ONLY using the information below. Be friendly, concise, and confident. Use markdown-style **bold** for emphasis where it helps readability.

RULES:
- Only answer questions about Kush's skills, projects, experience, education, or how to contact/hire him.
- If asked something unrelated to Kush professionally (general knowledge, coding help unrelated to his work, personal opinions on politics etc.), politely redirect: "I'm just here to help you learn about Kush! Ask me about his skills, projects, or experience."
- Never invent skills, experience, or claims not present in the data below.
- Keep answers concise — 2-5 sentences or a short bulleted list. Avoid long essays.
- If asked to contact/hire him, share his email and LinkedIn.

=== ABOUT KUSH ===
${resumeData.about.short}
${resumeData.about.story}

=== TAGLINES ===
${resumeData.taglines.join(', ')}

=== CORE SKILLS ===
${skillsText}

=== OTHER SKILLS (exposure/learning, not primary) ===
${otherSkillsText}

=== EXPERIENCE ===
${experienceText}

=== PROJECTS ===
${projectsText}

=== EDUCATION ===
${educationText}

=== CERTIFICATIONS ===
${resumeData.certifications.join(', ')}

=== CONTACT ===
GitHub: ${resumeData.links.github}
LinkedIn: ${resumeData.links.linkedin}
Email: ${resumeData.links.email}
`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history = [] } = req.body;

  if (!message || typeof message !== 'string' || message.length > 500) {
    return res.status(400).json({ error: 'Invalid message' });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-3.5-flash-lite',
      systemInstruction: buildSystemPrompt(),
    });

    const firstUserIndex = history.findIndex((h) => h.type === 'user');
    const trimmedHistory = firstUserIndex === -1 ? [] : history.slice(firstUserIndex);

    const chat = model.startChat({
        history: trimmedHistory.map((h) => ({
            role: h.type === 'user' ? 'user' : 'model',
            parts: [{ text: h.text }],
        })),
        generationConfig: {
            maxOutputTokens: 300,
            temperature: 0.7,
        },
    });

    const result = await chat.sendMessage(message);
    const text = result.response.text();

    return res.status(200).json({ reply: text });
  } catch (err) {
    console.error('Gemini API error:', err);
    return res.status(500).json({ error: 'Failed to get a response. Please try again.' });
  }
}