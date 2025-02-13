import { openAI } from "@/utils/openai"


export async function translation(transcription: string, translation_language: string) {
    const system_prompt = " You are a language expert, your job is to translate from a language to another language";
    const user_query = `Translate the following paragrah into ${translation_language}`
    try {
        const translation = await openAI.chat.completions.create({
            model: "gpt-4o-mini-2024-07-18",
            messages: [
                {
                    role: "system",
                    content: system_prompt
                },
                {
                    role: 'user',
                    content: user_query + transcription
                }
            ],
            temperature: 0.2,
            store: true
        }
        )
        console.log(translation.choices[0].message.content)

        return { content: translation.choices[0].message.content };
    } catch (error: unknown) {
        return { error };
    }
}