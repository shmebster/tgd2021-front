import { API_URL } from "../../app.constants";

export function getAudioPath(text: string) {
    return `${API_URL}/voice/tts?text=${text}`;
}
export function getAudioPathWithTemplate(path: string, text: string, vars: { [index: string]: string }) {
    const t = new Date().getTime();
    return `${API_URL}/voice/${path}?text=${text}&vars=${JSON.stringify(vars)}&t=${t}`;
}
