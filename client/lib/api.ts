const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function startAssessment(userId: string) {
    const res = await fetch(`${API_URL}/assessment/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
    });
    return res.json();
}

export async function submitAnswer(sessionId: string, questionId: string, answer: any) {
    const res = await fetch(`${API_URL}/assessment/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, questionId, answer }),
    });
    return res.json();
}
