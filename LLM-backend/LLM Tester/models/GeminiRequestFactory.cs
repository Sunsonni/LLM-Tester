using System.ComponentModel;

namespace LLM_Tester.models;

internal sealed class GeminiRequestFactory
{
    public static GeminiRequest CreateRequest(string prompt)
    {
        return new GeminiRequest
        {
            Contents =
            [
                new GeminiContent
                {
                    Role="user",
                    Parts =
                    [
                        new GeminiPart
                        {
                            Text = prompt
                        }
                    ]
                }
            ],
            GenerationConfig = new GenerationConfig 
            {
                Temperature = 0,
                TopK = 1,
                TopP = 1,
                MaxOutputTokens = 2048,
                StopSequences = new List<object>()
            },
            SafetySettings =
            [
                new SafetySetting
                {
                    Category = "HARM_CATEGORY_HARASSMENT",
                    Threshold = "BLOCK_ONLY_HIGH"
                },
                new SafetySetting
                {
                    Category = "HARM_CATEGORY_HATE_SPEECH",
                    Threshold = "BLOCK_ONLY_HIGH"
                },
                new SafetySetting
                {
                    Category = "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    Threshold = "BLOCK_ONLY_HIGH"
                },
                new SafetySetting
                {
                    Category = "HARM_CATEGORY_DANGEROUS_CONTENT",
                    Threshold = "BLOCK_ONLY_HIGH"
                }
            ]
        };
    }
}