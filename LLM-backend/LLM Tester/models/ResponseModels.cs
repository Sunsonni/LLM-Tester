using System.Net.Mime;
using Microsoft.AspNetCore.Mvc.TagHelpers;
using Microsoft.AspNetCore.Routing.Matching;

namespace LLM_Tester.models;

internal sealed class GeminiResponse
{
    public Candidate[] Candidates { get; set; }
    public PromptFeedback PromptFeedback { get; set; }
}

internal sealed class PromptFeedback
{
    public SafetyRating[] SafetyRatings { get; set; }
}

internal sealed class Candidate
{
    public Content Content { get; set; }
    public string FinishReason { get; set; }
    public int Index { get; set; }
    public SafetyRating[] SafetyRatings { get; set; }
}

internal sealed class Content
{
    public Part[] Parts { get; set; }
    public string Role { get; set; }
}

internal sealed class Part
{
    public string Text { get; set; }
}

internal sealed class SafetyRating
{
    public string Category { get; set; }
    public string Probability { get; set; }
}